// src/store/livrosStore.ts
import { api } from "@/lib/api";
import { Livro } from "@/types/livro";
import { create } from "zustand";

type LivrosStoreType = {
  livro: Livro | null;
  livros: Livro[] | null;
  isLoading: boolean;
  load: () => Promise<void>;
  findById: (id: number) => Promise<Livro | undefined>;
};

export const livrosStore = create<LivrosStoreType>((set, get) => ({
  livro: null,
  livros: null,
  isLoading: false,

  load: async () => {
    set({ isLoading: true });

    try {
      const response = await api("/livros");
      const data = await response.json();

      const livros: Livro[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        imgSrc: item.imgSrc,
        sinopse: item.sinopse,
        editora: item.editora,
        isbn: item.isbn,
        paginas: item.paginas,
        ano: item.ano,
        edicao: item.edicao,
        authorId: item.authorId,
        author: item.author,
      }));

      set({ livros, isLoading: false });
    } catch (err) {
      console.log("Falha ao buscar os livros", err);
      set({ isLoading: false });
    }
  },

  findById: async (id: number) => {
    set({ isLoading: true });

    // Tenta encontrar o livro na lista já carregada
    const { livros } = get();
    if (livros) {
      const existingLivro = livros.find((livro) => livro.id === id);
      if (existingLivro) {
        set({ isLoading: false });
        return existingLivro;
      }
    }

    // Se não encontrar, busca na API
    try {
      const response = await api(`/livros/${id}`);
      const data = await response.json();

      const livro: Livro = {
        id: data.id,
        title: data.title,
        price: data.price,
        imgSrc: data.imgSrc,
        sinopse: data.sinopse,
        editora: data.editora,
        isbn: data.isbn,
        paginas: data.paginas,
        ano: data.ano,
        edicao: data.edicao,
        authorId: data.authorId,
        author: data.author,
      };

      set({ isLoading: false });
      return livro;
    } catch (err) {
      console.log("Falha ao buscar o livro", err);
      set({ isLoading: false });
      return undefined;
    }
  },
}));
