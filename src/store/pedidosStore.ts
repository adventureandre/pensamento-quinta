import { api } from "@/lib/api";
import { Pedido } from "@/types/pedido";
import { create } from "zustand";

type PedidosStoreType = {
    pedidos: Pedido | null
    isLoading: boolean
    load: (id: number) => Promise<void>
}

export const pedidosStore = create<PedidosStoreType>((set,get) => ({
    // States
    pedidos: null,
    isLoading: false,

    // Functions
    load: async (id) => {
        set({ isLoading: true });
        
        const { pedidos } = get();
        if(pedidos){
            set({pedidos:pedidos , isLoading: false});
        }
        
        try {
            const response = await api(`/orders/${id}`);
            const pedidos = await response.json();
            

         set({ pedidos:pedidos, isLoading: false });


        } catch (err) {
            console.log('Failed to fetch orders', err);
        }
    }
}));
