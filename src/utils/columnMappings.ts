import { ColumnMapping, FixedColumn, TransformationRule } from '../types/contracts';

export const contratosGruposMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoContratoAX' },
  { original: 'Código Cliente Locavia', target: 'CodigoCliente' },
  { original: 'Periodo de Reajuste', target: 'PeriodoReajuste' },
  { original: 'Data Específica Reajuste', target: 'DataUltimoReajuste' },
  { original: 'Tipo Fatura Locação', target: 'TipoFatura' },
  { original: 'Emitir Fatura de Despesa', target: 'EmitirFaturaDespesa' },
  { original: 'Tipo Fatura de Diversos', target: 'TipoFaturaDiversos' },
  { original: 'Tipo de Fatura do Combustível', target: 'TipoFaturaCombustivel' },
  { original: 'Envio Prévia Faturamento (medição)', target: 'GerarMedicao' },
  { original: 'Cobrar KM Excedente', target: 'CobrarKmExcedenteTerminoContrato' },
  { original: 'Cobrar Combustível', target: 'CobrarCombustivelCliente' },
  { original: 'Acumular Franquia KM', target: 'AcumularFranquiaKm' },
  { original: 'Tipo Pro Rata', target: 'TipoProrrata' },
  { original: 'Cobrar Diferença Diária Devolução', target: 'CobrarDiferencaDiaria' },
  { original: 'Fatura por Veículo', target: 'GerarFaturaParaCadaVeiculo' },
  { original: 'Discriminar Período Fatura', target: 'DiscriminarPeriodosVeiculosFatura' },
  { original: 'Faturamento Antecipado', target: 'FaturamentoAntecipado' },
  { original: 'Índice de reajuste', target: 'CodigoIndice' },
  { original: 'Origem do lead', target: 'Origem' },
  { original: 'Tipo Taxa administrativa de multas', target: 'ModoTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'ValorTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'PercentualTaxaAdministrativaMulta' },
  { original: 'Código prazo de pagamento locavia', target: 'CodigoCondicaoPagamento' },
  { original: 'Ciclo de Faturamento (data corte)', target: 'DiaFaturamento' },
  { original: 'Percentual de reajuste', target: 'PercReajusteIndice' },
  { original: 'Percentual de reajuste', target: 'PercFixoReajuste' },
  { original: 'Observações', target: 'ObservacaoContrato' },
  { original: 'Locação Mensal ou Safra?', target: 'TipoFaturamento' },
  { original: 'ID da oportunidade', target: 'IdOportunidade' },
  { original: 'Encargos por atraso no pagamento', target: 'CodigoIntegracaoSAPBrimTaxaJuro' },
  { original: 'Dia de Envio Medição', target: 'DiaCicloMedicao' },
  { original: 'Tipo Taxa administrativa de avarias', target: 'ModoTaxaAdministrativaAvaria' },
  { original: 'Taxa administrativa de avarias', target: 'ValorTaxaAdministrativaAvaria' },
  { original: 'Taxa administrativa de avarias', target: 'PercentualTaxaAdministrativaAvaria' },
];

export const contratosGruposFixedColumns: FixedColumn[] = [
  { name: 'CodigoSituacao', value: 9 },
  { name: 'TipoRenovacao', value: 'C' },
  { name: 'CodigoContratoGrupoTipo', value: 2 },
  { name: 'CodigoClasse', value: 2 },
  { name: 'FaturamentoSAPBrim', value: 'Sim' },
  { name: 'TipoContrato', value: 'Fleet' },
];

export const contratosGruposFaturamentoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Prazo aprovação ND (tácita)', target: 'AprovacaoTacitaFaturamentoNaoAprovado' },
  { original: 'Multa de insistência operacional', target: 'MultaInsistenciaOperacional' },
  { original: '% Reajuste contrato vencido', target: 'PercReajusteContratoVencido' },
  { original: 'Prazo de carência reajuste vencido', target: 'PrazoCarenciaReajusteVencido' },
  { original: 'Acréscimo após 6 meses contrato vencido', target: 'AcrescimoAposContratoVencido' },
  { original: 'Forma de reajuste contrato vencido', target: 'FormaReajusteContratoVenciddo' },
];

export const contratosGruposFaturamentoParametrosFixedColumns: FixedColumn[] = [];

export const contratosGruposIntegracoesSalesMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Vinculo do Contrato', target: 'VinculoContrato' },
  { original: 'Número do Contrato Salesforce', target: 'NumeroContrato' },
  { original: 'ID da oportunidade', target: 'NumeroProposta' },
  { original: 'ID da oportunidade', target: 'NumeroTermoAceite' },
];

export const contratosGruposIntegracoesSalesFixedColumns: FixedColumn[] = [];

