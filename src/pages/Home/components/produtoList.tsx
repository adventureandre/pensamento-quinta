import { Livro } from "@/types/livro";
import { Star } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface ProdutoListHomeProps {
  title: string;
  livros: Livro[] | null;
  isLoading: boolean;
  carrosselId: string;
}

export function ProdutoListHome({
  livros,
  isLoading,
  title,
  carrosselId,
}: ProdutoListHomeProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<any>(null);

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

      <div className="w-full max-w-6xl relative px-4 sm:px-10">
        {isLoading ? (
          <p className="w-full text-center text-xl font-semibold">
            Carregando - {title} ...
          </p>
        ) : (
          <>
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={isMobile ? 2 : 4}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className={`w-full ${carrosselId}`}
            >
              {livros?.map((livro) => (
                <SwiperSlide key={livro.id}>
                  <article
                    className="w-full mb-14 rounded-xl pb-3 border-b-2 border-r-2 transition-transform hover:scale-105 hover:shadow-lg"
                    style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <img
                      className="w-full h-60 md:h-80 object-cover rounded-lg"
                      src={livro.imgSrc}
                      alt={`Imagem ${livro.title}`}
                    />
                    <h2 className="text-sm text-gray-500 text-center mx-3 mt-2 overflow-hidden whitespace-nowrap text-ellipsis">
                      {livro.title}
                    </h2>
                    <p className="text-lg mb-1 font-bold w-full text-center">
                      {`R$ ${livro.price.toFixed(2)}`}
                    </p>
                    <span className="flex justify-center text-yellow-500 mb-2 w-full">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} size={21} weight="fill" />
                      ))}
                    </span>
                    <button
                      className="block mx-auto bg-[#E5D2B8] text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-[#d4c0a7] transition mt-5"
                      onClick={() => navigate(`/livros/${livro.id}`)}
                    >
                      Saiba Mais!
                    </button>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botões de navegação personalizados */}
            <button
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:text-gray-500 w-8 h-8 hidden sm:flex items-center justify-center"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                />
              </svg>
            </button>

            <button
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:text-gray-500 w-8 h-8 hidden sm:flex items-center justify-center"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      <hr className="border-t border-black border-opacity-25 w-[50%] mt-10" />
    </section>
  );
}
