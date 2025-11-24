export type ContractSection = 'creation' | 'items';

export type ContractCreationType =
  | 'ContratosGrupos'
  | 'ContratosGruposFaturamentoParametros'
  | 'ContratosGruposIntegracoesSales'
  | 'ContratosGruposParametros';

export type ContractItemType =
  | 'ContratosGruposItens'
  | 'ContratosGruposItensDesmobilizacaoParametros'
  | 'ContratosGruposItensEquipamentos'
  | 'ContratosGruposItensFaturamentoParametros'
  | 'ContratosGruposItensIntegracoesSalesforce'
  | 'ContratosGruposItensManutencaoParametros'
  | 'ContratosGruposItensMultasDevolucoesAntecipadas'
  | 'ContratosGruposItensParametros'
  | 'ContratosGruposItensServicosAdicionais'
  | 'ContratosGruposVeiculosModelosClientes';

export interface ColumnMapping {
  original: string;
  target: string;
}

export interface FixedColumn {
  name: string;
  value: string | number;
}

export interface TransformationRule {
  field: string;
  condition: string;
  trueValue: string | number;
  falseValue: string | number;
}
