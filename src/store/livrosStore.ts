import { api } from "@/lib/api";
import { Livro } from "@/types/livro";
import { create } from "zustand";

type LivrosStoreType = {
    livros: Livro[] | null;
    isLoading: boolean;
    load: () => Promise<void>;
    findById: (id: number) => Livro | undefined;
};

export const livrosStore = create<LivrosStoreType>((set, get) => ({
    livros: null,
    isLoading: false,

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

    findById: (id: number) => {
        const { livros } = get();
        return livros?.find((livro) => livro.id === id);
    }
}));
