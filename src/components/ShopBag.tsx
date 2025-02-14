import { useCallback, useState } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import ShopBagCard from './ShopBagCard';
import { getCartData } from '@/services/CookieCart';

export default function ShopBag() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [livros, setLivros] = useState(getCartData());

  const handleUpdate = useCallback(() => {
    setLivros(getCartData());
  }, []);

const handleCartClick = () => {
    try {
      setLivros(getCartData());
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const isEmpty = livros.length === 0;

  return (
    <div>
      <button
        onClick={handleCartClick}
        id='cart-bag'
      >
        <GiShoppingCart size={30} />
      </button>
      {isOpen && (
        <div
          className='flex flex-col absolute right-[10%] top-[16%] w-1/4 bg-white rounded-lg z-50 h-4/6 trasnform-all drop-shadow-xl'
          id='content'
        >
          <div className='absolute -top-[9%] right-[15%] w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[45px] border-b-white'></div>
          <button
            id='close-cart'
            className='text-end mr-4 mt-2 font-semibold'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </button>
          <div className='mb-5 pb-5 overflow-y-auto h-4/5'>
            <ShopBagCard onUpdate={() => handleUpdate} />
          </div>
          {isEmpty ? (
            <button
              className='border-2 font-semibold py-2 px-4 rounded-lg w-4/5 mx-auto mb-[10%] border-[#B3B792] text-[#B3B792] hover:text-white hover:bg-[#B3B792] hover:w-[90%] transform-all duration-200'
              onClick={() => setIsOpen(false)}
            >
              Continuar comprando
            </button>
          ) : (
            <button
              className='w-4/5 mx-auto mb-4 p-2 rounded-lg bg-[#B3B792] text-black text-base font-semibold'
              onClick={() => {
                navigate('/checkout');
                setIsOpen(false);
              }}
            >
              Finalizar compra
            </button>
          )}
        </div>
      )}
    </div>
  );
}
