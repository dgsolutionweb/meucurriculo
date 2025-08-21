import { useState } from 'react';
import { X, MessageCircle, Instagram, Sparkles } from 'lucide-react';

interface FloatingPromoProps {
  show: boolean;
}

const FloatingPromo = ({ show }: FloatingPromoProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsApp = () => {
    window.open('https://wa.me/5517999754390?text=Olá! Gostei do gerador de currículo e gostaria de saber sobre desenvolvimento web.', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/douuglinha95', '_blank');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!show || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-bounce">
        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>

        {/* Conteúdo */}
        <div className="pr-6">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="font-semibold text-gray-800 text-sm">
              Gostou do app?
            </span>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">
            Criamos sites profissionais para empresas. Entre em contato!
          </p>

          <div className="flex space-x-2">
            <button
              onClick={handleWhatsApp}
              className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
            >
              <MessageCircle size={12} />
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={handleInstagram}
              className="flex items-center space-x-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
            >
              <Instagram size={12} />
              <span>Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingPromo;