import livroPedidos from '../../../../public/assets/images/livroPedidos.png';

export function PedidosDashboard() {

    return (
        <section className=' w-full pl-6 mt-6'>
            <h1 className="text-3xl font-semibold font-playfair mb-6">Pedidos</h1>
            <article className=' flex items-center gap-3 border-b pb-3 mb-3'>
                <img src={livroPedidos} alt="Livro 1" />
                <div className='w-[70%]'>
                    <h2 className='font-bold'>The Great Gatsby</h2>
                    <p>Autor: F. Scott</p>
                </div>
                <p>R$ 37,90</p>
            </article>

            <article className=' flex items-center gap-3 border-b pb-3 mb-3'>
                <img src={livroPedidos} alt="Livro 1" />
                <div className='w-[70%]'>
                    <h2 className='font-bold'>The Great Gatsby</h2>
                    <p>Autor: F. Scott</p>
                </div>
                <p>R$ 37,90</p>
            </article>


            <div className=" flex justify-end flex-wrap pr-6 gap-3">
                <span>Total R$ 37,90</span>
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
    )
}