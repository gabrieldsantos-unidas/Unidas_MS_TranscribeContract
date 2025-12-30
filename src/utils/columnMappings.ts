import { ColumnMapping, FixedColumn, TransformationRule } from '../types/contracts';

export const contratosGruposMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoContratoAX' },
  { original: 'CNPJ/CPF', target: 'CodigoCliente' },
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
  { original: 'Área de negócio', target: 'CodigoSegmentacaoProduto' },
];

export const contratosGruposFixedColumns: FixedColumn[] = [
  { name: 'PeriodoReajuste', value: 12 },
  { name: 'CodigoSituacao', value: 9 },
  { name: 'TipoRenovacao', value: 'C' },
  { name: 'CodigoContratoGrupoTipo', value: 2 },
  { name: 'CodigoClasse', value: 2 },
  { name: 'FaturamentoSAPBrim', value: 'S' },
  { name: 'TipoContrato', value: 'Fleet' },
  { name: 'CodigoEmpresa', value: '75609123000123' },
  { name: 'CodigoSegmentacaoNegocio', value: '1' },
];

export const contratosGruposTransformationRules: TransformationRule[] = [
  {
    field: 'ModoTaxaAdministrativaMulta',
    condition: 'Valor',
    trueValue: 'V',
    falseValue: 'P',
  },
  {
    field: 'ModoTaxaAdministrativaAvaria',
    condition: 'Valor',
    trueValue: 'V',
    falseValue: 'P',
  },
  { field: 'CodigoSegmentacaoProduto', condition: 'Leves', trueValue: '8', falseValue: '6',
  },
  { field: 'CodigoIndice', condition: 'IGPM', trueValue: 1, falseValue: 2 },
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
  { name: 'CobrancaMultaRescisoria', value: 'S' },
];

export const contratosGruposItensMapping: ColumnMapping[] = [
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoContratoItemAX' },
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Código Modelo Locavia Integração', target: 'CodigoModelo' },
  { original: 'Final Placa', target: 'CodigoVeiculosFinalPlaca' },
  { original: 'Transporte remunerado placa vermelha', target: 'CodigoCorPlaca' },
  { original: 'Tonalidade Locavia', target: 'TonalidadeCor' },
  { original: 'Centro Custo', target: 'CentroCustoCliente' },
  { original: 'Valor Uso Excedente', target: 'ValorKmRodado' },
  { original: 'Id da Cor', target: 'IdDaCor' },
  { original: 'CNPJ/CPF', target: 'CodigoCliente' },
  { original: 'Valor locação com serviços', target: 'ValorPeriodoLiquido' },
  { original: 'Bundle ID', target: 'BundleID' },
  { original: 'Tipo de Registro do Produto', target: 'TipoRegistroProduto' },
];

export const contratosGruposItensFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
  { name: 'TipoOficina', value: 'M' },
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
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
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
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'Id Acessório Produto', target: 'IdAcessorioProduto' },
  { original: 'Bundle ID', target: 'BundleID' },
  { original: 'Tipo de Registro do Produto', target: 'TipoRegistroProduto' },
];

export const contratosGruposItensEquipamentosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensFaturamentoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
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
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'ID da oportunidade', target: 'NumeroProposta' },
  { original: 'ID da oportunidade', target: 'NumeroTermoAceite' },
];

export const contratosGruposItensIntegracoesSalesforceFixedColumns: FixedColumn[] = [];

export const contratosGruposItensManutencaoParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'Quantidade de pneus', target: 'QuantidadePneuContratado' },
  { original: 'Responsabilidade troca de pneus', target: 'ResponsabilidadeTrocaPneu' },
  { original: 'Responsabilidade troca pneus (pesados)', target: 'ResponsabilidadeTrocaPneuPesados' },
  { original: 'Manutenção', target: 'CodigoContratosGruposTipoManutencao' },
  { original: 'SLA Liberacao Reserva Capital (Manut.)', target: 'SLAReservaCapital' },
  { original: 'SLA Liberacao Reserva Interior (Manut.)', target: 'SLAReservaInterior' },
  { original: 'KM máximo para agendar manutenção', target: 'KmMaxManutencao' },
];

export const contratosGruposItensManutencaoParametrosFixedColumns: FixedColumn[] = [];

