import { useState } from 'react';
import { Upload, Download, FileSpreadsheet, Eye, EyeOff } from 'lucide-react';
import { ContractItemType } from '../types/contracts';
import { processExcelFile, exportToExcel, exportToCsv } from '../utils/excelProcessor';
import { MappingViewer } from './MappingViewer';
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
} from '../utils/columnMappings';

export const ContractItems = () => {
  const [selectedType, setSelectedType] = useState<ContractItemType>('ContratosGruposItens');
  const [processedData, setProcessedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [showMappings, setShowMappings] = useState(false);
  const [environment, setEnvironment] = useState<'producao' | 'qa'>('producao');

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
          transformationRules: contratosGruposItensParametrosTransformationRules,
          environment
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
      default:
        return { mappings: [], fixedColumns: [], transformationRules: [] };
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name.replace('.xlsx', '').replace('.xls', ''));

    try {
      const config = getMappingForType(selectedType);
      const { mappings, fixedColumns, transformationRules, environment: env } = config;
      const data = await processExcelFile(file, mappings, fixedColumns, transformationRules, env);
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
      exportToExcel(processedData, `${fileName}_transformado`);
    }
  };

  const handleExportCsv = () => {
    if (processedData) {
      exportToCsv(processedData, `${fileName}_transformado`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {selectedType === 'ContratosGruposItensParametros' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ambiente:
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as 'producao' | 'qa')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="producao">Produção</option>
              <option value="qa">QA</option>
            </select>
          </div>
        )}
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

      {processedData && !isProcessing && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileSpreadsheet className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">Arquivo processado com sucesso!</h3>
                <p className="text-sm text-gray-600">
                  {processedData.length} linha(s) transformada(s)
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Exportar Excel
              </button>
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Exportar CSV
              </button>
            </div>
          </div>

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
        </div>
      )}
    </div>
  );
};
