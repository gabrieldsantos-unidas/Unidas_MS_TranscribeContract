import { Info, ArrowRight, Zap } from 'lucide-react';
import { ContractCreationType, ContractItemType, TransformationRule } from '../types/contracts';
import {
  contratosGruposMapping,
  contratosGruposFixedColumns,
  contratosGruposFaturamentoParametrosMapping,
  contratosGruposFaturamentoParametrosFixedColumns,
  contratosGruposIntegracoesSalesMapping,
  contratosGruposIntegracoesSalesFixedColumns,
  contratosGruposParametrosMapping,
  contratosGruposParametrosFixedColumns,
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

interface MappingViewerProps {
  contractType: ContractCreationType | ContractItemType;
}

export const MappingViewer = ({ contractType }: MappingViewerProps) => {
  const getMappingForType = (type: ContractCreationType | ContractItemType) => {
    switch (type) {
      case 'ContratosGrupos':
        return { mappings: contratosGruposMapping, fixedColumns: contratosGruposFixedColumns, transformationRules: [] };
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
      default:
        return { mappings: [], fixedColumns: [], transformationRules: [] };
    }
  };

  const { mappings, fixedColumns, transformationRules } = getMappingForType(contractType);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 text-blue-700">
        <Info className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configuração de Mapeamento</h3>
      </div>

      {fixedColumns.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Campos Fixos
          </h4>
          <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Campo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                    Valor Fixo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200">
                {fixedColumns.map((col, idx) => (
                  <tr key={idx} className="hover:bg-amber-100 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{col.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-200 text-amber-900">
                        {col.value.toString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Mapeamento de Colunas ({mappings.length} transformações)
        </h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                  Campo Salesforce
                </th>
                <th className="px-4 py-3 text-center w-12">
                  <ArrowRight className="w-4 h-4 mx-auto text-blue-700" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
                  Campo Locavia CSV
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
              {mappings.map((mapping, idx) => (
                <tr key={idx} className="hover:bg-blue-100 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{mapping.original}</td>
                  <td className="px-4 py-3 text-center">
                    <ArrowRight className="w-4 h-4 mx-auto text-blue-500" />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{mapping.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

{transformationRules && transformationRules.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regras de Transformação Condicionais
          </h4>
          <div className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-purple-200">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
                    Campo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
                    Condição
                  </th>
                  <th className="px-4 py-3 text-center w-12">
                    <Zap className="w-4 h-4 mx-auto text-purple-700" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
                    Valores
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-200">
                {transformationRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-purple-100 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{rule.field}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Se valor = "{rule.condition}"
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Zap className="w-4 h-4 mx-auto text-purple-500" />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-900">
                          Sim: {rule.trueValue}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-900">
                          Não: {rule.falseValue}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {contractType === 'ContratosGruposItensParametros' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regras Condicionais Especiais (Baseadas no Ambiente)
          </h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
            <div>
              <h5 className="text-sm font-semibold text-green-900 mb-2">CodigoFormaPagamento</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-200 text-blue-900 min-w-[80px]">
                    Produção
                  </span>
                  <div>
                    <div>Se "Método de pagamento" = "Boleto" → <strong className="text-green-900">320</strong></div>
                    <div>Caso contrário → <strong className="text-green-900">318</strong></div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-200 text-orange-900 min-w-[80px]">
                    QA
                  </span>
                  <div>
                    <div>Se "Método de pagamento" = "Boleto" → <strong className="text-green-900">2</strong></div>
                    <div>Caso contrário → <strong className="text-green-900">15</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">Total:</span> {mappings.length} colunas mapeadas + {fixedColumns.length} campos fixos
          {transformationRules && transformationRules.length > 0 && ` + ${transformationRules.length} regras de transformação`}
        </p>
      </div>
    </div>
  );
};
