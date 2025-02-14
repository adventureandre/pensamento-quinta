export const KindleSection = () => {
  return (
    <>
      <section className="px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Conteúdo Textual */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
              CONHEÇA ESTE E OUTROS LIVROS<br />
              <span className="text-gray-400 text-xl md:text-2xl">DISPONÍVEIS NO KINDLE!</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 text-center md:text-left">
              O Kindle é uma das melhores maneiras de aproveitar a leitura em qualquer lugar e a qualquer momento.
            </p>

            <ul className="grid grid-cols-1 gap-3 md:gap-4">
              {[
                'Praticidade e Portabilidade',
                'Economia',
                'Leitura Personalizável',
                'Acesso Imediato',
                'Leitura em Qualquer Lugar',
                'Sustentabilidade',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#b3b792] text-lg md:text-xl">✓</span>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-center md:text-left text-sm md:text-base">
              Para acessar nossos livros digitais, você será redirecionado para a loja oficial da Editora Pensamentos
              de Quinta na Amazon.
            </p>

            <a
              href="https://www.amazon.com.br/stores/author/B0BGC6GC3R?ingress=0&visitId=258c34d5-a54e-4efd-bebf-43c7a7aadd89"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto bg-[#b3b792] text-white px-6 py-3 rounded-lg hover:bg-[#9a9f7d] transition-colors duration-300 font-bold text-sm md:text-base text-center shadow-md"
            >
              Conheça nossa loja na Amazon!
            </a>
          </div>

          {/* Imagem Kindle com Efeitos */}
          <div className="relative order-first md:order-last">
            <div className="relative overflow-hidden w-full h-[350px] md:h-[600px] flex">
              <img
                src="/assets/images/kindle.png"
                alt="Kindle com livros da Editora Pensamentos de Quinta"
                className="relative z-10 w-full h-full object-contain rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Linha divisória */}
      <hr className="border-t border-black border-opacity-25 w-[80%] md:w-[50%] mt-8 md:mt-10 mx-auto" />
    </>
  );
};