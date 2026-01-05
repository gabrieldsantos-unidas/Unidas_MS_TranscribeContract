import * as XLSX from 'xlsx';
import { ColumnMapping, FixedColumn, TransformationRule, ColumnValidation } from '../types/contracts';

const normalizeColumnName = (name: string): string => {
  const normalized = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
};

const cleanNumericValue = (value: any): any => {
  if (typeof value !== "string") return value;

  const raw = value.trim();
  if (!raw) return value;

  // remove "R$" (com ou sem espaço)
  let v = raw.replace(/^R\$\s*/i, "").replace(/\s+/g, "");

  // Se parece pt-BR: 1.234.567,89 ou 123,45
  const looksPtBR =
    /^-?\d{1,3}(\.\d{3})*(,\d+)?$/.test(v) || /^-?\d+(,\d+)?$/.test(v);

  if (looksPtBR) {
    // remove milhares "." e troca decimal "," por "."
    v = v.replace(/\./g, "").replace(/,/g, ".");
    const n = Number(v);
    return Number.isFinite(n) ? n : value;
  }

  // Se já parece formato "en": 1234.56
  const looksEn = /^-?\d+(\.\d+)?$/.test(v);
  if (looksEn) {
    const n = Number(v);
    return Number.isFinite(n) ? n : value;
  }

  return value;
};


const applyDataTransformations = (row: any): any => {
  const transformedRow: any = {};

  Object.entries(row).forEach(([key, value]) => {
    let transformedValue = value;
    const normalizedKey = normalizeColumnName(key);

    transformedValue = cleanNumericValue(transformedValue);

    if (normalizedKey === 'numero do contrato salesforce' || normalizedKey === 'numerodocontratosalesforce') {
      const strValue = transformedValue?.toString().trim() || '';
      if (strValue && !strValue.toUpperCase().startsWith('SF')) {
        transformedValue = 'SF' + strValue;
      } else {
        transformedValue = strValue;
      }
    } else if (typeof transformedValue === 'string') {
      let strValue = transformedValue.trim();

      const lowerValue = strValue.toLowerCase();
      if (lowerValue === 'sim') {
        transformedValue = 'S';
      } else if (lowerValue === 'não' || lowerValue === 'nao') {
        transformedValue = 'N';
      } else if (strValue.endsWith('%') && strValue.length > 1) {
        transformedValue = strValue.slice(0, -1).trim();
      } else {
        transformedValue = strValue;
      }
    }

    transformedRow[key] = transformedValue;
  });

  return transformedRow;
};

export const getColumnsFromExcel = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        console.log('=== DEBUG: Leitura do Excel ===');
        console.log('Nome da planilha:', sheetName);
        console.log('Range da planilha:', worksheet['!ref']);

        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const headerRow: string[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
          const cell = worksheet[cellAddress];
          if (cell && cell.v) {
            headerRow.push(cell.v.toString());
          }
        }

        console.log('Headers extraídos diretamente da primeira linha:', headerRow);
        console.log('Total de headers:', headerRow.length);

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        console.log('Número de linhas de dados:', jsonData.length);

        if (headerRow.length > 0) {
          console.log('Colunas extraídas dos headers (total:', headerRow.length, '):');
          headerRow.forEach((col, idx) => {
            const charCodes = Array.from(col).map(c => c.charCodeAt(0));
            console.log(`  ${idx + 1}. "${col}" [length: ${col.length}, chars: ${charCodes.join(',')}]`);
          });
          resolve(headerRow);
        } else if (jsonData.length > 0) {
          const allColumns = new Set<string>();
          jsonData.forEach((row: any) => {
            Object.keys(row).forEach(key => allColumns.add(key));
          });

          const columns = Array.from(allColumns);
          console.log('Colunas extraídas de linhas de dados (total:', columns.length, '):');
          columns.forEach((col, idx) => {
            const charCodes = Array.from(col).map(c => c.charCodeAt(0));
            console.log(`  ${idx + 1}. "${col}" [length: ${col.length}, chars: ${charCodes.join(',')}]`);
          });
          resolve(columns);
        } else {
          console.log('Nenhum header ou linha de dados encontrada!');
          resolve([]);
        }
      } catch (error) {
        console.error('Erro ao ler Excel:', error);
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsBinaryString(file);
  });
};

