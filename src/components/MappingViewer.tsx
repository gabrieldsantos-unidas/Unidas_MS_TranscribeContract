import { Info, ArrowRight, Zap } from 'lucide-react';
import { ContractCreationType, ContractItemType, TransformationRule } from '../types/contracts';
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

interface MappingViewerProps {
  contractType: ContractCreationType | ContractItemType;
}

export const MappingViewer = ({ contractType }: MappingViewerProps) => {
  const getMappingForType = (type: ContractCreationType | ContractItemType) => {
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
                    Regra
                  </span>
                  <div>
                    <div>Se "Método de pagamento" = "Boleto" → <strong className="text-green-900">320</strong></div>
                    <div>Se "Método de pagamento" = "Depósito" → <strong className="text-green-900">319</strong></div>
                    <div>Se "Método de pagamento" = "Pix" → <strong className="text-green-900">12</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {contractType === 'ContratosGruposItensMultasDevolucoesAntecipadas' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regra de Geração de Múltiplas Linhas
          </h4>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-yellow-900">Para cada linha do Excel:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Processamento de colunas:</strong> Analisa sequencialmente as colunas "Prazo mínimo para devolução (1)...(10)" e
                  "% Multa por devolução antecipada (1)...(10)"
                </li>
                <li>
                  <strong>Geração de linhas:</strong> Para cada prazo preenchido, gera uma linha no loader.
                  <span className="font-semibold text-yellow-900"> IMPORTANTE: Para quando encontrar "Até o fim do contrato"</span> -
                  não processa os prazos seguintes
                </li>
                <li>
                  <strong>Cálculo de MesFinal:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Extrai o número de meses do texto (ex: "12 meses" → 12)</li>
                    <li>"Até o fim do contrato" → 999</li>
                  </ul>
                </li>
                <li>
                  <strong>Cálculo de MesInicial:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Primeira linha: MesInicial = 1</li>
                    <li>Linhas seguintes: MesInicial = MesFinal da linha anterior + 1</li>
                  </ul>
                </li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-300 space-y-2">
                <div>
                  <p className="text-xs font-medium text-yellow-900">
                    Exemplo 1: Prazos (1)="6 meses", (2)="Até o fim do contrato" → Gera 2 linhas:
                  </p>
                  <ul className="text-xs mt-1 space-y-0.5 ml-4">
                    <li>Linha 1: MesInicial=1, MesFinal=6</li>
                    <li>Linha 2: MesInicial=7, MesFinal=999</li>
                    <li className="italic text-yellow-800">Para no prazo (2), não processa (3), (4), etc.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-yellow-900">
                    Exemplo 2: Prazos (1)="6 meses", (2)="12 meses", (3)="24 meses" → Gera 3 linhas:
                  </p>
                  <ul className="text-xs mt-1 space-y-0.5 ml-4">
                    <li>Linha 1: MesInicial=1, MesFinal=6</li>
                    <li>Linha 2: MesInicial=7, MesFinal=12</li>
                    <li>Linha 3: MesInicial=13, MesFinal=24</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {contractType === 'PoolDePneus' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regra de Geração de Múltiplas Tabelas
          </h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-blue-900">Para cada linha do Excel:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Identificação dos pools:</strong> Verifica as colunas "Pool de pneus", "Pool de uso mensal" e "Pool de reserva"
                </li>
                <li>
                  <strong>Geração de linhas:</strong> Para cada pool com valor "Sim" ou "S", gera:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Uma linha na tabela <strong>ContratoGrupoPool</strong></li>
                    <li>Uma linha correspondente na tabela <strong>ContratoGrupoPoolItem</strong></li>
                  </ul>
                </li>
                <li>
                  <strong>Tipo do Pool:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Pool de pneus = "Sim" → Tipo = "P" (Quantidade = Quantidade de pneus)</li>
                    <li>Pool de uso mensal = "Sim" → Tipo = "K" (Quantidade = Uso Mensal)</li>
                    <li>Pool de reserva = "Sim" → Tipo = "R" (Quantidade = Quantidade diárias de reserva)</li>
                  </ul>
                </li>
                <li>
                  <strong>Cálculo de DataFim:</strong> DataFim = Data de criação + Prazo Contratual (em meses)
                </li>
              </ol>
              <div className="mt-3 p-2 bg-blue-100 rounded border border-blue-300">
                <p className="text-xs font-medium text-blue-900">
                  Exemplo: Se uma linha tiver os 3 pools marcados como "Sim":
                </p>
                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                  <li>Gera 3 linhas em ContratoGrupoPool (Tipo P, K e R)</li>
                  <li>Gera 3 linhas em ContratoGrupoPoolItem (correspondentes)</li>
                  <li className="italic text-blue-800">Total: 6 linhas geradas a partir de 1 linha de entrada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {contractType === 'ContratosGruposItensEquipamentos' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regra de Vinculação de Acessórios a Bundles
          </h4>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-purple-900">Condições de Aplicação:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tipo de Registro do Produto = <strong>IRIS_Acessorios</strong></li>
                <li>Bundle ID está preenchido</li>
                <li>Id Acessório Produto está preenchido</li>
              </ul>

              <p className="font-semibold text-purple-900 mt-3">Transformação:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Identificar acessórios:</strong> Localiza todas as linhas com Tipo = IRIS_Acessorios que possuem Bundle ID
                </li>
                <li>
                  <strong>Localizar dispositivo correspondente:</strong> Para cada acessório, busca a linha com o mesmo Bundle ID onde Tipo = IRIS_Dispositivo
                </li>
                <li>
                  <strong>Replicar linha do dispositivo:</strong> Gera uma nova linha copiando os dados do dispositivo (bundle) e preenchendo:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><strong>CodigoEquipamento</strong> = Id Acessório Produto do acessório</li>
                  </ul>
                </li>
                <li>
                  <strong>Repetição:</strong> Se houver N acessórios para o mesmo Bundle ID, o bundle será replicado N vezes (uma para cada acessório)
                </li>
              </ol>

              <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
                <p className="text-xs font-medium text-purple-900">
                  Exemplo: Bundle ID = a3eHZ000000ANzT com 2 acessórios (462, 401):
                </p>
                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                  <li>Identifica 3 linhas dispositivo (IRIS_Dispositivo) com esse Bundle ID:</li>
                  <li className="ml-4">- a5HHZ0000015Ra6, a5HHZ0000015Ra7, a5HHZ0000015Ra8</li>
                  <li>Identifica 2 acessórios (IRIS_Acessorios) com esse Bundle ID: 462, 401</li>
                  <li>Gera 6 linhas de saída (3 dispositivos × 2 acessórios):</li>
                  <li className="ml-4">- Ra6 + 462, Ra6 + 401, Ra7 + 462, Ra7 + 401, Ra8 + 462, Ra8 + 401</li>
                  <li className="italic text-purple-800 mt-1">Resultado: Produto cartesiano entre dispositivos e acessórios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {contractType === 'ContratosGruposItensServicosAdicionais' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regra de Vinculação de Serviços a Bundles
          </h4>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-purple-900">Condições de Aplicação:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tipo de Registro do Produto = <strong>IRIS_Serviços</strong></li>
                <li>Bundle ID está preenchido</li>
                <li>Id do Serviço está preenchido</li>
              </ul>

              <p className="font-semibold text-purple-900 mt-3">Transformação:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Identificar serviços:</strong> Localiza todas as linhas com Tipo = IRIS_Serviços que possuem Bundle ID
                </li>
                <li>
                  <strong>Localizar dispositivo correspondente:</strong> Para cada serviço, busca a linha com o mesmo Bundle ID onde Tipo = IRIS_Dispositivo
                </li>
                <li>
                  <strong>Replicar linha do dispositivo:</strong> Gera uma nova linha copiando os dados do dispositivo (bundle) e preenchendo:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><strong>CodigoServicoAdicional</strong> = Id do Serviço</li>
                  </ul>
                </li>
                <li>
                  <strong>Repetição:</strong> Se houver N serviços para o mesmo Bundle ID, o bundle será replicado N vezes (uma para cada serviço)
                </li>
              </ol>

              <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
                <p className="text-xs font-medium text-purple-900">
                  Exemplo: Bundle ID = a3eHZ000000ANzT com 2 serviços (111, 112):
                </p>
                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                  <li>Identifica 3 linhas dispositivo (IRIS_Dispositivo) com esse Bundle ID:</li>
                  <li className="ml-4">- a5HHZ0000015Ra6, a5HHZ0000015Ra7, a5HHZ0000015Ra8</li>
                  <li>Identifica 2 serviços (IRIS_Serviços) com esse Bundle ID: 111, 112</li>
                  <li>Gera 6 linhas de saída (3 dispositivos × 2 serviços):</li>
                  <li className="ml-4">- Ra6 + 111, Ra6 + 112, Ra7 + 111, Ra7 + 112, Ra8 + 111, Ra8 + 112</li>
                  <li className="italic text-purple-800 mt-1">Resultado: Produto cartesiano entre dispositivos e serviço</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {contractType === 'ContratosGruposItens' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Regra de Vinculação de Cores a Bundles
          </h4>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-purple-900">Condições de Aplicação:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tipo de Registro do Produto = <strong>IRIS_Cores</strong></li>
                <li>Bundle ID está preenchido</li>
                <li>Id da Cor está preenchido</li>
              </ul>

              <p className="font-semibold text-purple-900 mt-3">Transformação:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <strong>Identificar serviços:</strong> Localiza todas as linhas com Tipo = IRIS_Cores que possuem Bundle ID
                </li>
                <li>
                  <strong>Localizar dispositivo correspondente:</strong> Para cada cor, busca a linha com o mesmo Bundle ID onde Tipo = IRIS_Dispositivo
                </li>
                <li>
                  <strong>Replicar linha do dispositivo:</strong> Gera uma nova linha copiando os dados do dispositivo (bundle) e preenchendo:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><strong>CodigoCor</strong> = Id da Cor</li>
                  </ul>
                </li>
                <li>
                  <strong>Repetição:</strong> Se houver N cores para o mesmo Bundle ID, o bundle será replicado N vezes (uma para cada cor)
                </li>
              </ol>

              <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
                <p className="text-xs font-medium text-purple-900">
                  Exemplo: Bundle ID = a3eHZ000000ANzT com 2 cores (60, 61):
                </p>
                <ul className="text-xs mt-1 space-y-0.5 ml-4">
                  <li>Identifica 3 linhas dispositivo (IRIS_Dispositivo) com esse Bundle ID:</li>
                  <li className="ml-4">- a5HHZ0000015Ra6, a5HHZ0000015Ra7, a5HHZ0000015Ra8</li>
                  <li>Identifica 2 cores (IRIS_Cores) com esse Bundle ID: 60, 61</li>
                  <li>Gera 6 linhas de saída (3 dispositivos × 2 cores):</li>
                  <li className="ml-4">- Ra6 + 60, Ra6 + 61, Ra7 + 60, Ra7 + 61, Ra8 + 60, Ra8 + 61</li>
                  <li className="italic text-purple-800 mt-1">Resultado: Produto cartesiano entre dispositivos e cores</li>
                </ul>
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
