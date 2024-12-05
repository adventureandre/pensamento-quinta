import { livrosStore } from "@/store/livrosStore";
import { Star } from "phosphor-react";
import { useEffect } from "react";

export function HomePage() {
  const { livros, load, isLoading } = livrosStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <header className="hidden md:flex justify-center items-center w-full mb-2 bg-fundoBanner">
        <h2 className="w-[50%] text-white font-semibold text-4xl px-10 font-rockSalt leading-relaxed text-center">A Editora que Vai te Encantar!</h2>

        <div className="w-[35%] bg-no-repeat bg-bottom bg-[length:100%_auto] relative" style={{ backgroundImage: 'url(./assets/images/ellipse.png)' }}>
          <img className="w-full" src="./assets/images/banner.png" alt="banner" />
        </div>

      </header>
      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mt-10 px-10 mb-5">Produtos Destaque</h1>

        <div className="flex justify-center gap-2 flex-wrap">
          {isLoading ? (
            <p className="w-full text-center text-xl font-semibold">Carregando...</p>
          ) : (
            livros?.map((livro) => (
              <article key={livro.id} className="flex justify-center items-center flex-wrap w-[256px] mb-14">
                <img className="w-[300px]" src={livro.imgSrc} alt={`Imagem ${livro.title}`} />
                <h2 className="text-sm text-gray-500 text-center mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis">{livro.title}</h2>
                <p className="text-lg mb-1 font-bold w-full text-center">{`R$ ${livro.price}`}</p>
                <span className=" flex text-yellow-500"><Star size={21} weight="fill" /><Star size={21} weight="fill" /><Star size={21} weight="fill" /><Star size={21} weight="fill" /> </span>
              </article>
            ))
          )}
        </div>
        <hr />
      </section>

      <section className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mt-10 px-10 mb-5">Lançamentos</h1>

        <div className="flex justify-center gap-2 flex-wrap">
          {isLoading ? (
            <p className="w-full text-center text-xl font-semibold">Carregando...</p>
          ) : (
            livros?.map((livro) => (
              <article key={livro.id} className="flex justify-center items-center flex-wrap w-[256px] mb-14">
                <img className="w-[300px]" src="./assets/images/livro2.png" alt={`Imagem ${livro.title}`} />
                <h2 className="text-sm text-gray-500 text-center mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis">{livro.title}</h2>
                <p className="text-lg mb-1 font-bold w-full text-center">{`R$ ${livro.price}`}</p>
                <span className=" flex text-yellow-500"><Star size={21} weight="fill" /><Star size={21} weight="fill" /><Star size={21} weight="fill" /><Star size={21} weight="fill" /> </span>
              </article>
            ))
          )}
        </div>
        <hr />
      </section>

    </div>
  );
}
