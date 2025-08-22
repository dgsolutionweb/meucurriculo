import { useState, useCallback } from 'react';
import { Download, Eye, Edit } from 'lucide-react';
import type { ResumeData } from './types/resume';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { usePDFGenerator } from './hooks/usePDFGenerator';
import PromoBanner from './components/ads/PromoBanner';
import PromoFooter from './components/ads/PromoFooter';
import FloatingPromo from './components/ads/FloatingPromo';

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photo: undefined,
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  theme: 'classic'
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { generatePDF } = usePDFGenerator();

  const handleDataChange = useCallback((newData: ResumeData) => {
    setResumeData(newData);
  }, []);

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Se não estiver na aba preview, mudar para ela primeiro
      if (activeTab !== 'preview') {
        setActiveTab('preview');
        // Aguardar um momento para o DOM ser atualizado
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const result = await generatePDF('resume-preview', 'meu-curriculo.pdf');
      if (!result.success) {
        alert('Erro ao gerar PDF. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Promocional */}
      <PromoBanner />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              Gerador de Currículo
            </h1>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Tab Navigation */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors text-sm ${
                    activeTab === 'edit'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Editar</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors text-sm ${
                    activeTab === 'preview'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Visualizar</span>
                </button>
              </div>
              
              {/* Download Button */}
              <button
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
                className="btn btn-primary flex items-center space-x-1 sm:space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm px-2 sm:px-4 py-1 sm:py-2"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {isGeneratingPDF ? 'Gerando...' : 'Baixar PDF'}
                </span>
                <span className="sm:hidden">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {activeTab === 'edit' ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                Preencha suas informações
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Complete os campos abaixo para criar seu currículo profissional.
              </p>
            </div>
            
            <ResumeForm data={resumeData} onChange={handleDataChange} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6 text-center">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                Visualização do Currículo
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Veja como seu currículo ficará no formato final.
              </p>
            </div>
            
            <div className="w-full overflow-x-auto">
              <div className="w-full max-w-4xl mx-auto">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Banner Flutuante (só na visualização) */}
      <FloatingPromo show={activeTab === 'preview'} />

      {/* Footer Promocional */}
      <PromoFooter />
    </div>
  );
}

export default App;
