import { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ContractCreationType, ColumnValidation } from '../types/contracts';
import { processExcelFile, exportToExcel, exportToCsv, validateColumnsAndData } from '../utils/excelProcessor';
import { MappingViewer } from './MappingViewer';
import { ColumnValidationViewer } from './ColumnValidationViewer';
import {
  contratosGruposMapping,
  contratosGruposFixedColumns,
  contratosGruposTransformationRules,
  contratosGruposFaturamentoParametrosMapping,
  contratosGruposFaturamentoParametrosFixedColumns,
  contratosGruposIntegracoesSalesMapping,
  contratosGruposIntegracoesSalesFixedColumns,
  contratosGruposParametrosMapping,
  contratosGruposParametrosFixedColumns,
} from '../utils/columnMappings';

export const ContractCreation = () => {
  const [selectedType, setSelectedType] = useState<ContractCreationType>('ContratosGrupos');
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [showMappings, setShowMappings] = useState(false);
  const [columnValidation, setColumnValidation] = useState<ColumnValidation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contractTypes = [
    { value: 'ContratosGrupos', label: 'Contratos Grupos' },
    { value: 'ContratosGruposFaturamentoParametros', label: 'Contratos Grupos Faturamento Parâmetros' },
    { value: 'ContratosGruposIntegracoesSales', label: 'Contratos Grupos Integrações Sales' },
    { value: 'ContratosGruposParametros', label: 'Contratos Grupos Parâmetros' },
  ];

  const getMappingForType = (type: ContractCreationType) => {
    switch (type) {
      case 'ContratosGrupos':
        return {
          mappings: contratosGruposMapping,
          fixedColumns: contratosGruposFixedColumns,
          transformationRules: contratosGruposTransformationRules
        };
      case 'ContratosGruposFaturamentoParametros':
        return {
          mappings: contratosGruposFaturamentoParametrosMapping,
          fixedColumns: contratosGruposFaturamentoParametrosFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposIntegracoesSales':
        return {
          mappings: contratosGruposIntegracoesSalesMapping,
          fixedColumns: contratosGruposIntegracoesSalesFixedColumns,
          transformationRules: []
        };
      case 'ContratosGruposParametros':
        return {
          mappings: contratosGruposParametrosMapping,
          fixedColumns: contratosGruposParametrosFixedColumns,
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
      const { mappings, fixedColumns, transformationRules } = getMappingForType(selectedType);

      const validation = await validateColumnsAndData(file, mappings, false);
      setColumnValidation(validation);

      const data = await processExcelFile(file, mappings, fixedColumns, transformationRules);
      setProcessedData(data);
    } catch (error) {
      alert('Erro ao processar arquivo. Verifique o formato e tente novamente.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportExcel = () => {
    if (processedData) {
      exportToExcel(processedData, `${selectedType}`);
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione o tipo de contrato:
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ContractCreationType)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          {contractTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
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
                  {processedData.length === 0 ? 'Validação de colunas realizada!' : 'Arquivo processado com sucesso!'}
                </h3>
                <p className="text-sm text-gray-600">
                  {processedData.length === 0
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

          {processedData.length > 0 ? (
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
