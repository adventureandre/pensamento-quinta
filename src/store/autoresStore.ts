import { api } from "@/lib/api";
import { Autor } from "@/types/autor";
import { create } from "zustand";

type AutoresStoreType = {
    autores: Autor[] | null
    isLoading: boolean
    load: () => Promise<void>
}

export const autoresStore = create<AutoresStoreType>((set) => ({
    //States
    autores: null,
    isLoading: false,

    //Functions
    load: async () => {
        set({ isLoading: true })

        try {
            const response = await api('/autores')
            const autores = await response.json()

            set({ autores, isLoading: false })
        } catch (err) {
            console.log('Error ao buscar autores', err)
        }
    }


}))