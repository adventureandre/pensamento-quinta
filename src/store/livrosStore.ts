import { api } from "@/lib/api";
import { Livro } from "@/types/livros";
import { create } from "zustand";

type LivrosStoreType = {
    livros: Livro[] | null
    isLoading: boolean
    load: () => Promise<void>
}

export const livrosStore = create<LivrosStoreType>((set) => ({
    //States
    livros: null,
    isLoading: false,

  //Functions 
  load: async () => {
        set({ isLoading: true })

        try{
            const response = await api('/livros')

            const livros = await response.json()

            set({ livros:livros, isLoading: false })

        }catch(err){
            console.log('Failed to fetch items', err)
        }

    }

}))