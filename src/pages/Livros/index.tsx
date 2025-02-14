import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart } from 'phosphor-react';
import { create, StateCreator } from 'zustand';
import { Link, useParams } from 'react-router-dom';
import { livrosStore } from '@/store/livrosStore';
import { Livro } from '@/types/livro';
import { getCartData, setCartData, updateQtd } from '@/services/CookieCart';

interface StoreState {
  favorito: boolean;
  toggleFavorito: () => void;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const storeCreator: StateCreator<StoreState> = (set) => ({
  favorito: false,
  toggleFavorito: () => set((state) => ({ favorito: !state.favorito })),
  quantity: 1,
  increaseQuantity: () =>
    set((state) => ({
      quantity: Math.min(state.quantity + 1, 30)
    })),
  decreaseQuantity: () =>
    set((state) => ({
      quantity: Math.max(state.quantity - 1, 1)
    }))
});

const useStore = create<StoreState>(storeCreator);

const cepSchema = z.object({
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/, 'CEP inválido')
});

type CepSchema = z.infer<typeof cepSchema>;

export function Livros() {
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentImage, setCurrentImage] = useState<string>('');

  const [qtdProduct, setQtdProduct] = useState(1);

  const { favorito, toggleFavorito } = useStore();

  const { findById } = livrosStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CepSchema>({
    resolver: zodResolver(cepSchema)
  });

  useEffect(() => {
    const fetchLivro = async () => {
      setIsLoading(true);
      if (id) {
        const livroData = await findById(Number(id));
        if (livroData) {
          console.log('Dados do livro:', livroData);
          setLivro(livroData);
          if (livroData.imgSrc) {
            setCurrentImage(livroData.imgSrc);
          } else {
            console.warn('Propriedade imgSrc não encontrada no livro.');
          }
        } else {
          console.warn('Livro não encontrado.');
          setLivro(null);
        }
      }
      setIsLoading(false);
    };

    fetchLivro();
  }, [id, findById]);

  const onSubmit: SubmitHandler<CepSchema> = (data) => {
    alert(`CEP válido: ${data.cep}`);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('thumbnail-container');
    if (container) {
      const scrollAmount = 150;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className='flex w-full h-full justify-center items-center'>
        <img
          src='../../public/assets/loading.svg'
          alt='Spining to loading'
          className='size-20'
        />
      </div>
    );
  }

  if (!livro) {
    return (
      <div className='min-h-screen py-12 flex items-center justify-center'>
        <p className='text-xl font-bold'>Livro não encontrado.</p>
      </div>
    );
  }

  const thumbnails = livro.thumbnailImages || [];

  const saveOnCookies = () => {
    const cartData = getCartData(); // Obtém os dados do carrinho atual

    if (cartData.length > 0) {
      // Verifica se o livro já existe no carrinho
      const livroExistente = cartData.find(
        (item) => Number(item.id) === livro.id || item.title === livro.title
      );

      if (!livroExistente) {
        // Se não existir, adiciona o novo livro ao carrinho
        setCartData([
          ...cartData, // Mantém os itens existentes
          {
            id: livro.id,
            imgSrc: livro.imgSrc,
            price: livro.price,
            title: livro.title,
            authorId: Number(livro.authorId),
            qtd: qtdProduct
          }
        ]);
        // Abre carrinho de compras
        const openShopBag = document.getElementById('cart-bag');
        openShopBag?.click();
      } else {
        console.error('Produto já existente no carrinho.');
        alert('O produto já está no carrinho!');
      }
    } else {
      // Se o carrinho estiver vazio, adiciona o primeiro livro
      setCartData([
        {
          id: livro.id,
          imgSrc: livro.imgSrc,
          price: livro.price,
          title: livro.title,
          authorId: Number(livro.authorId),
          qtd: qtdProduct
        }
      ]);
      // Abre carrinho de compras
      const openShopBag = document.getElementById('cart-bag');
      openShopBag?.click();
    }
  };

  const sumQtd = () => {
    setQtdProduct(qtdProduct + 1);
    updateQtd('sum', Number(id));
  };

  const subtractionQtd = () => {
    setQtdProduct(qtdProduct - 1);
    updateQtd('subtraction', Number(id));
  };

  return (
    <div className='min-h-screen py-12 font-sans'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Seção de navegação */}
        <nav className='mb-8 text-sm text-gray-600'>
          <Link to='/' className='hover:underline'>
            Início
          </Link>{' '}
          &gt;{' '}
          <Link to='/nossoslivros' className='hover:underline'>
            Nossos Livros
          </Link>{' '}
          &gt; <span className='text-gray-800 font-bold'>{livro.title}</span>
        </nav>

        {/* Seção principal */}
        <div className='flex flex-col md:flex-row gap-12 items-start'>
          {/* Imagem */}
          <div className='flex flex-col items-center gap-6 w-full md:w-1/2'>
            {/* Imagem principal */}
            <div className='relative w-full max-w-md h-96'>
              <img
                src={currentImage}
                alt={livro.title}
                className='w-full h-full object-contain rounded-2xl'
              />
            </div>
            {/* Miniaturas em carrossel */}
            <div className='relative w-full'>
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2'>
                <button
                  className='bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300'
                  onClick={() => handleScroll('left')}
                >
                  &lt;
                </button>
              </div>
              <div
                id='thumbnail-container'
                className='flex gap-4 scroll-smooth p-2 overflow-hidden'
              >
                {thumbnails.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Miniatura ${index + 1}`}
                    className='w-32 h-32 object-contain rounded-lg cursor-pointer'
                    onClick={() => setCurrentImage(imageUrl)}
                  />
                ))}
              </div>
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2'>
                <button
                  className='bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300'
                  onClick={() => handleScroll('right')}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Detalhes do livro */}
          <div className='flex-1 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm'>
            <div className='flex items-start gap-4'>
              <div className='flex-1'>
                <h2 className='text-3xl font-bold text-gray-800'>
                  {livro.title}
                </h2>
                {livro.authorId && (
                  <p className='text-gray-500 mt-1 font-semibold'>
                    {livro.authorId}
                  </p>
                )}
              </div>
              <button
                className='p-2 rounded-full transition-colors hover:bg-gray-100'
                onClick={toggleFavorito}
              >
                <Heart
                  size={28}
                  weight={favorito ? 'fill' : 'regular'}
                  className={`${
                    favorito ? 'text-red-500' : 'text-gray-500'
                  } transition-colors`}
                />
              </button>
            </div>
            <div className='mt-6'>
              <p className='text-2xl font-bold text-gray-800'>
                R$ {livro.price.toFixed(2)}
              </p>
              <div className='flex items-center gap-4 mt-4'>
                <div className='flex items-center'>
                  <button
                    className='bg-gray-200 text-gray-800 px-3 py-1 rounded-l-full hover:bg-gray-300'
                    onClick={subtractionQtd}
                    disabled={qtdProduct === 1}
                  >
                    -
                  </button>
                  <span className='border-t border-b border-gray-200 px-4 py-1 font-semibold'>
                    {qtdProduct}
                  </span>
                  <button
                    className='bg-gray-200 text-gray-800 px-3 py-1 rounded-r-full hover:bg-gray-300'
                    onClick={sumQtd}
                  >
                    +
                  </button>
                </div>
                <span className='text-sm text-gray-500 font-semibold'>
                  Disponível em estoque
                </span>
              </div>
            </div>
            {/* Informações adicionais */}
            <p className='text-sm text-gray-600 mt-4 font-semibold'>
              <span className='font-bold text-gray-700'>
                Pedido em Estoque:
              </span>{' '}
              após confirmação do pagamento, envio imediato. Confira os prazos
              de entrega abaixo.
            </p>
            {/* Botão adicionar ao carrinho */}
            <button
              onClick={saveOnCookies}
              className='mt-6 bg-[#B3B792] text-white px-6 py-3 rounded-full w-full hover:bg-[#9FAF6F] transition-colors font-bold'
            >
              Adicionar ao carrinho
            </button>
            {/* Consulta de frete */}
            <div className='mt-8'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col sm:flex-row items-center gap-4'
              >
                <input
                  type='text'
                  placeholder='Digite seu CEP'
                  {...register('cep')}
                  className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-semibold'
                />
                <button
                  type='submit'
                  className='bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors font-bold'
                >
                  Consultar Frete
                </button>
              </form>
              {errors.cep && (
                <p className='text-red-500 text-sm mt-2 font-semibold'>
                  {errors.cep.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Seção de sinopse */}
        {livro.sinopse && (
          <div className='mt-12'>
            <div className='p-8 bg-white border border-gray-200 rounded-2xl shadow-sm'>
              <h3 className='text-2xl font-bold text-gray-800'>Sinopse</h3>
              <p className='text-gray-700 mt-4 leading-relaxed font-semibold'>
                {livro.sinopse}
              </p>
            </div>
          </div>
        )}

        {/* Seção de ficha técnica */}
        <div className='mt-8'>
          <div className='p-8 bg-white border border-gray-200 rounded-2xl shadow-sm'>
            <h3 className='text-2xl font-bold text-gray-800'>Ficha Técnica</h3>
            <ul className='text-gray-700 mt-4 space-y-2 font-semibold'>
              <li>
                <strong>Editora:</strong> {livro.editora}
              </li>
              <li>
                <strong>Páginas:</strong> {livro.paginas}
              </li>
              <li>
                <strong>Ano:</strong> {livro.ano}
              </li>
              <li>
                <strong>Edição:</strong> {livro.edicao}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
