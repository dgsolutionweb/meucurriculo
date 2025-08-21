import { MessageCircle, Instagram, Heart } from 'lucide-react';

const PromoBanner = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5517999754390?text=Olá! Vi o gerador de currículo e gostaria de saber mais sobre desenvolvimento web.', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/douuglinha95', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Mensagem principal */}
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <Heart size={20} className="text-pink-300 flex-shrink-0" />
            <span className="text-sm sm:text-base font-medium">
              Este app é <strong>gratuito</strong> para toda a população!
            </span>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleWhatsApp}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors text-sm font-medium w-full sm:w-auto justify-center"
            >
              <MessageCircle size={16} />
              <span>Precisa de um site?</span>
            </button>
            
            <button
              onClick={handleInstagram}
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg transition-colors text-sm font-medium w-full sm:w-auto justify-center"
            >
              <Instagram size={16} />
              <span>@douuglinha95</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;