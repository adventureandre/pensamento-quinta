import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { livrosStore } from '@/store/livrosStore';

import ProductCard from '@/pages/NossosLivros/ProductCard';

export function NossosLivros() {
  const { livros, load, isLoading } = livrosStore();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const [filterSelected, setFilterSelected] = useState<string>('TODOS');

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className='min-h-screen w-full flex flex-col font-podkova'>
      {/* Main Content */}
      <main className='w-full flex flex-col items-center mt-5 px-4 flex-grow'>
        <div className='w-full max-w-7xl'>
          {/* Navegação entre páginas [Pilha] */}
          <nav className='text-sm mb-4 text-gray-600 font-bold'>
            <span
              className='cursor-pointer hover:underline'
              onClick={() => navigate('/')}
            >
              Início
            </span>{' '}
            &gt; <span>Nossos Livros</span>
          </nav>

          <h1 className='text-2xl font-bold mb-3'>NOSSOS LIVROS!</h1>

          {/* Condicional para responsividade - Menu de filtros de busca dos produtos */}
          {screenWidth < 800 ? (
            <select
              name='Filtro'
              id='filter'
              className='border-2 rounded p-3 w-4/6 bg-green-200 text-green-800 font-semibold text-base'
              value={filterSelected}
              onChange={(e) => setFilterSelected(e.target.value)}
            >
              <option value='TODOS'>TODOS</option>
              <option value='LANÇAMENTOS'>LANÇAMENTOS</option>
              <option value='DESTAQUES'>PRODUTOS DESTAQUES</option>
              <option value='KINDLE'>E-BOOK & KINDLE</option>
            </select>
          ) : (
            <div className='flex w-[75%] justify-between lg:w-[45%]'>
              <button
                onClick={() => setFilterSelected('TODOS')}
                className={`bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold ${
                  filterSelected === 'TODOS' ? 'opacity-100' : 'opacity-40'
                }`}
              >
                TODOS
              </button>
              <button
                onClick={() => setFilterSelected('LANÇAMENTOS')}
                className={`bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold ${
                  filterSelected === 'LANÇAMENTOS'
                    ? 'opacity-100'
                    : 'opacity-40'
                }`}
              >
                LANÇAMENTOS
              </button>
              <button
                onClick={() => setFilterSelected('DESTAQUES')}
                className={`bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold ${
                  filterSelected === 'DESTAQUES' ? 'opacity-100' : 'opacity-40'
                }`}
              >
                PRODUTOS DESTAQUES
              </button>
              <button
                onClick={() => setFilterSelected('KINDLE')}
                className={`bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold ${
                  filterSelected === 'KINDLE' ? 'opacity-100' : 'opacity-40'
                }`}
              >
                E-BOOK E KINDLE
              </button>
            </div>
          )}

          {/* Catálogo de itens conforme filtros */}
          <div
            className={`grid gap-6 my-6 ${
              screenWidth < 800
                ? 'grid-cols-1 w-4/5 mx-auto'
                : 'w-full grid-cols-5'
            }`}
          >
            {isLoading ? (
              <div className='flex w-full h-full justify-center items-center'>
                <img
                  src='../../public/assets/loading.svg'
                  alt='Spining to loading'
                  className='size-20'
                />
              </div>
            ) : (
              <>
                {livros && livros.length > 0 ? (
                  filterSelected === 'TODOS' ? (
                    livros.map((livro) => (
                      <ProductCard livro={livro} key={livro.id} />
                    ))
                  ) : filterSelected === 'LANÇAMENTOS' ? (
                    livros
                      .filter((livro) => livro.launch)
                      .map((livro) => (
                        <ProductCard livro={livro} key={livro.id} />
                      ))
                  ) : filterSelected === 'DESTAQUES' ? (
                    livros
                      .filter((livro) => livro.highlight)
                      .map((livro) => (
                        <ProductCard livro={livro} key={livro.id} />
                      ))
                  ) : filterSelected === 'KINDLE' ? (
                    livros
                      .filter((livro) => livro.eBook)
                      .map((livro) => (
                        <ProductCard livro={livro} key={livro.id} />
                      ))
                  ) : null
                ) : (
                  <p>Nenhum Livro encontrado!</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
