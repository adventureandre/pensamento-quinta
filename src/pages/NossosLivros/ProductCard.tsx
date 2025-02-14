import { Star, Heart } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import { Livro } from '@/types/livro';

import { autoresStore } from '@/store/autoresStore';
import { useEffect } from 'react';

export default function ProductCard({ livro }: { livro: Livro }) {
  const { autores, load } = autoresStore();
  const autor = autores?.find((autor) => Number(autor.id) === livro.authorId);

  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <a
      href={`/livros/${livro.id}`}
      className='flex justify-center items-center flex-wrap w-full h-96 rounded-xl pb-3 border-2 transition-transform transform hover:scale-105 shadow-lg hover:cursor-pointer'
    >
      {/* Icone de Coração para favoritos (ainda estático pois não há backend) */}
      <div
        className={`absolute right-5 top-3 ${
          livro?.launch === true ? 'text-red-600' : 'text-black'
        }`}
      >
        <Heart size={21} weight='fill' />
      </div>
      {/* Imagem do livro */}
      <div className='w-full h-3/5 overflow-hidden p-2'>
        <img
          className='object-contain h-full w-full'
          src={livro.imgSrc}
          alt={`Imagem ${livro.title}`}
        />
      </div>
      {/* Demais informações - Título, nome do autor e Preço */}
      <h2 className='text-base text-gray-900 font-bold text-center mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis'>
        {livro.title}
      </h2>
      <p className='w-full text-center'>
        {autor ? autor.name : 'Autor desconhecido'}
      </p>
      <p className='text-lg mb-1 font-extrabold w-full text-center'>{`R$ ${livro.price.toFixed(2)}`}</p>
      {/* Icones de estrela - estático pois não há backend de avaliações */}
      <span className='flex justify-center text-yellow-500 mb-2 w-full'>
        <Star size={21} weight='fill' />
        <Star size={21} weight='fill' />
        <Star size={21} weight='fill' />
        <Star size={21} weight='fill' />
      </span>
      {/* Botão que redireciona para a página do produto */}
      <div className='w-full flex justify-center'>
        <button
          className='bg-[#E5D2B8] text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-[#d4c0a7] transition'
          onClick={() => {
            navigate(`/livros/${livro.id}`);
          }}
        >
          Saiba Mais
        </button>
      </div>
    </a>
  );
}
