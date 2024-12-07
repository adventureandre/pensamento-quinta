import { useEffect } from "react";

import { livrosStore } from "@/store/livrosStore";

import { ProdutoListHome } from "./components/destaque";
import { HeaderHome } from "./components/header";
import { FooterHome } from "./components/footer";

export function HomePage() {
  const { livros, load, isLoading } = livrosStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="w-full">
      <HeaderHome />
      
      <ProdutoListHome title="Produtos Destaque" livros={livros} isLoading={isLoading} />
      <ProdutoListHome title="Lançamentos" livros={livros} isLoading={isLoading} />

      <FooterHome />

    </main>
  );
}
