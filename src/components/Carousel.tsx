import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Carousel() {
  const [figura, setFigura] = useState<Ifigura[]>([]);

  interface Ifigura {
    id: string;
    image: string;
    alt: string;
  }

  const imagens = [
    {
      id: '1',
      image: '/assets/images/banner/banner-lançamentos.png',
      alt: 'Banner informando sobre lançamentos e novidades.',
    },
    {
      id: '2',
      image: '/assets/images/banner/banner-novidades.png',
      alt: 'Banner alertando sobre novidades no site.',
    },
    {
      id: '3',
      image: '/assets/images/banner/banner-papelaria_afetiva.png',
      alt: 'Banner informando sobre a loja Papelaria Afetiva.',
    },
    {
      id: '4',
      image: '/assets/images/banner/banner-promoções.png',
      alt: 'Banner alertando sobre descontos no site.',
    },
  ];

  const imagensMobile = [
    {
      id: '1',
      image: '/assets/images/banner/banner-M-lançamentos.png',
      alt: 'Banner informando sobre lançamentos e novidades.',
    },
    {
      id: '2',
      image: '/assets/images/banner/banner-M-novidades.jpg',
      alt: 'Banner alertando sobre novidades no site.',
    },
    {
      id: '3',
      image: '/assets/images/banner/banner-M-papelaria_afetiva.jpg',
      alt: 'Banner informando sobre a loja Papelaria Afetiva.',
    },
    {
      id: '4',
      image: '/assets/images/banner/banner-M-promoções.png',
      alt: 'Banner alertando sobre descontos no site.',
    },
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setFigura(imagensMobile);
      } else {
        setFigura(imagens);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      speed={4000}
      slidesPerView={1}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      className="w-full h-full"
    >
      {figura.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-auto max-h-[90vh] object-cover sm:max-h-[80vh]"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}