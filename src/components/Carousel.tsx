import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Carousel() {
  const [figura, setFigura] = useState<Ifigura[]>([])

  interface Ifigura {
    id: string;
    image: string;
    alt: string;
  }

  const imagens = [{
    id: '1',
    image: '/assets/images/banner/banner-lançamentos.png',
    alt: 'Banner informando sobre lançamentos e novidades.',
  },
  {
    id: '2',
    image: '/assets/images/banner/banner-novidades.png',
    alt: 'Banner alertando sobre novidades no site.'
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
  }]

  const imagensMobile = [{
    id: '1',
    image: '/assets/images/banner/banner-M-lançamentos.png',
    alt: 'Banner informando sobre lançamentos e novidades.'
  },
  {
    id: '2',
    image: '/assets/images/banner/banner-M-novidades.jpg',
    alt: 'Banner alertando sobre novidades no site.'
  },
  {
    id: '3',
    image: '/assets/images/banner/banner-M-papelaria_afetiva.jpg',
    alt: 'Banner informando sobre a loja Papelaria Afetiva.'
  },
  {
    id: '4',
    image: '/assets/images/banner/banner-M-promoções.png',
    alt: 'Banner alertando sobre descontos no site.'
  }]

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
        setFigura(imagensMobile)
      } else {
        setFigura(imagens)
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, EffectCoverflow]}
      effect='coverflow'
      speed={700}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {figura.map((item) => (
        <SwiperSlide key={item.id}>
          <img
            src={item.image}
            alt={item.alt}
            className='w-[100%] h-[525px] max-sm:h-[220px]' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}