export const contratosGruposItensManutencaoParametrosTransformationRules: TransformationRule[] = [
  { field: 'CodigoContratosGruposTipoManutencao', condition: 'Preventiva', trueValue: 1, falseValue: 0 },
  { field: 'CodigoContratosGruposTipoManutencao', condition: 'Corretiva', trueValue: 2, falseValue: 0 },
  { field: 'CodigoContratosGruposTipoManutencao', condition: 'Preventiva Plus', trueValue: 3, falseValue: 0 },
  { field: 'CodigoContratosGruposTipoManutencao', condition: 'Preventiva+Corretiva', trueValue: 4, falseValue: 0 },
  { field: 'CodigoContratosGruposTipoManutencao', condition: 'Personalizada', trueValue: 5, falseValue: 0 },
];

export const contratosGruposItensMultasDevolucoesAntecipadasMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
];

export const contratosGruposItensMultasDevolucoesAntecipadasFixedColumns: FixedColumn[] = [
  { name: 'Tipo', value: 'P' },
];

// Regra especial de geração de múltiplas linhas:
// Para cada linha do Excel, processa as colunas "Prazo mínimo para devolução (1)...(10)"
// e "% Multa por devolução antecipada (1)...(10)", gerando uma linha no loader para
// cada prazo preenchido diferente de "Até o fim do contrato".
// MesFinal: extraído do texto do prazo (ex: "12 meses" → 12, "Até o fim do contrato" → 999)
// MesInicial: calculado por ID, sendo 1 para a primeira linha e MesFinal anterior + 1 para as seguintes

export const contratosGruposItensParametrosMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'Tipo de Uso: Tipo de Uso', target: 'TipoUso' },
  { original: 'Prazo Contratual', target: 'Vigencia' },
  { original: 'Cidade entrega', target: 'CidadeEntrega' },
  { original: 'UF Entrega', target: 'UfEntrega' },
  { original: 'Escolha letra de placa', target: 'TipoLote' },
  { original: 'Escolha número de placa', target: 'EscolhaNumero' },
  { original: 'Forma de entrega', target: 'FormaEntrega' },
  { original: 'Previsão de Entrega', target: 'PrevisaoEntrega' },
  { original: 'Prazo de entrega', target: 'PrazoEntrega' },
  { original: 'Frete de Retorno', target: 'ResponsavelFreteRetorno' },
  { original: 'Responsabilidade de entrega', target: 'ResponsavelFreteEntrega' },
  { original: 'Cobertura danos materiais e corporais', target: 'CoberturaDanosMateriaisCorporais' },
  { original: 'Danos morais (DMO)', target: 'CoberturaDanosMorais' },
  { original: 'Acidentes pessoais a passageiros (APP)', target: 'CoberturaApp' },
  { original: 'Opção de compra', target: 'OpcaoCompra' },
  { original: 'Valor %', target: 'PercValorOpcaoCompra' },
  { original: 'Valor R$', target: 'ValorTivoOpcaoCompra' },
  { original: 'Responsabilidade implementação', target: 'ResponsabilidadeImplementacao' },
  { original: 'Outros (Encargos Atraso Pagamento)', target: 'CodigoIntegracaoSAPDespesaAtraso' },
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
  { original: 'Nome Contato Multas', target: 'NomeContatoMulta' },
  { original: 'Email Contato Multas', target: 'EmailContatoMulta' },
  { original: 'Telefone Contato Multas', target: 'TelefoneContatoMulta' },
  { original: 'Nome Gestor Entrega', target: 'NomeGestorEntrega' },
  { original: 'Email Gestor Entrega', target: 'EmailGestorEntrega' },
  { original: 'Telefone Gestor Entrega', target: 'TelefoneGestorEntrega' },
  { original: 'Dias para Abertura da Locação', target: 'DiasAberturaLocacao' },
  { original: 'Dia de Envio Medição', target: 'DiaEnvioMedicao' },
  { original: 'Locação Mensal ou Safra?', target: 'CodigoTipoFaturamentoMensal' },
  { original: 'Meses Safra', target: 'CalendarioDePagamento' },
  { original: 'Isen. Multa Pt/Roubo/Furto Sem Locação', target: 'IsencaoMultaDevolucaoAntecipadadSemNovaLocacao' },
  { original: 'Isen. Multa Pt/Roubo/Furto Sem Locação', target: 'IsencaoMultaDevolucaoAntecipadadSemNovaLocacaoAlteracaoPreco' },
  { original: '% para devolução da Frota sem multa', target: 'MultaDevolucaoProta' },
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
  { original: 'Tipo Seguro Casco', target: 'TipoSeguro' },
  { original: 'Período de Reajuste', target: 'ProximoReajuste' },
  { original: 'Método de Pagamento.', target: 'CodigoFormaPagamento' },
  { original: 'Código Condição de Pagamento', target: 'CodigoCondicaoPagamento' },
  { original: 'Ciclo de Faturamento (data corte)', target: 'DiaFaturamento' },
  { original: 'Encargos por atraso no pagamento', target: 'CodigoIntegracaoSAPBrimTaxaJuro' },
  { original: 'Tipo Taxa administrativa de multas', target: 'ModeloTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'ValorTaxaAdministrativaMulta' },
  { original: 'Taxa administrativa de multas', target: 'PercentualTaxaAdministrativaMulta' },
  { original: 'Data Específica Reajuste', target: 'DataUltimoReajuste' },
  { original: 'Índice de reajuste', target: 'CodigoIndice' },
  { original: 'Distribuição de Linhas ID 18', target: 'DistribuicaoLinha' },
];

