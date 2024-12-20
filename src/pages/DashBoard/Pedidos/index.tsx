import { useEffect, useState } from 'react';
import { pedidosStore } from '@/store/pedidosStore';
import { livrosStore } from '@/store/livrosStore';
import { Livro } from '@/types/livro';


export function PedidosDashboard() {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const { load: loadPedidos, pedidos } = pedidosStore();
    const { findById, livro } = livrosStore();
    const [livros, setLivros] = useState<Livro[] | []>([])


    useEffect(() => {
        const fetchData = async () => {
            await loadPedidos(101);
            const products =  pedidos?.products
            products?.map((prod) => findById(prod))
        };

        fetchData();
    }, []);
    

    useEffect(() => {
        if (livro) {
            setLivros((prevLivros) => {
                const livroExists = prevLivros.some((livroPrev) => livroPrev.id === livro.id);
                if (livroExists) {
                    return prevLivros;
                }
                return [...prevLivros, livro];
            });
        }
    }, [livro]);


    return (
        <section className='w-full pl-6 mt-6'>
            <h1 className="text-3xl font-semibold font-playfair mb-6">Pedidos</h1>
            {livros?.map((livro) => (
                <article key={livro.id} className='flex items-center gap-3 border-b pb-3 mb-3'>
                    <img className='w-[100px]' src={`${BASE_URL}/${livro.imgSrc}`} alt={`Livro ${livro?.title}`} />
                    <div className='w-[70%]'>
                        <h2 className='font-bold'>{livro?.title}</h2>
                        <p>Autor: {livro?.authorId}</p>
                    </div>
                    <p>R$ {livro?.price}</p>
                </article>
            ))}

            <div className="flex justify-end flex-wrap pr-6 gap-3">
                <span>Total R$ {pedidos?.totalPrice}</span>
                <div className='w-full flex justify-end gap-2'>
                    <button
                        type="button"
                        className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#d1bda0]"
                    >
                        Acompanhar
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#d1bda0]"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </section>
    );
}