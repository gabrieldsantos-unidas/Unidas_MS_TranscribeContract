import { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ContractItemType, ColumnValidation } from '../types/contracts';
import { processExcelFile, exportToExcel, exportToCsv, validateColumnsAndData } from '../utils/excelProcessor';
import { MappingViewer } from './MappingViewer';
import { ColumnValidationViewer } from './ColumnValidationViewer';
import {
  contratosGruposItensMapping,
  contratosGruposItensFixedColumns,
  contratosGruposItensTransformationRules,
  contratosGruposItensDesmobilizacaoParametrosMapping,
  contratosGruposItensDesmobilizacaoParametrosFixedColumns,
  contratosGruposItensEquipamentosMapping,
  contratosGruposItensEquipamentosFixedColumns,
  contratosGruposItensFaturamentoParametrosMapping,
  contratosGruposItensFaturamentoParametrosFixedColumns,
  contratosGruposItensIntegracoesSalesforceMapping,
  contratosGruposItensIntegracoesSalesforceFixedColumns,
  contratosGruposItensManutencaoParametrosMapping,
  contratosGruposItensManutencaoParametrosFixedColumns,
  contratosGruposItensManutencaoParametrosTransformationRules,
  contratosGruposItensMultasDevolucoesAntecipadasMapping,
  contratosGruposItensMultasDevolucoesAntecipadasFixedColumns,
  contratosGruposItensParametrosMapping,
  contratosGruposItensParametrosFixedColumns,
  contratosGruposItensParametrosTransformationRules,
  contratosGruposItensServicosAdicionaisMapping,
  contratosGruposItensServicosAdicionaisFixedColumns,
  contratosGruposVeiculosModelosClientesMapping,
  contratosGruposVeiculosModelosClientesFixedColumns,
  poolDePneusMapping,
  poolDePneusFixedColumns,
  contratosGruposItensFormasPagamentoMapping,
  contratosGruposItensFormasPagamentoFixedColumns,
} from '../utils/columnMappings';

