export function QuemSomosPage() {
    return (
      <main className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Título principal */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in-down">
              Quem Somos
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed animate-fade-in">
              Somos mais do que uma editora. Somos uma comunidade apaixonada por histórias, cultura e conhecimento.
              Confiança, qualidade e inspiração nos guiam a cada passo.
            </p>
          </div>
  
          {/* Cards com visual moderno */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 animate-slide-in">
              <img
                src="/assets/images/nossahistoria.webp"
                alt="Nossa História"
                className="w-full h-48 object-cover group-hover:opacity-90"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nossa História</h2>
                <p className="text-gray-600">
                  Desde o início, acreditamos no poder transformador das histórias. Cada livro carrega a paixão e o compromisso
                  com os nossos leitores.
                </p>
              </div>
            </div>
  
            {/* Card 2 */}
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 animate-slide-in">
              <img
                src="/assets/images/nossamissao.webp"
                alt="Nossa Missão"
                className="w-full h-48 object-cover group-hover:opacity-90"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nossa Missão</h2>
                <p className="text-gray-600">
                  Democratizar a leitura e conectar pessoas através da literatura. Queremos que cada leitor descubra um novo
                  mundo em cada página.
                </p>
              </div>
            </div>
  
            {/* Card 3 */}
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 animate-slide-in">
              <img
                src="/assets/images/nossocompromisso.png"
                alt="Nosso Compromisso"
              className="w-full h-48 object-cover group-hover:opacity-90"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nosso Compromisso</h2>
                <p className="text-gray-600">
                  Trabalhamos para oferecer a melhor experiência. Combinamos qualidade, confiança e inovação em todos os nossos projetos.
                </p>
              </div>
            </div>
          </div>
  
          {/* Banner final */}
          <div className="mt-16 p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6 animate-fade-in-up">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Qualidade e Elegância</h2>
              <p className="text-gray-600 leading-relaxed">
                Nosso objetivo é inspirar confiança e oferecer um serviço impecável. Cada detalhe do nosso trabalho é pensado
                para superar suas expectativas.
              </p>
            </div>
            <button className="w-44 h-10 text-base py-2 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]">
              Saiba Mais
            </button>
          </div>
        </div>
      </main>
    );
  }
  