export const validateColumnsAndData = (
  file: File,
  mappings: ColumnMapping[],
  isMultasDevolucoesAntecipadas: boolean = false
): Promise<ColumnValidation> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const headerRow: string[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
          const cell = worksheet[cellAddress];
          if (cell && cell.v) {
            headerRow.push(cell.v.toString());
          }
        }

        let jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
          raw: false
        });

        const validation = validateColumns(headerRow, mappings, isMultasDevolucoesAntecipadas);

        const percentIssuesBefore: string[] = [];
        const simNaoIssuesBefore: string[] = [];
        const realIssuesBefore: string[] = [];
        let codigoContratoIssuesCount = 0;

        const normalizeBRL = (input: string) => {
          // remove "R$" e espaços extras
          let v = input.replace(/^R\$\s*/i, '').trim();
        
          // remove separador de milhar (.)
          v = v.replace(/\./g, '');
        
          // padroniza decimal: "," -> "."
          v = v.replace(/,/g, '.');
        
          return v;
        };

        jsonData.forEach((row: any, rowIndex: number) => {
          Object.entries(row).forEach(([colName, value]) => {
            const strValue = value?.toString().trim() || '';
            const normalizedKey = normalizeColumnName(colName);
        
            if (
              normalizedKey === 'numero do contrato salesforce' ||
              normalizedKey === 'numerodocontratosalesforce'
            ) {
              if (strValue && !strValue.toUpperCase().startsWith('SF')) {
                codigoContratoIssuesCount++;
              }
            }
        
            if (/^R\$\s*/i.test(strValue)) {
              const cleaned = normalizeBRL(strValue);
        
              realIssuesBefore.push(
                `Linha ${rowIndex + 2}, Coluna "${colName}": "${strValue}" → "${cleaned}" (remove "R$", ajusta "," e ".")`
              );
            }
        
            if (strValue.endsWith('%') && strValue.length > 1) {
              percentIssuesBefore.push(
                `Linha ${rowIndex + 2}, Coluna "${colName}": "${strValue}" → removerá "%"`
              );
            }
        
            const lowerValue = strValue.toLowerCase();
            if (lowerValue === 'sim') {
              simNaoIssuesBefore.push(`Linha ${rowIndex + 2}, Coluna "${colName}": "Sim" → "S"`);
            } else if (lowerValue === 'não' || lowerValue === 'nao') {
              simNaoIssuesBefore.push(`Linha ${rowIndex + 2}, Coluna "${colName}": "${strValue}" → "N"`);
            }
          });
        });

        const hasPercentSymbolInEnd = true;
        const hasSimNaoValidation = true;
        const hasRealValidation = true;

        resolve({
          ...validation,
          allTablesValidation: {
            ...validation.allTablesValidation!,
            hasPercentSymbolInEnd,
            hasSimNaoValidation,
            hasRealValidation,
            percentIssues: percentIssuesBefore.length > 0 ? [`${percentIssuesBefore.length} valor(es) com "%" serão automaticamente corrigidos`] : [],
            simNaoIssues: simNaoIssuesBefore.length > 0 ? [`${simNaoIssuesBefore.length} valor(es) Sim/Não serão automaticamente convertidos para S/N`] : [],
            realIssues: realIssuesBefore.length > 0 ? [`${realIssuesBefore.length} valor(es) com "R$" serão automaticamente corrigidos`] : []
          }
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsBinaryString(file);
  });
};

export const validateColumns = (
  fileColumns: string[],
  mappings: ColumnMapping[],
  isMultasDevolucoesAntecipadas: boolean = false
): ColumnValidation => {
  let expectedColumns: string[];

  if (isMultasDevolucoesAntecipadas) {
    expectedColumns = ['Número do Contrato Salesforce', 'Distribuição de Linhas ID 18'];
    for (let i = 1; i <= 10; i++) {
      expectedColumns.push(`Prazo mínimo para devolução (${i})`);
      expectedColumns.push(`% Multa por devolução antecipada (${i})`);
    }
  } else {
    expectedColumns = [...new Set(mappings.map(m => m.original))];
  }

  const normalizedFileColumns = fileColumns.map(normalizeColumnName);
  const normalizedExpectedColumns = expectedColumns.map(normalizeColumnName);

  console.log('=== DEBUG: Validação de Colunas ===');
  console.log('Colunas esperadas (primeiras 5):');
  expectedColumns.slice(0, 5).forEach(col => {
    console.log(`  "${col}" -> normalizado: "${normalizeColumnName(col)}"`);
  });
  console.log('Colunas do arquivo (primeiras 5):');
  fileColumns.slice(0, 5).forEach(col => {
    console.log(`  "${col}" -> normalizado: "${normalizeColumnName(col)}"`);
  });

  const missingColumns = expectedColumns.filter(col => {
    const normalized = normalizeColumnName(col);
    const found = normalizedFileColumns.includes(normalized);
    if (!found) {
      console.log(`❌ Coluna faltando: "${col}" -> normalizado: "${normalized}"`);
    }
    return !found;
  });

  const matchedColumns = fileColumns.filter(col => {
    const normalized = normalizeColumnName(col);
    return normalizedExpectedColumns.includes(normalized);
  });

  const extraColumns = fileColumns.filter(col => {
    const normalized = normalizeColumnName(col);
    return !normalizedExpectedColumns.includes(normalized);
  });

  const hasNumeroContratoSalesforce = fileColumns.some(col =>
    normalizeColumnName(col) === 'numero do contrato salesforce' ||
    normalizeColumnName(col) === 'numerodocontratosalesforce'
  );

  return {
    missingColumns,
    extraColumns,
    matchedColumns,
    isValid: missingColumns.length === 0,
    allTablesValidation: {
      hasCodigoContratoAXOrGrupoContrato: hasNumeroContratoSalesforce,
      hasPercentSymbolInEnd: true,
      hasSimNaoValidation: true,
      hasRealValidation: true
    }
  };
};

