import { useEffect } from 'react';
import { pedidosStore } from '@/store/pedidosStore';
import livroPedidos from '../../../../public/assets/images/livroPedidos.png';
import { livrosStore } from '@/store/livrosStore';

export function PedidosDashboard() {
    const { load: loadPedidos, pedidos } = pedidosStore();
    const { findById, load: loadLivros, livros } = livrosStore();

    useEffect(() => {
        const fetchData = async () => {
            await loadPedidos(101);
            await loadLivros();
        };

        fetchData();
    }, [loadPedidos, loadLivros]);

    console.log("pedidos",pedidos)
    console.log("livros",pedidos)

    // Obtendo os detalhes dos livros pedidos
    const orderedBooks = pedidos?.books.map(id => livros?.find(livro => livro.id === id));

    return (
        <section className='w-full pl-6 mt-6'>
            <h1 className="text-3xl font-semibold font-playfair mb-6">Pedidos</h1>
            {orderedBooks?.map((livro, index) => (
                <article key={index} className='flex items-center gap-3 border-b pb-3 mb-3'>
                    <img src={livroPedidos} alt={`Livro ${livro?.title}`} />
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
