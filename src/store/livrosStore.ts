import { api } from "@/lib/api";
import { Livro } from "@/types/livro";
import { create } from "zustand";

type LivrosStoreType = {
  livros: Livro[] | null;
  isLoading: boolean;
  load: () => Promise<void>;
  findById: (id: number) => Promise<Livro | undefined>;
};

export const livrosStore = create<LivrosStoreType>((set, get) => ({
  livros: null,
  isLoading: false,

  load: async () => {
    set({ isLoading: true });

    try {
      const response = await api("/livros");
      const livros = await response.json();


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
      const livro = await response.json();

     

      set({ isLoading: false });
      return livro;
    } catch (err) {
      console.log("Falha ao buscar o livro", err);
      set({ isLoading: false });
      return undefined;
    }
  },
}));
