import { api } from "@/lib/api";
import { Autor } from "@/types/autor";
import { create } from "zustand";

type AutoresStoreType = {
    autores: Autor[] | null
    isLoading: boolean
    load: () => Promise<void>
    findById: (id: number) => Promise<Autor>;
}

export const autoresStore = create<AutoresStoreType>((set, get) => ({
    // States
    autores: null,
    isLoading: false,

    // Functions
    load: async () => {
        set({ isLoading: true });

        try {
            const response = await api('/autores');
            const autores = await response.json();

            set({ autores, isLoading: false });
        } catch (err) {
            console.log('Error ao buscar autores', err);
            set({ isLoading: false });
        }
    },

    findById: async (id: number) => {
        set({ isLoading: true });

        const { autores } = get();

        if (autores) {
            const existingAutor = autores.find(autor => autor.id === id);
            if (existingAutor) {
                set({  isLoading: false });
                return existingAutor;
            }
        }

        try {
            const response = await api(`/autores/${id.toString()}`);
            const autor = await response.json();
            set(() => ({
                isLoading: false
            }));

            return autor
        } catch (err) {
            console.log('Failed to fetch items', err);
            set({ isLoading: false });
        }
    }
}));
