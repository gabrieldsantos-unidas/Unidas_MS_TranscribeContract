import * as XLSX from 'xlsx';
import { ColumnMapping, FixedColumn, TransformationRule } from '../types/contracts';

export const processExcelFile = (
  file: File,
  mappings: ColumnMapping[],
  fixedColumns: FixedColumn[],
  transformationRules: TransformationRule[] = [],
  environment?: 'producao' | 'qa'
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const transformedData = jsonData.map((row: any) => {
          const newRow: any = {};

          mappings.forEach((mapping) => {
            if (row[mapping.original] !== undefined) {
              newRow[mapping.target] = row[mapping.original];
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

          if (environment) {
            const metodoPagamento = row['Método de pagamento'];

            if (newRow['CodigoFormaPagamento'] !== undefined && metodoPagamento !== undefined) {
              if (environment === 'producao') {
                newRow['CodigoFormaPagamento'] = metodoPagamento === 'Boleto' ? 320 : 318;
              } else if (environment === 'qa') {
                newRow['CodigoFormaPagamento'] = metodoPagamento === 'Boleto' ? 2 : 15;
              }
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