export const contratosGruposParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Dias para Abertura da Locação', target: 'DiasAberturaLocacao' },
  { original: 'Prazo contratual', target: 'VigenciaMaster' },
  { original: 'Prorrogação Início Locação (Implement.)', target: 'ProrrogacaoInicioLocacaoImplementacaoCliente' },
  { original: 'Dia de Envio Medição', target: 'DiaEnvioMedicao' },
  { original: 'Meses Safra', target: 'CalendarioPagamento' },
  { original: 'Isen. Multa Pt/Roubo/Furto Nova Locação', target: 'IsentoMultaDevolucaoAntecipada' },
  { original: 'Isen. Multa Pt/Roubo/Furto Sem Locação', target: 'IsencaoMultaDevolucaoAntecipadaSemNovaLocacao' },
  { original: '% para devolução da Frota sem multa', target: 'PercDevolucaoFrotaSemMulta' },
  { original: 'Prazo Rescisão Atraso Pagamento', target: 'AlteracaoPrazoParaRescicaoPorInadimplencia' },
  { original: 'Preposto', target: 'Preposto' },
  { original: 'Tipo de serviço', target: 'TipoServico' },
  { original: 'Quantidade de PMT', target: 'QuantidadeParcelasEntradaFleet' },
  { original: 'Valor da PMT', target: 'ValorEntradaFleet' },
  { original: 'Data de Recebimento PMT', target: 'VencimentoEntradaFleet' },
  { original: 'Reajuste PMT', target: 'ReajusteEntradaFleet' },
  { original: 'Encargos por atraso no pagamento', target: 'CodigoTaxaJuros' },
];

export const contratosGruposParametrosFixedColumns: FixedColumn[] = [
  { name: 'CobrancaMultaRescisoria', value: 'S(SIM)' },
];

export const contratosGruposItensMapping: ColumnMapping[] = [
  { original: 'Distribuição de Linhas ID', target: 'CodigoContratoItemAX' },
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Código Modelo Locavia Integração', target: 'CodigoModelo' },
  { original: 'Final Placa', target: 'CodigoVeiculosFinalPlaca' },
  { original: 'Transporte remunerado placa vermelha', target: 'CodigoCorPlaca' },
  { original: 'Tonalidade Locavia', target: 'TonalidadeCor' },
  { original: 'Centro Custo', target: 'CentroCustoCliente' },
  { original: 'Valor Uso Excedente', target: 'ValorKmRodado' },
  { original: 'Código Cor Locavia', target: 'CodigoCor' },
  { original: 'Codigo Cliente Locavia', target: 'CodigoCliente' },
];

export const contratosGruposItensFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
  { name: 'TipoOficina', value: 'Multimarcas, Concessionária' },
];

export const contratosGruposItensTransformationRules: TransformationRule[] = [
  {
    field: 'CodigoCorPlaca',
    condition: 'Sim',
    trueValue: 3,
    falseValue: 2,
  },
];

export const contratosGruposItensDesmobilizacaoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'R$ Franquia (Sinistro)', target: 'ValorParticipacaoObrigatoriaSinistro' },
  { original: 'R$ Franquia (PT,Roubo,Furto)', target: 'ValorParticipacaoObrigatoriaPTRoubo' },
  { original: '% Franquia (Sinistro)', target: 'PercValorParticipacaoObrigatoriaSinistro' },
  { original: '% Franquia (PT,Roubo,Furto)', target: 'PercParticipacaoObrigatoriaPTRoubo' },
  { original: 'Seguro vidros', target: 'SeguroVidros' },
  { original: 'Tipo de seguro vidro', target: 'TipoSeguroVidro' },
  { original: 'Descritivo seguro vidros', target: 'DescricaoSeguroVidros' },
  { original: 'Limitação diárias de reserva', target: 'LimiteDiariasReservas' },
];

export const contratosGruposItensDesmobilizacaoParametrosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensEquipamentosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Id Acessorios', target: 'CodigoEquipamento' },
];

export const contratosGruposItensEquipamentosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensFaturamentoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Prazo aprovação ND (tácita)', target: 'AprovacaoTacitaFaturamentoNaoAprovado' },
  { original: 'Multa de insistência operacional', target: 'ValorMultaInsistenciaOperacional' },
  { original: '% Reajuste contrato vencido', target: 'PercReajusteContratoVencido' },
  { original: 'Prazo de carência reajuste vencido', target: 'PrazoCarenciaReajusteVencido' },
  { original: 'Acréscimo após 6 meses contrato vencido', target: 'ValorAcrescimoAposContratoVencido' },
  { original: 'Forma de reajuste contrato vencido', target: 'FormaReajusteContratoVenciddo' },
];

export const contratosGruposItensFaturamentoParametrosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensIntegracoesSalesforceMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'ID da oportunidade', target: 'NumeroProposta' },
  { original: 'ID da oportunidade', target: 'NumeroTermoAceite' },
];

export const contratosGruposItensIntegracoesSalesforceFixedColumns: FixedColumn[] = [];

export const contratosGruposItensManutencaoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Quantidade de pneus', target: 'QuantidadePneuContratado' },
  { original: 'Responsabilidade troca de pneus', target: 'ResponsabilidadeTrocaPneu' },
  { original: 'Manutenção', target: 'CodigoContratosGruposTipoManutencao' },
  { original: 'SLA Liberacao Reserva Capital (Manut.)', target: 'SLAReservaCapital' },
  { original: 'SLA Liberacao Reserva Interior (Manut.)', target: 'SLAReservaInterior' },
  { original: 'KM máximo para agendar manutenção', target: 'KmMaxManutencao' },
];

export const contratosGruposItensManutencaoParametrosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensManutencaoParametrosTransformationRules: TransformationRule[] = [
  { field: 'ResponsabilidadeTrocaPneu', condition: 'Preventiva', trueValue: 1, falseValue: 0 },
  { field: 'ResponsabilidadeTrocaPneu', condition: 'Corretiva', trueValue: 2, falseValue: 0 },
  { field: 'ResponsabilidadeTrocaPneu', condition: 'Preventiva Plus', trueValue: 3, falseValue: 0 },
  { field: 'ResponsabilidadeTrocaPneu', condition: 'Preventiva+Corretiva', trueValue: 4, falseValue: 0 },
  { field: 'ResponsabilidadeTrocaPneu', condition: 'Personalizada', trueValue: 5, falseValue: 0 },
];

export const contratosGruposItensMultasDevolucoesAntecipadasMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Prazo mínimo para devolução (1)', target: 'MesInicial' },
  { original: 'Prazo mínimo para devolução (1)', target: 'MesFinal' },
  { original: '% Multa por devolução antecipada (1)', target: 'Valor' },
];

export const contratosGruposItensMultasDevolucoesAntecipadasFixedColumns: FixedColumn[] = [
  { name: 'Tipo', value: 'P' },
];