export const contratosGruposItensParametrosFixedColumns: FixedColumn[] = [
  { name: 'CobrancaMultaRescisoria', value: 'S' },
  { name: 'PeriodoReajuste', value: '12' },
  { name: 'FaturaSomenteQuandoHouverBoleto', value: 'N' },
  { name: 'EnviarEmailMultaCondutorPrincipal', value: 'S' },
];

export const contratosGruposItensParametrosTransformationRules: TransformationRule[] = [
  { field: 'CodigoIndice', condition: 'IGPM', trueValue: 1, falseValue: 2 },
  { field: 'ResponsavelFreteRetorno', condition: 'Unidas', trueValue: 1, falseValue: 2 },
  { field: 'ResponsavelFreteEntrega', condition: 'Unidas', trueValue: 1, falseValue: 2 },
  { field: 'AET', condition: 'S', trueValue: 1, falseValue: 0 },
  { field: 'CIVCIPP', condition: 'S', trueValue: 1, falseValue: 0 },
  {
    field: 'ModeloTaxaAdministrativaMulta',
    condition: 'Valor',
    trueValue: 'V',
    falseValue: 'P',
  }
];

// Regras condicionais especiais baseadas no ambiente (Produção/QA):

export const contratosGruposItensServicosAdicionaisMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'Id do Serviço', target: 'IdDoServico' },
  { original: 'Bundle ID', target: 'BundleID' },
  { original: 'Tipo de Registro do Produto', target: 'TipoRegistroProduto' },
];

export const contratosGruposItensServicosAdicionaisFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
  { name: 'ValorUnitario', value: 0 },
  { name: 'ValorTotal', value: 0 },
];

export const contratosGruposVeiculosModelosClientesMapping: ColumnMapping[] = [
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoGrupoContratoItem' },
  { original: 'CNPJ/CPF da Unidade de Faturamento', target: 'CodigoCliente' },
  { original: 'Centro Custo', target: 'CentroCustoCliente' },
];

export const contratosGruposVeiculosModelosClientesFixedColumns: FixedColumn[] = [
  { name: 'Quantidade', value: 1 },
];

export const poolDePneusMapping: ColumnMapping[] = [
  { original: 'Linha de cotação ID', target: 'CodigoContratoGrupoPool' },
  { original: 'Número do Contrato Salesforce', target: 'CodigoGrupoContrato' },
  { original: 'Número do Contrato Salesforce', target: 'NumeroTermoAceite' },
  { original: 'Data de criação', target: 'DataInicio' },
  { original: 'Prazo Contratual', target: 'PrazoContratual' },
  { original: 'Pool de pneus', target: 'PoolDePneus' },
  { original: 'Pool de uso mensal', target: 'PoolDeUsoMensal' },
  { original: 'Pool de reserva', target: 'PoolDeReserva' },
  { original: 'Quantidade de pneus', target: 'QuantidadeDePneus' },
  { original: 'Uso Mensal', target: 'UsoMensal' },
  { original: 'Quantidade diárias de reserva', target: 'QuantidadeDiariasDeReserva' },
  { original: 'Quantidade', target: 'QuantidadeVeiculo' },
  { original: 'Distribuição de Linhas ID 18', target: 'CodigoContratoGrupoPoolItem' },
];

export const poolDePneusFixedColumns: FixedColumn[] = [
  { name: 'CodigoProdutoServico', value: 2 },
];