export const ContractItems = () => {
  const [selectedType, setSelectedType] = useState<ContractItemType>('ContratosGruposItens');
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [showMappings, setShowMappings] = useState(false);
  const [columnValidation, setColumnValidation] = useState<ColumnValidation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contractItemTypes = [
    { value: 'ContratosGruposItens', label: 'Contratos Grupos Itens' },
    {
      value: 'ContratosGruposItensDesmobilizacaoParametros',
      label: 'Contratos Grupos Itens Desmobilização Parâmetros'
    },
    { value: 'ContratosGruposItensEquipamentos', label: 'Contratos Grupos Itens Equipamentos' },
    {
      value: 'ContratosGruposItensFaturamentoParametros',
      label: 'Contratos Grupos Itens Faturamento Parâmetros'
    },
    {
      value: 'ContratosGruposItensIntegracoesSalesforce',
      label: 'Contratos Grupos Itens Integrações Salesforce'
    },
    {
      value: 'ContratosGruposItensManutencaoParametros',
      label: 'Contratos Grupos Itens Manutenção Parâmetros'
    },
    {
      value: 'ContratosGruposItensMultasDevolucoesAntecipadas',
      label: 'Contratos Grupos Itens Multas Devoluções Antecipadas'
    },
    { value: 'ContratosGruposItensParametros', label: 'Contratos Grupos Itens Parâmetros' },
    {
      value: 'ContratosGruposItensServicosAdicionais',
      label: 'Contratos Grupos Itens Serviços Adicionais'
    },
    {
      value: 'ContratosGruposVeiculosModelosClientes',
      label: 'Contratos Grupos Veículos Modelos Clientes'
    },
    { value: 'PoolDePneus', 
      label: 'Pool de Pneus' 
    },
    {
      value: 'ContratosGruposItensFormasPagamento',
      label: 'Contratos Grupos Itens Formas Pagamento'
    },
  ];

  const getMappingForType = (type: ContractItemType) => {
    switch (type) {
      case 'ContratosGruposItens':
        return {
          mappings: contratosGruposItensMapping,
          fixedColumns: contratosGruposItensFixedColumns,
          transformationRules: contratosGruposItensTransformationRules
        };
      case 'ContratosGruposItensDesmobilizacaoParametros':
        return {
          mappings: contratosGruposItensDesmobilizacaoParametrosMapping,
          fixedColumns: contratosGruposItensDesmobilizacaoParametrosFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensEquipamentos':
        return {
          mappings: contratosGruposItensEquipamentosMapping,
          fixedColumns: contratosGruposItensEquipamentosFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensFaturamentoParametros':
        return {
          mappings: contratosGruposItensFaturamentoParametrosMapping,
          fixedColumns: contratosGruposItensFaturamentoParametrosFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensIntegracoesSalesforce':
        return {
          mappings: contratosGruposItensIntegracoesSalesforceMapping,
          fixedColumns: contratosGruposItensIntegracoesSalesforceFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensManutencaoParametros':
        return {
          mappings: contratosGruposItensManutencaoParametrosMapping,
          fixedColumns: contratosGruposItensManutencaoParametrosFixedColumns,
          transformationRules: contratosGruposItensManutencaoParametrosTransformationRules
        };
      case 'ContratosGruposItensMultasDevolucoesAntecipadas':
        return {
          mappings: contratosGruposItensMultasDevolucoesAntecipadasMapping,
          fixedColumns: contratosGruposItensMultasDevolucoesAntecipadasFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensParametros':
        return {
          mappings: contratosGruposItensParametrosMapping,
          fixedColumns: contratosGruposItensParametrosFixedColumns,
          transformationRules: contratosGruposItensParametrosTransformationRules
        };
      case 'ContratosGruposItensServicosAdicionais':
        return {
          mappings: contratosGruposItensServicosAdicionaisMapping,
          fixedColumns: contratosGruposItensServicosAdicionaisFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposVeiculosModelosClientes':
        return {
          mappings: contratosGruposVeiculosModelosClientesMapping,
          fixedColumns: contratosGruposVeiculosModelosClientesFixedColumns,
          transformationRules: []
        };
      case 'PoolDePneus':
        return {
          mappings: poolDePneusMapping,
          fixedColumns: poolDePneusFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposItensFormasPagamento':
        return {
          mappings: contratosGruposItensFormasPagamentoMapping,
          fixedColumns: contratosGruposItensFormasPagamentoFixedColumns,
          transformationRules: []
        };
      default:
        return { mappings: [], fixedColumns: [], transformationRules: [] };
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setIsProcessing(true);
    setFileName(file.name.replace('.xlsx', '').replace('.xls', ''));
    setColumnValidation(null);
  
    try {
      const config = getMappingForType(selectedType);
      const { mappings, fixedColumns, transformationRules } = config;

      const isMultasDevolucoesAntecipadas =
        selectedType === 'ContratosGruposItensMultasDevolucoesAntecipadas';
      const isPoolDePneus = selectedType === 'PoolDePneus';
      const isEquipamentosAcessorios = selectedType === 'ContratosGruposItensEquipamentos';
      const isEquipamentosServicos = selectedType === 'ContratosGruposItensServicosAdicionais';
      const isEquipamentosCores = selectedType === 'ContratosGruposItens';

      console.log("selectedtype: ", selectedType);

      const validation = await validateColumnsAndData(
        file,
        mappings,
        isMultasDevolucoesAntecipadas
      );
      setColumnValidation(validation);

      const data = await processExcelFile(
        file,
        mappings,
        fixedColumns,
        transformationRules,
        isMultasDevolucoesAntecipadas,
        isPoolDePneus,
        isEquipamentosAcessorios,
        isEquipamentosServicos,
        isEquipamentosCores
      );
  
      // 🔽 aqui entra a remoção de duplicados
      let dedupedData: any = data;
  
      if (isPoolDePneus && Array.isArray(data) && data[0]?.tableName) {
        // caso PoolDePneus: array de tabelas { tableName, data }
        dedupedData = data.map((table: any) => ({
          ...table,
          data: Array.isArray(table.data)
            ? removeDuplicates(table.data)
            : table.data,
        }));
      } else if (Array.isArray(data)) {
        // caso comum: array de linhas
        dedupedData = removeDuplicates(data);
      }
  
      setProcessedData(dedupedData);
    } catch (error) {
      alert('Erro ao processar arquivo. Verifique o formato e tente novamente.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };


  // helper para remover duplicados
  const removeDuplicates = (rows: any[]) => {
    const seen = new Set<string>();
  
    return rows.filter(row => {
      // se quiser por campos específicos, monta o "key" só com eles
      const key = JSON.stringify(row); 
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const handleExportExcel = () => {
    if (!processedData) return;
  
    // caso especial PoolDePneus (array de tabelas)
    if (
      selectedType === 'PoolDePneus' &&
      Array.isArray(processedData) &&
      processedData[0]?.tableName
    ) {
      processedData.forEach((table: any) => {
        const dataSemDuplicados = removeDuplicates(table.data);
        exportToExcel(dataSemDuplicados, `${table.tableName}`);
      });
    } else {
      // caso comum: processedData é um array de linhas
      const dataSemDuplicados = Array.isArray(processedData)
        ? removeDuplicates(processedData)
        : processedData;
  
      exportToExcel(dataSemDuplicados, `${selectedType}`);
    }
  };

  const handleClearData = () => {
    setProcessedData(null);
    setFileName('');
    setColumnValidation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o tipo de item do contrato:
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ContractItemType)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {contractItemTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowMappings(!showMappings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
        >
          {showMappings ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {showMappings ? 'Ocultar' : 'Visualizar'} Regras de Transformação
        </button>
      </div>

      {showMappings && <MappingViewer contractType={selectedType} />}

      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 hover:bg-blue-100 transition-colors">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-12 h-12 text-blue-600 mb-3" />
          <span className="text-lg font-medium text-gray-700 mb-1">
            Clique para selecionar o arquivo Excel
          </span>
          <span className="text-sm text-gray-500">ou arraste e solte aqui</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isProcessing}
          />
        </label>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-700">Processando arquivo...</span>
        </div>
      )}

      {columnValidation && (
        <div className="mb-6">
          <ColumnValidationViewer validation={columnValidation} />
        </div>
      )}

      {processedData && !isProcessing && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileSpreadsheet className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {selectedType === 'PoolDePneus' && Array.isArray(processedData) && processedData[0]?.tableName
                    ? 'Arquivo processado com sucesso! 2 tabelas geradas'
                    : processedData.length === 0
                    ? 'Validação de colunas realizada!'
                    : 'Arquivo processado com sucesso!'}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedType === 'PoolDePneus' && Array.isArray(processedData) && processedData[0]?.tableName
                    ? `${processedData[0].data.length} linha(s) em ContratoGrupoPool + ${processedData[1].data.length} linha(s) em ContratoGrupoPoolItem`
                    : processedData.length === 0
                    ? 'Planilha sem dados, mas as colunas foram validadas'
                    : `${processedData.length} linha(s) transformada(s)`}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClearData}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Limpar
              </button>
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Exportar Excel
              </button>
            </div>
          </div>

          {selectedType === 'PoolDePneus' && Array.isArray(processedData) && processedData[0]?.tableName ? (
            <div className="space-y-6">
              {processedData.map((table: any, tableIdx: number) => (
                <div key={tableIdx} className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{table.tableName}</h4>
                  <div className="max-h-96 overflow-auto bg-white rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          {table.data[0] &&
                            Object.keys(table.data[0]).map((key) => (
                              <th
                                key={key}
                                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                              >
                                {key}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {table.data.slice(0, 10).map((row: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            {Object.values(row).map((value: any, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                {value?.toString() || '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {table.data.length > 10 && (
                      <div className="text-center py-3 text-sm text-gray-500 bg-gray-50">
                        Mostrando 10 de {table.data.length} linhas
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : processedData.length > 0 ? (
            <div className="mt-4 max-h-96 overflow-auto bg-white rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {processedData[0] &&
                      Object.keys(processedData[0]).map((key) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedData.slice(0, 10).map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {Object.values(row).map((value: any, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {value?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {processedData.length > 10 && (
                <div className="text-center py-3 text-sm text-gray-500 bg-gray-50">
                  Mostrando 10 de {processedData.length} linhas
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">Nenhum dado para exibir, mas as colunas foram validadas.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