export const contratosGruposItensParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Tipo de Uso', target: 'TipoUso' },
  { original: 'Prazo Contratual', target: 'Vigencia' },
  { original: 'Cidade entrega', target: 'CidadeEntrega' },
  { original: 'UF Entrega', target: 'UfEntrega' },
  { original: 'Tipo lote da placa', target: 'TipoLote' },
  { original: 'Escolha número de placa', target: 'EscolhaNumero' },
  { original: 'Forma de entrega', target: 'FormaEntrega' },
  { original: 'Previsão de Entrega', target: 'PrevisaoEntrega' },
  { original: 'Frete de Retorno', target: 'ResponsavelFreteRetorno' },
  { original: 'Responsabilidade de entrega', target: 'ResponsavelFreteEntrega' },
  { original: 'Cobertura danos materiais e corporais', target: 'CoberturaDanosMateriaisCorporais' },
  { original: 'Danos morais (DMO)', target: 'CoberturaDanosMorais' },
  { original: 'Acidentes pessoais a passageiros (APP)', target: 'CoberturaApp' },
  { original: 'Opção de compra', target: 'OpcaoCompra' },
  { original: 'Valor %', target: 'PercValorOpcaoCompra' },
  { original: 'Valor R$', target: 'ValorTivoOpcaoCompra' },
  { original: 'Responsabilidade implementação', target: 'ResponsabilidadeImplementacao' },
  { original: 'Despesas Atraso Pagamento', target: 'CodigoIntegracaoSAPDespesaAtraso' },
  { original: 'Cláusulas Infração (Indicação Condutor)', target: 'ClausulaIndicacaoCondutor' },
  { original: 'Cláusulas Infração (Comunicação)', target: 'ClausulaIntracaoComunicacao' },
  { original: 'Precisa AET', target: 'AET' },
  { original: 'Responsabilidade renovação CIV CIPP', target: 'CIVCIPP' },
  { original: 'Licenças diversas', target: 'LicensasDiversas' },
  { original: 'Informações de laudo de fumaça preta', target: 'LaudoFumacaPreta' },
  { original: 'Pool de uso mensal', target: 'PoolPool' },
  { original: 'Prazo para cobrança Unidas (ND)', target: 'LimitePrazoCobrancaMultaAvaria' },
  { original: 'Nome Contato Financeiro', target: 'NomeContatoFinanceiro' },
  { original: 'Email Contato Financeiro', target: 'EmailContatoFinanceiro' },
  { original: 'Telefone Contato Financeiro', target: 'TelefoneContatoFinanceiro' },
  { original: 'Valor Uso Excedente', target: 'KmExcedente' },
  { original: 'Telefone Multas', target: 'TelefoneContatoMulta' },
  { original: 'Email Contato Multas', target: 'EmailContatoMulta' },
  { original: 'Telefone Contato Multas', target: 'TelefoneContatoMulta' },
  { original: 'Nome Gestor Entrega', target: 'NomeGestorEntrega' },
  { original: 'Email Gestor Entrega', target: 'EmailGestorEntrega' },
  { original: 'Telefone Gestor Entrega', target: 'TelefoneGestorEntrega' },
  { original: 'Data para Abertura da Locação', target: 'DiasAberturaLocacao' },
  { original: 'Data de Envio Medição', target: 'DiaEnvioMedicao' },
  { original: 'Locação Mensal ou Safra?', target: 'CodigoTipoFaturamentoMensal' },
  { original: 'Meses Safra', target: 'CalendarioDePagamento' },
  { original: 'Isen. Multa Pt/Roubo/Furto Sem Locação', target: 'IsencaoMultaDevolucaoAntecipadadSemNovaLocacao' },
  { original: 'Isen. Multa Pt/Roubo/Furto Sem Locação', target: 'IsencaoMultaDevolucaoAntecipadadSemNovaLocacaoAlteracaoPreco' },
  { original: 'Multa devolucao de Prota sem multa', target: 'MultaDevolucaoProta' },
  { original: 'Tipo de serviço', target: 'TipoServico' },
  { original: 'Quantidade de PMT', target: 'QuantidadeProotasEntradasFleet' },
  { original: 'Valor da PMT', target: 'ValorEntradaFleet' },
  { original: 'Data de Recebimento PMT', target: 'VencimentoEntradaFleet' },
  { original: 'Envio Prévia Faturamento (medição)', target: 'EnvioPreviaFaturamento' },
  { original: 'Contato Faturamento: Nome completo', target: 'NomeContatoFaturamento' },
  { original: 'Email Faturamento', target: 'EmailContatoFaturamento' },
  { original: 'Telefone Faturamento', target: 'TelefoneContatoFaturamento' },
  { original: 'Linha de cotação ID', target: 'IdCotacaoItem' },
  { original: 'Seguro casco', target: 'SeguroCasco' },
  { original: 'Tipo Seguro Casco', target: 'TipoSeguroCasco' },
  { original: 'Período de Reajuste', target: 'ProximoReajuste' },
  { original: 'Método de pagamento', target: 'CodigoFormaPagamento' },
  { original: 'Condição de pagamento', target: 'CodigoCondicaoPagamento' },
  { original: 'Ciclo de Faturamento (data corte)', target: 'DiaFaturamento' },
  { original: 'Encargos por atraso no pagamento', target: 'CodigoIntegracaoSAPDirnTaxaJuro' },
  { original: 'Tipo Taxa administrativa de multas', target: 'ModeloTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'ValorTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'PercentualTaxaAdministrativaMulta' },
  { original: 'Período de Reajuste', target: 'PeriodoReajuste' },
  { original: 'Data Específica Reajuste', target: 'DataUltimoReajuste' },
  { original: 'Índice de reajuste', target: 'CodigoIndice' },
  { original: 'Distribuição de Linhas ID', target: 'DistribuicaoLinha' },
];

export const contratosGruposItensParametrosFixedColumns: FixedColumn[] = [
  { name: 'CobrancaMultaRescisoria', value: 'Sim' },
];

export const contratosGruposItensParametrosTransformationRules: TransformationRule[] = [
  { field: 'DataUltimoReajuste', condition: 'IGPM', trueValue: 1, falseValue: 0 },
  { field: 'DataUltimoReajuste', condition: 'IPCA', trueValue: 2, falseValue: 0 },
];

// Regras condicionais especiais baseadas no ambiente (Produção/QA):
//
// CodigoFormaPagamento:
//   - Produção: Se "Método de pagamento" = "Boleto" → 320, caso contrário → 318
//   - QA: Se "Método de pagamento" = "Boleto" → 2, caso contrário → 15

export const contratosGruposItensServicosAdicionaisMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'Id do Serviço', target: 'CodigoServicoAdicional' },
];

export const contratosGruposItensServicosAdicionaisFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
];

export const contratosGruposVeiculosModelosClientesMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID', target: 'CodigoGrupoContratoItem' },
  { original: 'CNPJ/CPF da Unidade de Faturamento', target: 'CodigoCliente' },
  { original: 'Centro Custo', target: 'CentroCustoCliente' },
];

export const contratosGruposVeiculosModelosClientesFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
];
