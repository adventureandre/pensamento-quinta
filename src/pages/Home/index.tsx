import { useEffect } from "react";
import { livrosStore } from "@/store/livrosStore";
import { ProdutoListHome } from "./components/produtoList";
import { HeaderHome } from "./components/header";
import { CuriosidadeHome } from "./components/curiosidades";
import { ComentariosAvaliacoes } from "./components/comentariosAvaliacoes";
import { HomeBannerPapelaria } from './components/HomeBannerPapelaria';
import { KindleSection } from './components/KindleSection';

export function HomePage() {
  const { livros, load, isLoading } = livrosStore();

  // Carrega os livros ao montar o componente
  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="w-full flex flex-col gap-8">
      {/* Header da Home */}
      <HeaderHome />

      <section>
        <ProdutoListHome
          title="Produtos Destaque"
          livros={livros}
          isLoading={isLoading}
          carrosselId="destaques"
        />
      </section>

      <section>
        <ProdutoListHome
          title="Lançamentos"
          livros={livros}
          isLoading={isLoading}
          carrosselId="lançamentos"
        />
      </section>

      <section>
        <HomeBannerPapelaria />
      </section>

      <section>
        <CuriosidadeHome />
      </section>

      <section>
        <KindleSection />
      </section>

      <section>
        <ComentariosAvaliacoes
          title="Comentários e Avaliações"
          livros={livros}
          isLoading={isLoading}
        />
      </section>
      <div className="mb-20"></div>
    </main>
  );
}
