import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { ContractSection } from './types/contracts';
import { ContractCreation } from './components/ContractCreation';
import { ContractItems } from './components/ContractItems';

function App() {
  const [selectedSection, setSelectedSection] = useState<ContractSection>('creation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Unidas Locadora</h1>
              <p className="text-blue-100 text-sm">Sistema de Importação e Exportação de Contratos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedSection('creation')}
                className={`flex-1 px-6 py-4 text-lg font-semibold transition-all ${
                  selectedSection === 'creation'
                    ? 'bg-blue-600 text-white border-b-4 border-blue-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Criação do Contrato
              </button>
              <button
                onClick={() => setSelectedSection('items')}
                className={`flex-1 px-6 py-4 text-lg font-semibold transition-all ${
                  selectedSection === 'items'
                    ? 'bg-blue-600 text-white border-b-4 border-blue-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Criação de Itens do Contrato
              </button>
            </div>
          </div>

          <div className="p-8">
            {selectedSection === 'creation' ? <ContractCreation /> : <ContractItems />}
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Unidas Locadora - Sistema de Gestão de Contratos</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
