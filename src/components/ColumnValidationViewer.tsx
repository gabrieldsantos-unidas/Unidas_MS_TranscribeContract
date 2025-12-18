import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { ColumnValidation } from '../types/contracts';

interface ColumnValidationViewerProps {
  validation: ColumnValidation;
}

export const ColumnValidationViewer: React.FC<ColumnValidationViewerProps> = ({ validation }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {validation.isValid ? (
          <>
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Validação de Colunas: OK</h3>
          </>
        ) : (
          <>
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Validação de Colunas: Atenção</h3>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Colunas Correspondidas */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">
              Colunas Encontradas ({validation.matchedColumns.length})
            </h4>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {validation.matchedColumns.length > 0 ? (
              validation.matchedColumns.map((col, idx) => (
                <div key={idx} className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded">
                  {col}
                </div>
              ))
            ) : (
              <p className="text-sm text-green-700 italic">Nenhuma coluna encontrada</p>
            )}
          </div>
        </div>

        {/* Colunas Faltando */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-900">
              Colunas Faltando ({validation.missingColumns.length})
            </h4>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {validation.missingColumns.length > 0 ? (
              validation.missingColumns.map((col, idx) => (
                <div key={idx} className="text-sm text-red-800 bg-red-100 px-2 py-1 rounded">
                  {col}
                </div>
              ))
            ) : (
              <p className="text-sm text-red-700 italic">Todas as colunas esperadas estão presentes</p>
            )}
          </div>
        </div>

        {/* Colunas Extras */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-yellow-900">
              Colunas Extras ({validation.extraColumns.length})
            </h4>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {validation.extraColumns.length > 0 ? (
              validation.extraColumns.map((col, idx) => (
                <div key={idx} className="text-sm text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                  {col}
                </div>
              ))
            ) : (
              <p className="text-sm text-yellow-700 italic">Nenhuma coluna extra detectada</p>
            )}
          </div>
        </div>
      </div>

      {/* Validações Gerais (Todas as Tabelas) */}
      {validation.allTablesValidation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Validações Gerais</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              {validation.allTablesValidation.hasCodigoContratoAXOrGrupoContrato ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-medium ${
                  validation.allTablesValidation.hasCodigoContratoAXOrGrupoContrato
                    ? 'text-green-900'
                    : 'text-red-900'
                }`}>
                  Todas as Tabelas?
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {validation.allTablesValidation.hasCodigoContratoAXOrGrupoContrato
                    ? 'Coluna "Número do Contrato Salesforce" encontrada - valores serão automaticamente prefixados com "SF" se necessário'
                    : 'Coluna "Número do Contrato Salesforce" não encontrada'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              {validation.allTablesValidation.hasPercentSymbolInEnd ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  validation.allTablesValidation.hasPercentSymbolInEnd
                    ? 'text-green-900'
                    : 'text-red-900'
                }`}>
                  Validação
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Valores com "%" no final serão automaticamente corrigidos (removendo o símbolo)
                </p>
                {validation.allTablesValidation.percentIssues &&
                 validation.allTablesValidation.percentIssues.length > 0 && (
                  <div className="mt-2 bg-blue-100 rounded p-2 text-xs text-blue-800">
                    <p className="font-semibold">✓ {validation.allTablesValidation.percentIssues[0]}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2">
              {validation.allTablesValidation.hasSimNaoValidation ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  validation.allTablesValidation.hasSimNaoValidation
                    ? 'text-green-900'
                    : 'text-red-900'
                }`}>
                  Validação
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Valores "Sim" e "Não" serão automaticamente convertidos para "S" e "N"
                </p>
                {validation.allTablesValidation.simNaoIssues &&
                 validation.allTablesValidation.simNaoIssues.length > 0 && (
                  <div className="mt-2 bg-blue-100 rounded p-2 text-xs text-blue-800">
                    <p className="font-semibold">✓ {validation.allTablesValidation.simNaoIssues[0]}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2">
              {validation.allTablesValidation.hasRealValidation ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-medium ${
                  validation.allTablesValidation.hasRealValidation
                    ? 'text-green-900'
                    : 'text-red-900'
                }`}>
                  Validação
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Valores com "R$" no início serão automaticamente corrigidos (removendo o símbolo)
                </p>
                {validation.allTablesValidation.realIssues &&
                 validation.allTablesValidation.realIssues.length > 0 && (
                  <div className="mt-2 bg-blue-100 rounded p-2 text-xs text-blue-800">
                    <p className="font-semibold">✓ {validation.allTablesValidation.realIssues[0]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resumo */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Resumo:</span>{' '}
          {validation.matchedColumns.length} de{' '}
          {validation.matchedColumns.length + validation.missingColumns.length} colunas esperadas encontradas.
          {validation.extraColumns.length > 0 && (
            <span className="text-yellow-800">
              {' '}
              {validation.extraColumns.length} coluna(s) extra(s) não mapeada(s) será(ão) ignorada(s).
            </span>
          )}
        </p>
        {!validation.isValid && (
          <p className="text-sm text-red-700 mt-2 font-medium">
            ⚠️ Atenção: O arquivo está faltando colunas obrigatórias. O processamento pode falhar ou gerar
            dados incompletos.
          </p>
        )}
      </div>
    </div>
  );
};
