import { livrosStore } from "@/store/livrosStore";
import { useEffect } from "react";

export function HomePage() {
  const { livros, load, isLoading } = livrosStore();

  useEffect(() => {
    load();  
  }, [load]);

  return (
    <section>
      <aside className="hidden md:flex justify-center items-center w-full mt-10 mb-2 bg-fundoBanner">
        <h2 className="w-[50%] text-white font-semibold text-6xl px-10">A Editora que Vai te Encantar!</h2>
        <img className="w-[50%]" src="./assets/images/banner.webp" alt="banner" />
      </aside>
      <h1 className="text-xl font-bold mt-10 px-10 mb-5">Destaques</h1>

      <div className="flex justify-center gap-2 flex-wrap">
        {isLoading ? (
          <p className="w-full text-center text-xl font-semibold">Carregando...</p>
        ) : (
          livros?.map((livro) => (
            <article key={livro.id} className="flex justify-center items-center flex-wrap w-[256px] mb-14">
              <img className="w-[250px]" src={livro.imgSrc} alt={`Imagem ${livro.title}`} />
              <p className="text-lg mt-2 text-accent w-full text-center">{livro.price}</p>
              <h2 className="text-2xl text-gray-500 text-center font-bold mt-6 mx-3 w-full max-w-[256px] overflow-hidden whitespace-nowrap text-ellipsis">{livro.title}</h2>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