const processMultasDevolucoesAntecipadas = (row: any): any[] => {
  const contratoKey = Object.keys(row).find(key =>
    normalizeColumnName(key) === normalizeColumnName('Número do Contrato Salesforce')
  );
  const linhaKey = Object.keys(row).find(key =>
    normalizeColumnName(key) === normalizeColumnName('Distribuição de Linhas ID 18')
  );

  const baseData = {
    CodigoGrupoContrato: contratoKey ? row[contratoKey] : undefined,
    CodigoGrupoContratoItem: linhaKey ? row[linhaKey] : undefined,
    Tipo: 'P'
  };

  const prazos: { mesFinal: number; valor: number }[] = [];
  let encontrouFimContrato = false;

  for (let i = 1; i <= 10; i++) {
    const prazoKeyExpected = `Prazo mínimo para devolução (${i})`;
    const multaKeyExpected = `% Multa por devolução antecipada (${i})`;

    const prazoKey = Object.keys(row).find(key =>
      normalizeColumnName(key) === normalizeColumnName(prazoKeyExpected)
    );
    const multaKey = Object.keys(row).find(key =>
      normalizeColumnName(key) === normalizeColumnName(multaKeyExpected)
    );

    const prazoTexto = prazoKey ? row[prazoKey] : undefined;
    const multaValor = multaKey ? row[multaKey] : undefined;

    if (prazoTexto && prazoTexto.toString().trim() !== '') {
      let mesFinal: number;
      const prazoStr = prazoTexto.toString().toLowerCase();

      if (prazoStr.includes('até o fim do contrato') || prazoStr.includes('fim do contrato')) {
        mesFinal = 999;
        encontrouFimContrato = true;
      } else {
        const match = prazoTexto.toString().match(/(\d+)/);
        mesFinal = match ? parseInt(match[1], 10) : 999;
        if (mesFinal === 999) {
          encontrouFimContrato = true;
        }
      }

      prazos.push({
        mesFinal,
        valor: multaValor || 0
      });

      if (encontrouFimContrato) {
        break;
      }
    }
  }

  if (prazos.length === 0) {
    return [{
      ...baseData,
      MesInicial: 1,
      MesFinal: 999,
      Valor: 0
    }];
  }

  prazos.sort((a, b) => a.mesFinal - b.mesFinal);

  return prazos.map((prazo, index) => ({
    ...baseData,
    MesInicial: index === 0 ? 1 : prazos[index - 1].mesFinal + 1,
    MesFinal: prazo.mesFinal,
    Valor: prazo.valor
  }));
};

