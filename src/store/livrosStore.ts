import { api } from "@/lib/api";
import { Livro } from "@/types/livro";
import { create } from "zustand";

type LivrosStoreType = {
    livros: Livro[] | null;
    isLoading: boolean;
    load: () => Promise<void>;
    findById: (id: number) => Promise<Livro | null>;
};

export const livrosStore = create<LivrosStoreType>((set, get) => ({
    // States
    livros: null,
    isLoading: false,

    // Functions
    load: async () => {
        set({ isLoading: true });

        try {
            const response = await api('/livros');
            const livros = await response.json();

            set({ livros, isLoading: false });
        } catch (err) {
            console.log('Failed to fetch items', err);
            set({ isLoading: false });
        }
    },

    findById: async (id: number) => {
        const { livros } = get();
        
        set({ isLoading: true });

        // if (livros) {
        //     const livro = livros.find((livro) => livro.id === id);
        //     if (livro) return livro;
        //     set({ isLoading: false });
        // }

        // Caso não tenha o livro no estado, faz a requisição
        try {
            const response = await api(`/livros/${id}`);
            const livro = await response.json();

            set({ isLoading: false });
            return livro;
        } catch (err) {
            console.log(`Erro ao retornar o livro - ${id}`, err);
            set({ isLoading: false });
        }
    }
}));
