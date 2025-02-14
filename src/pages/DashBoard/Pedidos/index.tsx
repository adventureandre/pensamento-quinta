import { useEffect, useState } from 'react';
import { pedidosStore } from '@/store/pedidosStore';
import { livrosStore } from '@/store/livrosStore';
import { autoresStore } from '@/store/autoresStore';
import { Livro } from '@/types/livro';

export function PedidosDashboard() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { load: loadPedidos, pedidos } = pedidosStore();
    const { findById: findLivroId, isLoading: isLoadingLivros } = livrosStore();
    const { findById: findAutorById, isLoading: isLoadingAutores } = autoresStore();

    const [livros, setLivros] = useState<Livro[]>([]);
    const [autores, setAutores] = useState<Map<number, string>>(new Map()); // Estado para armazenar autores

    // Função para carregar autores
    const fetchAutores = async () => {
        const autorMap = new Map();
        for (const livro of livros) {
            if (livro.authorId && !autorMap.has(livro.authorId)) {
                const autor = await findAutorById(livro.authorId);
                if (autor) {
                    autorMap.set(livro.authorId, autor.name);
                }
            }
        }
        setAutores(autorMap);
    };

    // Função para carregar os livros
    const fetchLivros = async () => {
        const livrosArray: Livro[] = [];
        for (const item of pedidos?.products || []) {
            const findLivros = await findLivroId(item);
            if (findLivros && !livrosArray.some(livro => livro.id === findLivros.id)) {
                livrosArray.push(findLivros);
            }
        }
        setLivros(livrosArray);
    };

    useEffect(() => {
        loadPedidos(102);
    }, [loadPedidos]);

    useEffect(() => {
        if (pedidos?.products?.length) {
            fetchLivros();
        }
    }, [pedidos]);

    useEffect(() => {
        if (livros.length) {
            fetchAutores();
        }
    }, [livros]);

    return (
        <section className='w-full pl-6 mt-6'>
            <h1 className="text-3xl font-semibold font-playfair mb-6">Pedidos</h1>
            {isLoadingLivros || isLoadingAutores ? (
                <p>Loading...</p>
            ) : (
                livros.map((livroView) => {
                    const autorName = autores.get(livroView.authorId ?? -1);
                    return (
                        <article key={livroView.id} className='flex items-center gap-3 border-b pb-3 mb-3'>
                            <img className='w-[100px]' src={`${BASE_URL}/${livroView.imgSrc}`} alt={`Livro ${livroView.title}`} />
                            <div className='w-[70%]'>
                                <h2 className='font-bold'>{livroView.title}</h2>
                                <p>Autor: {autorName || 'Desconhecido'}</p>
                            </div>
                            <p>R$ {livroView.price.toFixed(2)}</p>
                        </article>
                    );
                })
            )}

            <div className="flex justify-end flex-wrap pr-6 gap-3">
                <span>Total R$ {pedidos?.totalPrice.toFixed(2)}</span>
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