const processPoolDePneus = (row: any): { pool: any[], poolItem: any[] } => {
  const getFieldValue = (fieldName: string) => {
    const key = Object.keys(row).find(k =>
      normalizeColumnName(k) === normalizeColumnName(fieldName)
    );
    return key ? row[key] : undefined;
  };

  const numeroContrato = getFieldValue('Número do Contrato Salesforce');
  const codigoContratoFormatted = numeroContrato && !numeroContrato.toString().toUpperCase().startsWith('SF')
    ? 'SF' + numeroContrato
    : numeroContrato;

  const linhasCotacao = getFieldValue('Linha de cotação ID 18');
  const distribuicaoLinhas = getFieldValue('Distribuição de Linhas ID 18');
  const dataCriacao = getFieldValue('Data de criação');
  const prazoContratual = parseInt(getFieldValue('Prazo Contratual')) || 0;
  const quantidade = getFieldValue('Quantidade');

  const poolDePneus = getFieldValue('Pool de pneus');
  const poolDeUsoMensal = getFieldValue('Pool de uso mensal');
  const poolDeReserva = getFieldValue('Pool de reserva');

  const quantidadePneus = getFieldValue('Quantidade de pneus');
  const usoMensal = getFieldValue('Uso Mensal');
  const quantidadeDiariasReserva = getFieldValue('Quantidade diárias de reserva');

  const calculateDataFim = (dataInicio: string, meses: number): string => {
    if (!dataInicio) return '';

    const parts = dataInicio.split('/');
    if (parts.length !== 3) return dataInicio;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return dataInicio;

    const date = new Date(year, month - 1, day);
    date.setMonth(date.getMonth() + meses);

    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();

    return `${newDay}/${newMonth}/${newYear}`;
  };

  const dataFim = calculateDataFim(dataCriacao, prazoContratual);

  const poolResults: any[] = [];
  const poolItemResults: any[] = [];

  const pools = [
    { condition: poolDePneus, tipo: 'P', quantidade: quantidadePneus },
    { condition: poolDeUsoMensal, tipo: 'K', quantidade: usoMensal },
    { condition: poolDeReserva, tipo: 'R', quantidade: quantidadeDiariasReserva }
  ];

  pools.forEach(pool => {
    const conditionValue = pool.condition?.toString().toLowerCase().trim();
    if (conditionValue === 'sim' || conditionValue === 's') {
      poolResults.push({
        CodigoContratoGrupoPool: linhasCotacao,
        CodigoGrupoContrato: codigoContratoFormatted,
        CodigoProdutoServico: 2,
        Tipo: pool.tipo,
        NumeroTermoAceite: codigoContratoFormatted,
        DataInicio: dataCriacao,
        DataFim: dataFim,
        QuantidadeTotal: pool.quantidade,
        QuantidadeVeiculo: quantidade
      });

      poolItemResults.push({
        CodigoContratoGrupoPoolItem: distribuicaoLinhas,
        CodigoContratoGrupoPool: linhasCotacao,
        CodigoGrupoContratoItem: distribuicaoLinhas,
        CodigoContrato: codigoContratoFormatted
      });
    }
  });

  return { pool: poolResults, poolItem: poolItemResults };
};

const processEquipamentosAcessorios = (
  allRows: any[],
  mappings: ColumnMapping[],
  fixedColumns: FixedColumn[]
): any[] => {
  const normalizeColumnName = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[()]/g, '');
  };

  const getFieldValue = (row: any, fieldName: string) => {
    const key = Object.keys(row).find(k =>
      normalizeColumnName(k) === normalizeColumnName(fieldName)
    );
    return key ? row[key] : undefined;
  };

  const devices: any[] = [];
  const accessories: any[] = [];

  allRows.forEach(row => {
    const tipoRegistro = getFieldValue(row, 'Tipo de Registro do Produto');
    const bundleId = getFieldValue(row, 'Bundle ID');
    const idAcessorioProduto = getFieldValue(row, 'Id Acessório Produto');

    if (
      tipoRegistro?.toString().trim() === 'IRIS_Acessorios' &&
      bundleId &&
      idAcessorioProduto
    ) {
      accessories.push({
        bundleId: bundleId,
        accessoryId: idAcessorioProduto,
        originalRow: row
      });
    } else if (tipoRegistro?.toString().trim() === 'IRIS_Dispositivo' && bundleId) {
      devices.push({
        bundleId: bundleId,
        originalRow: row
      });
    }
  });

  const transformRow = (row: any) => {
    const newRow: any = {};

    mappings.forEach((mapping) => {
      const normalizedExpected = normalizeColumnName(mapping.original);
      const matchingKey = Object.keys(row).find(key =>
        normalizeColumnName(key) === normalizedExpected
      );

      if (matchingKey) {
        let value = row[matchingKey];
        value = cleanNumericValue(value);
        if (mapping.target === 'CodigoGrupoContrato' && value && !value.toString().toUpperCase().startsWith('SF')) {
          value = 'SF' + value;
        }
        newRow[mapping.target] = value;
      }
    });

    fixedColumns.forEach((fixedCol) => {
      newRow[fixedCol.name] = fixedCol.value;
    });

    return newRow;
  };

  const resultRows: any[] = [];

  const bundleIds = [...new Set([...devices.map(d => d.bundleId), ...accessories.map(a => a.bundleId)])];

  bundleIds.forEach(bundleId => {
    const bundleDevices = devices.filter(d => d.bundleId === bundleId);
    const bundleAccessories = accessories.filter(a => a.bundleId === bundleId);

    if (bundleDevices.length > 0 && bundleAccessories.length > 0) {
      bundleDevices.forEach(device => {
        bundleAccessories.forEach(accessory => {
          const transformedRow = transformRow(device.originalRow);
          transformedRow.CodigoEquipamento = cleanNumericValue(accessory.accessoryId);

          delete transformedRow.IdAcessorioProduto;
          delete transformedRow.BundleID;
          delete transformedRow.TipoRegistroProduto;

          resultRows.push(transformedRow);
        });
      });
    }
  });

  return resultRows;
};

