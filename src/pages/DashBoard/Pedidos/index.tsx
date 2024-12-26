import { useEffect, useState } from 'react';
import { pedidosStore } from '@/store/pedidosStore';
import { livrosStore } from '@/store/livrosStore';
import { autoresStore } from '@/store/autoresStore';
import { Livro } from '@/types/livro';
import { Autor } from '@/types/autor';

export function PedidosDashboard() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { load: loadPedidos, pedidos } = pedidosStore();
    const { findById, livro, isLoading: isLoadingLivros } = livrosStore();
    const { autor, findById: findAutorById, isLoading: isLoadingAutores } = autoresStore();
   
    //States local
    const [livros, setLivros] = useState<Livro[]>([]);
    const [autoresList, setAutoresList] = useState<Autor[]>([]);

    const fetchPedidos = async () => {
        await loadPedidos(101);
    };

    const fetchLivros = async () => {
        if (pedidos && pedidos.products) {
            await pedidos.products.map((prod) => findById(prod));
        }
    };

    const fetchAutores = async () => {
        if(livro){
            if (!autoresList.some((autor) => autor.id === livro.authorId)) {
              await  findAutorById(livro.authorId);
            }
        }
    }

    // Busca os pedidos
    useEffect(() => {
        const fetchData = async () => {
            await fetchPedidos();
        };

        fetchData();
    }, []);

    // Recupera os livros dentro do pedido
    useEffect(() => {
        if (pedidos?.products) {
            fetchLivros();
        }
    }, [pedidos]);

    // Atualiza a lista de livros e busca autores
    useEffect(() => {
        if (livro) {
            setLivros((prevLivros) => {
                const livroExists = prevLivros.some((livroPrev) => livroPrev.id === livro.id);
                if (livroExists) {
                    return prevLivros;
                }
                return [...prevLivros, livro];
            });

            //Verifica se o autor já foi buscado
            fetchAutores();

        }
    }, [livro]);

    // Atualiza a lista de autores
    useEffect(() => {
        if (autor && !autoresList.some((autorPrev) => autorPrev.id === autor.id)) {
            setAutoresList((prevAutores) => [...prevAutores, autor]);
        }
    }, [autor,autoresList]);


    return (
        <section className='w-full pl-6 mt-6'>
            <h1 className="text-3xl font-semibold font-playfair mb-6">Pedidos</h1>
            {isLoadingLivros || isLoadingAutores ? (
                <p>Loading...</p>
            ) : (
                livros.map((livroView) => {
                    
                    return (
                        <article key={livroView.id} className='flex items-center gap-3 border-b pb-3 mb-3'>
                            <img className='w-[100px]' src={`${BASE_URL}/${livroView.imgSrc}`} alt={`Livro ${livroView.title}`} />
                            <div className='w-[70%]'>
                                <h2 className='font-bold'>{livroView.title}</h2>
                                <p>Autor: {autoresList.map((autor)=>{
                                    if(autor.id === livroView.authorId){
                                        console.log(autor.name);
                                        return autor.name;
                                    }
                                })}</p>
                             </div>
                            <p>R$ {livroView.price}</p>
                        </article>
                    );
                })
                
            )}

            <div className="flex justify-end flex-wrap pr-6 gap-3">
                <span>Total R$ {pedidos?.totalPrice}</span>
                <div className='w-full flex justify-end gap-2'>
                    <button
                        type="button"
                        className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]"
                    >
                        Acompanhar
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </section>
    );
}
