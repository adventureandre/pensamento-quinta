import { useEffect, useState } from 'react';

import { FaRegTrashAlt } from 'react-icons/fa';

import ConverterMoeda from '@/services/ConverterMoeda';
import { getCartData, updateQtd, deleteProduct } from '@/services/CookieCart';

interface ShopBagCardProps {
  onUpdate: () => void;
}

export default function ShopBagCard({ onUpdate }: ShopBagCardProps) {
  const [controller, setController] = useState(false);
  const [livros, setLivros] = useState(getCartData());

  const sumQtd = (meth: string, id: number) => {
    updateQtd(meth, id);
    setController(!controller);
  };

  const subtractionQtd = (meth: string, id: number) => {
    updateQtd(meth, id);
    setController(!controller);
  };

  const deleteCard = (id: number) => {
    deleteProduct(id);
    setController(!controller);
  };

  useEffect(() => {
    const updatedLivros = getCartData();
    setLivros(updatedLivros);
    onUpdate();
  }, [controller, onUpdate]);

  return (
    <>
      {livros.length > 0 ? (
        <div>
          {livros?.map((livro, index) => (
            <div
              key={index}
              className={`${index % 2 === 0 ? 'bg-[#B3B792]' : 'bg-white'} flex p-2 font-podkova`}
            >
              <div className='w-28 h-28 pr-2 flex-shirink-0 overflow-hidden'>
                <img
                  src={livro.imgSrc}
                  alt={`livro ${livro.title}`}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex flex-col flex-wrap justify-around w-3/4 overflow-hidden'>
                <p className='text-base w-full truncate'>{livro.title}</p>
                <p className='text-base font-semibold'>
                  {ConverterMoeda(livro.price)}
                </p>
                <div className='flex'>
                  <button
                    className='py-1 px-2 bg-[#6C705B] rounded-l-full text-white'
                    onClick={() => {
                      subtractionQtd('subtraction', livro.id);
                    }}
                    disabled={livro.qtd === 1}
                  >
                    -
                  </button>
                  <p className='px-2 py-1 border-2 border-[#6C705B] text-[#6C705B] font-semibold self-center'>
                    {livro.qtd}
                  </p>
                  <button
                    className='py-1 px-2 bg-[#6C705B] rounded-r-full text-white'
                    onClick={() => {
                      sumQtd('sum', livro.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  deleteCard(livro.id);
                }}
              >
                <FaRegTrashAlt
                  size={25}
                  color={index % 2 === 0 ? '#ffffff' : '#B3B792'}
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-around h-full'>
          <img
            src='../../assets/images/bag.png'
            alt='Sacola de compras'
            className='size-40'
          />
        </div>
      )}
    </>
  );
}
