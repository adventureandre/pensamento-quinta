import { Heart } from "phosphor-react"

export function FavoritosDashboard() {
    const BASE_URL = import.meta.env.VITE_BASE_URL


    //    interface ILivros {
    //        src: string;
    //       alt: string;
    //       titulo: string;
    //       preço: string;
    //  }

    const livros = [
        {
            src: `${BASE_URL}/assets/images/livro2.png`,
            alt: "The Great Gatsby",
            titulo: "The Great Gatsby",
            autor: "F. Scott",
            preço: "37,90"
        },
        {
            src: `${BASE_URL}/assets/images/livro2.png`,
            alt: "The Great Gatsby",
            titulo: "The Great Gatsby",
            autor: "F. Scott",
            preço: "37,90"
        },
        {
            src: `${BASE_URL}/assets/images/livro2.png`,
            alt: "The Great Gatsby",
            titulo: "The Great Gatsby",
            autor: "F. Scott",
            preço: "37,90"
        },
    ]

    return (
        <section>
            <h1 className="text-3xl font-semibold font-playfair">Favoritos</h1>
            <div className="w-full h-[420px] flex flex-wrap p-3 gap-x-6 mt-5 rounded-3xl">
                {
                    livros.map(livro => (
                        <article className="w-52 h-[370px] flex-col justify-items-center p-5 mt-5 rounded-3xl"
                            style={{
                                boxShadow: '4px 10px 10px rgba(0, 0, 0, 0.49)',
                            }}>
                            <Heart className="justify-self-end" />
                            <img src={livro.src} alt={livro.titulo} className="w-30 mb-5" />
                            <h2 className="font-semibold">{livro.titulo}</h2>
                            <p className="font-semibold">- {livro.autor}</p>
                            <p className="font-semibold">R${livro.preço}</p>
                            <button className="bg-[#e5d2b8] hover:bg-[#deb88a] w-32 px-2 py-0.4 rounded-xl font-semibold mt-5 cursor-pointer">Comprar</button>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}