const processEquipamentosServicos = (
  allRows: any[],
  mappings: ColumnMapping[],
  fixedColumns: FixedColumn[]
): any[] => {
  const normalizeColumnName = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[()]/g, '');
  };

  const getFieldValue = (row: any, fieldName: string) => {
    const key = Object.keys(row).find(k =>
      normalizeColumnName(k) === normalizeColumnName(fieldName)
    );
    return key ? row[key] : undefined;
  };

  const devices: any[] = [];
  const services: any[] = [];

  allRows.forEach(row => {
    const tipoRegistro = getFieldValue(row, 'Tipo de Registro do Produto');
    const bundleId = getFieldValue(row, 'Bundle ID');
    const idServico = getFieldValue(row, 'Id do Serviço');

    if (
      tipoRegistro?.toString().trim() === 'IRIS_Servicos' &&
      bundleId &&
      idServico
    ) {
      services.push({
        bundleId: bundleId,
        serviceId: idServico,
        originalRow: row
      });
    } else if (tipoRegistro?.toString().trim() === 'IRIS_Dispositivo' && bundleId) {
      devices.push({
        bundleId: bundleId,
        originalRow: row
      });
    }
  });

  const transformRow = (row: any) => {
    const newRow: any = {};

    mappings.forEach((mapping) => {
      const normalizedExpected = normalizeColumnName(mapping.original);
      const matchingKey = Object.keys(row).find(key =>
        normalizeColumnName(key) === normalizedExpected
      );

      if (matchingKey) {
        let value = row[matchingKey];
        value = cleanNumericValue(value);
        if (
          mapping.target === 'CodigoGrupoContrato' &&
          value &&
          !value.toString().toUpperCase().startsWith('SF')
        ) {
          value = 'SF' + value;
        }
        newRow[mapping.target] = value;
      }
    });

    fixedColumns.forEach((fixedCol) => {
      newRow[fixedCol.name] = fixedCol.value;
    });

    return newRow;
  };

  const resultRows: any[] = [];

  const bundleIds = [
    ...new Set([
      ...devices.map(d => d.bundleId),
      ...services.map(s => s.bundleId)
    ])
  ];

  bundleIds.forEach(bundleId => {
    const bundleDevices = devices.filter(d => d.bundleId === bundleId);
    const bundleServices = services.filter(s => s.bundleId === bundleId);

    if (bundleDevices.length > 0 && bundleServices.length > 0) {
      bundleDevices.forEach(device => {
        bundleServices.forEach(service => {
          const transformedRow = transformRow(device.originalRow);

          transformedRow.CodigoServicoAdicional = cleanNumericValue(service.serviceId);

          // antes: IdAcessorioProduto -> agora: Id do Serviço (nome normalizado vira IdDoServico)
          delete transformedRow.IdDoServico;
          delete transformedRow.BundleID;
          delete transformedRow.TipoRegistroProduto;

          resultRows.push(transformedRow);
        });
      });
    }
  });

  return resultRows;
};

const processEquipamentosCores = (
  allRows: any[],
  mappings: ColumnMapping[],
  fixedColumns: FixedColumn[]
): any[] => {
  const normalizeColumnName = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[()]/g, '');
  };

  const getFieldValue = (row: any, fieldName: string) => {
    const key = Object.keys(row).find(k =>
      normalizeColumnName(k) === normalizeColumnName(fieldName)
    );
    return key ? row[key] : undefined;
  };

  const devices: any[] = [];
  const colors: any[] = [];

  allRows.forEach(row => {
    const tipoRegistro = getFieldValue(row, 'Tipo de Registro do Produto');
    const bundleId = getFieldValue(row, 'Bundle ID');
    const idCor = getFieldValue(row, 'Id da Cor');

    if (tipoRegistro?.toString().trim() === 'IRIS_Cores' && bundleId && idCor) {
      colors.push({
        bundleId,
        colorId: idCor,
        originalRow: row
      });
    } else if (tipoRegistro?.toString().trim() === 'IRIS_Dispositivo' && bundleId) {
      devices.push({
        bundleId,
        originalRow: row
      });
    }
  });

  const transformRow = (row: any) => {
    const newRow: any = {};

    mappings.forEach((mapping) => {
      const normalizedExpected = normalizeColumnName(mapping.original);
      const matchingKey = Object.keys(row).find(key =>
        normalizeColumnName(key) === normalizedExpected
      );

      if (matchingKey) {
        let value = row[matchingKey];
        value = cleanNumericValue(value);
        if (
          mapping.target === 'CodigoGrupoContrato' &&
          value &&
          !value.toString().toUpperCase().startsWith('SF')
        ) {
          value = 'SF' + value;
        }
        newRow[mapping.target] = value;
      }
    });

    fixedColumns.forEach((fixedCol) => {
      newRow[fixedCol.name] = fixedCol.value;
    });

    return newRow;
  };

  const colorsByBundleId = new Map<string, any[]>();
  colors.forEach(c => {
    const key = String(c.bundleId);
    const arr = colorsByBundleId.get(key) ?? [];
    arr.push(c);
    colorsByBundleId.set(key, arr);
  });

  const resultRows: any[] = [];

  devices.forEach(device => {
    const transformedBase = transformRow(device.originalRow);

    const bundleIdKey = String(device.bundleId);
    const bundleColors = colorsByBundleId.get(bundleIdKey) ?? [];

    if (bundleColors.length === 0) {
      delete transformedBase.IdDaCor;
      delete transformedBase.BundleID;
      delete transformedBase.TipoRegistroProduto;

      resultRows.push(transformedBase);
      return;
    }

    bundleColors.forEach(color => {
      const transformedRow = { ...transformedBase };
      transformedRow.CodigoCor = cleanNumericValue(color.colorId);

      delete transformedRow.IdDaCor;
      delete transformedRow.BundleID;
      delete transformedRow.TipoRegistroProduto;

      resultRows.push(transformedRow);
    });
  });

  return resultRows;
};



