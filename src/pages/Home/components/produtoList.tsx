import { Livro } from "@/types/livros";
import { Star } from "phosphor-react";

interface ProdutoListHomeProps {
  title: string;
  livros: Livro[] | null;
  isLoading: boolean;
}

export function ProdutoListHome({ livros, isLoading, title }: ProdutoListHomeProps) {
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
                            className="flex justify-center items-center flex-wrap w-[256px] mb-14 rounded-xl pb-3 border-b-2 border-r-2"
                            style={{
                                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img className="w-[300px]" src={livro.imgSrc} alt={`Imagem ${livro.title}`} />
                            <h2 className="text-sm text-gray-500 text-center mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis">{livro.title}</h2>
                            <p className="text-lg mb-1 font-bold w-full text-center">{`R$ ${livro.price}`}</p>
                            <span className="flex text-yellow-500">
                                <Star size={21} weight="fill" />
                                <Star size={21} weight="fill" />
                                <Star size={21} weight="fill" />
                                <Star size={21} weight="fill" />
                            </span>
                        </article>
                    ))
                )}
            </div>
            <hr className="bg-black p-[0.4px] w-[50%]" />
        </section>
    );
}
