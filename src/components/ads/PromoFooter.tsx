import { MessageCircle, Instagram, Globe, Coffee } from 'lucide-react';

const PromoFooter = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5517999754390?text=Olá! Vi o gerador de currículo e gostaria de saber mais sobre desenvolvimento web.', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/douuglinha95', '_blank');
  };

  return (
    <div className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Seção principal */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Coffee size={20} className="text-primary-600" />
            <span className="text-lg font-semibold text-gray-800">
              Desenvolvido com carinho para a comunidade
            </span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Este gerador de currículo é <strong>100% gratuito</strong>. Se precisar de um site profissional 
            para sua empresa ou projeto pessoal, estamos aqui para ajudar!
          </p>
        </div>

        {/* Botões de contato */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-6">
          <button
            onClick={handleWhatsApp}
            className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg w-full sm:w-auto justify-center group"
          >
            <MessageCircle size={20} className="group-hover:animate-pulse" />
            <div className="text-left">
              <div className="font-semibold">Precisa de um site?</div>
              <div className="text-xs opacity-90">Desenvolvimento web profissional</div>
            </div>
          </button>
          
          <button
            onClick={handleInstagram}
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center group"
          >
            <Instagram size={20} className="group-hover:animate-pulse" />
            <div className="text-left">
              <div className="font-semibold">Siga no Instagram</div>
              <div className="text-xs opacity-90">@douuglinha95</div>
            </div>
          </button>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Globe size={16} />
              <span>Gerador de Currículo Moderno - Gratuito para todos</span>
            </div>
            <div className="text-center sm:text-right">
              <p>Desenvolvido por <strong>Douglas</strong></p>
              <p className="text-xs">WhatsApp: (17) 99975-4390</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoFooter;