import { useState } from "react";
import { CaretDown, CaretUp } from "phosphor-react";

export function CuriosidadeHome() {
  const [visibleItem, setVisibleItem] = useState<number | null>(null);

  const handleClick = (item: number) => {
    setVisibleItem(prevItem => (prevItem === item ? null : item));
  };

  return (
    <section className="flex flex-col items-center py-6 md:py-8">
      {/* Título da seção com destaque */}
      <div className="relative mb-4 md:mb-6 w-full max-w-xs md:w-max mx-4">
        <div className="absolute inset-0 bg-[#b3b792] transform -translate-x-1 md:-translate-x-2 -translate-y-1 md:-translate-y-2" />
        <h1 className="relative font-playfair px-4 py-1 md:pt-2 border text-lg md:text-xl bg-white text-center">
          Curiosidades Sobre a Pensamentos de Quinta
        </h1>
      </div>

      <div className="max-w-7xl w-full px-4 md:px-8">
        <article className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
          {/* Container da imagem com margem inferior para mobile */}
          <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              className="max-w-xs md:max-w-full w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              src="./assets/images/curiosidade.png"
              alt="Imagem ilustrativa de curiosidade"
            />
          </div>

          {/* Lista de Curiosidades */}
          <div className="w-full md:w-2/3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-3 md:mb-4">
                <div
                  className="flex items-center justify-between cursor-pointer gap-2"
                  onClick={() => handleClick(item)}
                >
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    {item === 1 && 'O Papel do Editor Vai Além da Revisão'}
                    {item === 2 && 'Muitas Editoras Começaram em Garagens'}
                    {item === 3 && 'Livros Rejeitados Podem se Tornar Sucessos'}
                  </h2>
                  {visibleItem === item ? (
                    <CaretUp size={20} className="text-gray-600" />
                  ) : (
                    <CaretDown size={20} className="text-gray-600" />
                  )}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    visibleItem === item ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm md:text-base mt-1 text-gray-600">
                    {item === 1 &&
                      'Editores não apenas corrigem textos: o trabalho envolve selecionar manuscritos, aprimorar narrativas e transformar ideias em publicações cativantes.'}
                    {item === 2 &&
                      'O mercado editorial começou em pequenos ambientes, com editoras surgindo em garagens e, aos poucos, se transformando em grandes referências literárias.'}
                    {item === 3 &&
                      'Muitos livros rejeitados se tornaram grandes sucessos, provando que o julgamento inicial nem sempre acerta o potencial de uma obra.'}
                  </p>
                </div>

                {item !== 3 && <div className="h-px bg-gray-200 my-3 md:my-4" />}
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* Linha divisória simples */}
      <div className="w-full max-w-4xl mt-8 md:mt-12 border-t border-gray-200" />
    </section>
  );
}
