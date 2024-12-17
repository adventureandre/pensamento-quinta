import livroComentario from '../../../../public/assets/images/livroComentarios.png';
import { Livro } from "@/types/livro";
import { Star } from "phosphor-react";

interface ProdutoListHomeProps {
    title: string;
    livros: Livro[] | null;
    isLoading: boolean;
}

export function ComentariosAvaliacoes({ livros, isLoading, title }: ProdutoListHomeProps) {
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl font-playfair font-semibold mt-10 px-10 mb-5">{title}</h1>

            <div className="flex justify-center gap-6 flex-wrap">
                {isLoading ? (
                    <p className="w-full text-center text-xl font-semibold">Carregando - {title} ...</p>
                ) : (
                    livros?.map((livro) => (
                        <article
                            key={livro.id}
                            className="flex justify-center items-center flex-wrap w-[256px] mb-14 rounded-xl pb-3 p-2 border-b-2 border-r-2 transition-transform transform hover:scale-105 hover:shadow-lg"
                            style={{
                                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img className="w-full" src={livroComentario} alt={`Imagem ${livro.title}`} />
                            <div className='flex justify-start w-full ml-2 mt-2'>
                                <Star size={16} weight="fill" />
                                <Star size={16} weight="fill" />
                                <Star size={16} weight="fill" />
                                <Star size={16} weight="fill" />
                                <Star size={16} weight="fill" />
                            </div>
                            <h2 className="text-sm text-gray-500 text-center mt-2 mb-2 mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis">{livro.title}</h2>
                            <p className="text-sm text-gray-500 text-center mx-3 w-full max-w-[256px] overflow-hidden">"Uma leitura envolvente, com uma história que prende do início ao fim."</p>
                            <span className="flex text-yellow-500"></span>
                        </article>
                    ))
                )}
            </div>
            <hr className="bg-black p-[0.4px] w-[50%]" />
        </section>
    );
}