export const processExcelFile = (
  file: File,
  mappings: ColumnMapping[],
  fixedColumns: FixedColumn[],
  transformationRules: TransformationRule[] = [],
  isMultasDevolucoesAntecipadas: boolean = false,
  isPoolDePneus: boolean = false,
  isEquipamentosAcessorios: boolean = false,
  isEquipamentosServicos: boolean = false,
  isEquipamentosCores: boolean = false
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const headerRow: string[] = [];
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
          const cell = worksheet[cellAddress];
          headerRow.push(cell ? cell.v : `Column${col}`);
        }

        console.log('=== DEBUG processExcelFile: Headers ===');
        console.log('Headers encontrados:', headerRow);
        console.log('Total:', headerRow.length);

        let jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
          raw: false
        });

        jsonData = jsonData.map(row => applyDataTransformations(row));

        console.log('=== DEBUG processExcelFile: Primeira linha ===');
        if (jsonData.length > 0) {
          const firstRowKeys = Object.keys(jsonData[0]);
          console.log('Chaves na primeira linha:', firstRowKeys.length);
          console.log('Chaves:', firstRowKeys);
        } else {
          console.log('Planilha vazia (sem dados), retornando array vazio');
          resolve([]);
          return;
        }

        if (isMultasDevolucoesAntecipadas) {
          const allRows: any[] = [];
          jsonData.forEach((row: any) => {
            const generatedRows = processMultasDevolucoesAntecipadas(row);
            allRows.push(...generatedRows);
          });
          resolve(allRows);
          return;
        }

        if (isPoolDePneus) {
          const allPoolRows: any[] = [];
          const allPoolItemRows: any[] = [];

          jsonData.forEach((row: any) => {
            const { pool, poolItem } = processPoolDePneus(row);
            allPoolRows.push(...pool);
            allPoolItemRows.push(...poolItem);
          });

          resolve([
            { tableName: 'ContratoGrupoPool', data: allPoolRows },
            { tableName: 'ContratoGrupoPoolItem', data: allPoolItemRows }
          ]);
          return;
        }

        if (isEquipamentosAcessorios) {
          const processedRows = processEquipamentosAcessorios(jsonData, mappings, fixedColumns);
          resolve(processedRows);
          return;
        }

        if (isEquipamentosServicos) {
          const processedRows = processEquipamentosServicos(jsonData, mappings, fixedColumns);
          resolve(processedRows);
          return;
        }

        if (isEquipamentosCores) {
          const processedRows = processEquipamentosCores(jsonData, mappings, fixedColumns);
          resolve(processedRows);
          return;
        }

        const transformedData = jsonData.map((row: any, rowIndex: number) => {
          const newRow: any = {};

          mappings.forEach((mapping) => {
            const normalizedExpected = normalizeColumnName(mapping.original);
            const matchingKey = Object.keys(row).find(key =>
              normalizeColumnName(key) === normalizedExpected
            );

            if (rowIndex === 0 && mapping.original.toLowerCase().includes('observa')) {
              console.log('=== DEBUG Observações ===');
              console.log('Procurando por:', mapping.original);
              console.log('Normalizado:', normalizedExpected);
              console.log('Chave encontrada:', matchingKey);
              console.log('Valor:', matchingKey ? row[matchingKey] : 'NÃO ENCONTRADO');
              console.log('Todas as chaves do row:', Object.keys(row));
            }

            if (matchingKey && row[matchingKey] !== undefined) {
              let value = row[matchingKey];
              value = cleanNumericValue(value);
              newRow[mapping.target] = value;
            }
          });

          fixedColumns.forEach((fixedCol) => {
            newRow[fixedCol.name] = fixedCol.value;
          });

          transformationRules.forEach((rule) => {
            if (newRow[rule.field] !== undefined) {
              const value = newRow[rule.field];
              if (typeof value === 'string' && value.toLowerCase() === rule.condition.toLowerCase()) {
                newRow[rule.field] = rule.trueValue;
              } else {
                newRow[rule.field] = rule.falseValue;
              }
            }
          });

          //metodoPagamento - ItensParametros
          const metodoPagamentoKey = Object.keys(row).find(key =>
            normalizeColumnName(key) === normalizeColumnName('Método de pagamento')
          );
          const metodoPagamento = metodoPagamentoKey ? row[metodoPagamentoKey] : undefined;
          
          if (newRow['CodigoFormaPagamento'] !== undefined) {
            newRow['CodigoFormaPagamento'] =
              metodoPagamento === 'Pix' ? 12 :
              metodoPagamento === 'Depósito' ? 319 :
              metodoPagamento === 'Boleto' ? 320 :
              320;
          }


          if (newRow['PrevisaoEntrega'] !== undefined) {
            const previsaoValue = String(newRow['PrevisaoEntrega']).trim();
            const isNumeric = /^\d+$/.test(previsaoValue);

            if (!isNumeric && previsaoValue !== '') {
              newRow['PrevisaoEntrega'] = newRow['PrazoEntrega'] || '';
            }
            delete newRow['PrazoEntrega'];
          }

          // ResponsabilidadeTrocaPneuPesados | ResponsabilidadeTrocaPneu - contratosGruposItensManutencaoParametros
          if (newRow['ResponsabilidadeTrocaPneuPesados'] !== undefined || newRow['ResponsabilidadeTrocaPneu'] !== undefined) {
            // prioridade: ResponsabilidadeTrocaPneuPesados
            if (newRow['ResponsabilidadeTrocaPneuPesados'] === 'Unidas') {
              newRow['ResponsabilidadeTrocaPneu'] = '1';
            } else {
              // senão, considera ResponsabilidadeTrocaPneu
              newRow['ResponsabilidadeTrocaPneu'] = (newRow['ResponsabilidadeTrocaPneu'] === 'S') ? '1' : '2';
            }
          
            delete newRow['ResponsabilidadeTrocaPneuPesados'];
          }


          if (newRow['ModoTaxaAdministrativaMulta'] !== undefined) {
            if (newRow['ModoTaxaAdministrativaMulta'] === 'P') {
              newRow['ValorTaxaAdministrativaMulta'] = '';
            } else if (newRow['ModoTaxaAdministrativaMulta'] === 'V') {
              newRow['PercentualTaxaAdministrativaMulta'] = '';
            }
          }

          if (newRow['ModeloTaxaAdministrativaMulta'] !== undefined) {
            if (newRow['ModeloTaxaAdministrativaMulta'] === 'P') {
              newRow['ValorTaxaAdministrativaMulta'] = '';
            } else if (newRow['ModeloTaxaAdministrativaMulta'] === 'V') {
              newRow['PercentualTaxaAdministrativaMulta'] = '';
            }
          }

          if (newRow['ModoTaxaAdministrativaAvaria'] !== undefined) {
            if (newRow['ModoTaxaAdministrativaAvaria'] === 'P') {
              newRow['ValorTaxaAdministrativaAvaria'] = '';
            } else if (newRow['ModoTaxaAdministrativaAvaria'] === 'V') {
              newRow['PercentualTaxaAdministrativaAvaria'] = '';
            }
          }

          if (newRow['CodigoCor'] !== undefined) {
            if (newRow['CodigoCor'] === '0'){
              newRow['CodigoCor'] = '';
            }
          }

          if (newRow['TipoSeguro'] !== undefined) {
            if (newRow['TipoSeguro'] === 'Apólice Contratada pela Locadora'){
              newRow['TipoSeguro'] = '1';
            }
          }

          if (newRow['CodigoVeiculosFinalPlaca'] !== undefined) {
            const lastDigit = String(newRow['CodigoVeiculosFinalPlaca']).slice(-1);
            let codigo;
          
            if (lastDigit === '1' || lastDigit === '2') { codigo = '1'; } 
            else if (lastDigit === '3' || lastDigit === '4') { codigo = '2'; } 
            else if (lastDigit === '5' || lastDigit === '6') { codigo = '3'; } 
            else if (lastDigit === '7' || lastDigit === '8') { codigo = '4'; } 
            else if (lastDigit === '9' || lastDigit === '0') { codigo = '5'; } 
            else { codigo = '6'; }
          
            newRow['CodigoVeiculosFinalPlaca'] = codigo;
          }

          if (newRow['LimitePrazoCobrancaMultaAvaria'] !== undefined) {
            if (newRow['LimitePrazoCobrancaMultaAvaria'] === 'Ilimitado'){
              newRow['LimitePrazoCobrancaMultaAvaria'] = '999';
            }
          }

          // Mapeamento CodigoIntegracaoSAPBrimTaxaJuro (descrição -> código)
          if (
            newRow['CodigoIntegracaoSAPBrimTaxaJuro'] !== undefined &&                
            newRow['CodigoIntegracaoSAPBrimTaxaJuro'] !== ''
          ) {
            const rawValue = String(newRow['CodigoIntegracaoSAPBrimTaxaJuro']);
            const normalized = rawValue
              .trim()
              .replace(/\s+/g, ' ')
              .toLowerCase();

            const mapCodigoIntegracaoSAPBrimTaxaJuro: Record<string, string> = {
              'isento, j, m e correção monetária': '1',
              'juros 1% + multa 2% + correção monetária base igpm': '2',
              'juros 1% + multa 2% + correção monetária base ipca': '3',
              'juros 1% + multa 2% sem correção monetária': '4',
              'juros 1% sem multa e sem correção monetária': '5',
              'juros 1% + correção monetária base ipca': '7',
              'juros 1% + correção monetária base igpm': '8',
              'juros 1% + multa 1% + correção monetária base ipca': '10',
              'juros 1% + multa 0,5% sem correção monetária': '11',
              'juros 1% + multa 2% + correção monetária base inpc': '12',
              'juros 1% + multa 1% + correção monetária base igpm': '13',
              'juros 1% + multa 10% sem correção monetária': '14',
              'juros 1% + multa 5% + correção monetária base ipca': '15',
              'juros 1% + correção monetária base taxa selic': '16',
              'juros 1% + correção monetária base taxa di': '18',
              'juros 1% + multa 1,5% + correção monetária base igpm': '19',
              'juros 1% + multa 0,5% + correção monetária base igpm': '20',
              'juros 0,5% + multa 1% + correção monetária base igpm': '21'
            };

            const mapped = mapCodigoIntegracaoSAPBrimTaxaJuro[normalized];

            // Só sobrescreve se achou no mapa
            if (mapped) {
              newRow['CodigoIntegracaoSAPBrimTaxaJuro'] = mapped;
            }
          }

        //ProximoReajuste - ItensParametros
        if (newRow['ProximoReajuste'] !== undefined) {
          if (newRow['ProximoReajuste'] === 'Anual'){
            newRow['ProximoReajuste'] = '';
          }
        }

        //PrevisaoEntrega - ItensParametros

          
          
        // Mapeamento CodigoTaxaJuros (descrição -> código)
        if (
            newRow['CodigoTaxaJuros'] !== undefined &&                
            newRow['CodigoTaxaJuros'] !== ''
          ) {
            const rawValue = String(newRow['CodigoTaxaJuros']);
            const normalized = rawValue
              .trim()
              .replace(/\s+/g, ' ')
              .toLowerCase();

            const mapCodigoTaxaJuros: Record<string, string> = {
              'isento, j, m e correção monetária': '1',
              'juros 1% + multa 2% + correção monetária base igpm': '2',
              'juros 1% + multa 2% + correção monetária base ipca': '3',
              'juros 1% + multa 2% sem correção monetária': '4',
              'juros 1% sem multa e sem correção monetária': '5',
              'juros 1% + correção monetária base ipca': '7',
              'juros 1% + correção monetária base igpm': '8',
              'juros 1% + multa 1% + correção monetária base ipca': '10',
              'juros 1% + multa 0,5% sem correção monetária': '11',
              'juros 1% + multa 2% + correção monetária base inpc': '12',
              'juros 1% + multa 1% + correção monetária base igpm': '13',
              'juros 1% + multa 10% sem correção monetária': '14',
              'juros 1% + multa 5% + correção monetária base ipca': '15',
              'juros 1% + correção monetária base taxa selic': '16',
              'juros 1% + correção monetária base taxa di': '18',
              'juros 1% + multa 1,5% + correção monetária base igpm': '19',
              'juros 1% + multa 0,5% + correção monetária base igpm': '20',
              'juros 0,5% + multa 1% + correção monetária base igpm': '21'
            };

            const mapped = mapCodigoTaxaJuros[normalized];

            // Só sobrescreve se achou no mapa
            if (mapped) {
              newRow['CodigoTaxaJuros'] = mapped;
            }
          }

          return newRow;
        });


        resolve(transformedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsBinaryString(file);
  });
};

export const exportToExcel = (data: any[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToCsv = (data: any[], fileName: string) => {
  const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
