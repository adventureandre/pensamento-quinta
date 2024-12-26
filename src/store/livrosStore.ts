import { api } from "@/lib/api";
import { Livro } from "@/types/livro";
import { create } from "zustand";

type LivrosStoreType = {
    livro: Livro | null,
    livros: Livro[] | null;
    isLoading: boolean;
    load: () => Promise<void>;
    findById: (id: number) => Promise<void>;
};

export const livrosStore = create<LivrosStoreType>((set, get) => ({
    //States
    livro: null,
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
        set({ isLoading: true });

        const { livros } = get();

        if (livros) {
            const existingLivro = livros.find(livro => livro.id === id);
            if (existingLivro) {
                set({ livro: existingLivro, isLoading: false });
                return;
            }
        }

        try {
            const response = await api(`/livros/${id.toString()}`);
            const livro = await response.json();
            set({ livro, isLoading: false })

        } catch (err) {
            console.log('Failed to fetch items', err);

        }
    }
}));