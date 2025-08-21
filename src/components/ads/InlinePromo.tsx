import { MessageCircle, Star, Users } from 'lucide-react';

const InlinePromo = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5517999754390?text=Olá! Uso o gerador de currículo e gostaria de saber sobre desenvolvimento de sites.', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 my-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Star size={20} className="text-yellow-500 mt-0.5" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
            <Users size={16} className="text-blue-600" />
            <span>Precisa de um site profissional?</span>
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Desenvolvemos sites modernos e responsivos para empresas, profissionais liberais e projetos pessoais. 
            Landing pages, e-commerce, sistemas web e muito mais!
          </p>
          
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <MessageCircle size={16} />
            <span>Solicitar Orçamento Gratuito</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InlinePromo;