import { Livro } from "@/types/livro";
import { Star } from "phosphor-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import livroComentario from '../../../../public/assets/images/livroComentarios.png';

interface ProdutoListHomeProps {
  title: string;
  livros: Livro[] | null;
  isLoading: boolean;
}

export function ComentariosAvaliacoes({
  livros,
  isLoading,
  title,
}: ProdutoListHomeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-2xl font-playfair font-semibold mt-10 px-10 mb-5">
        {title}
      </h1>

      <div className="w-full relative overflow-hidden">
        {isLoading ? (
          <p className="w-full text-center text-xl font-semibold">
            Carregando - {title} ...
          </p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={8} // Diminuindo a distância entre os slides
            slidesPerView={isMobile ? 2 : 5} // 2 slides no mobile, 5 no desktop
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={5000} // Configurando a velocidade do movimento
            className="w-full"
          >
            {livros?.map((livro) => (
              <SwiperSlide key={livro.id}>
                <article
                  className="flex flex-col justify-center items-center w-full md:w-[300px] mb-14 rounded-xl pb-3 p-2 border-b-2 border-r-2 transition-transform transform hover:scale-105 hover:shadow-lg shadow-md"
                >
                  <img
                    className="w-full"
                    src={livroComentario}
                    alt={`Imagem ${livro.title}`}
                  />
                  <div className="flex justify-start w-full ml-2 mt-2">
                    <Star size={16} weight="fill" />
                    <Star size={16} weight="fill" />
                    <Star size={16} weight="fill" />
                    <Star size={16} weight="fill" />
                    <Star size={16} weight="fill" />
                  </div>
                  <h2 className="text-sm text-gray-500 text-center mt-2 mb-2 mx-3 w-full max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {livro.title}
                  </h2>
                  <p className="text-sm text-gray-500 text-center mx-3 w-full max-w-[300px] overflow-hidden">
                    "Uma leitura envolvente, com uma história que prende do
                    início ao fim."
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="flex flex-col items-center mt-5 mb-5">
        <button
          className="bg-white text-black py-2 px-4 rounded-full shadow-md font-bold hover:bg-gray-200 transition"
          onClick={() => alert('Direcionar para fazer um comentário')}
        >
          Fazer um Comentário
        </button>
      </div>
      <hr className="border-t border-black border-opacity-25 w-[50%] mt-8 mb-24" />
      <img
        className="mt-5 mb-10"
        src="/public/assets/images/descontos_politica.png"
        alt="Descontos e Política"
      />
    </section>
  );
}
