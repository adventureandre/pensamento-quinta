import { api } from "@/lib/api";
import { Pedido } from "@/types/pedido";
import { create } from "zustand";

type PedidosStoreType = {
    pedidos: Pedido | null;
    isLoading: boolean;
    load: (id: number) => Promise<void>;
};

export const pedidosStore = create<PedidosStoreType>((set) => ({
    pedidos: null,
    isLoading: false,

    load: async (id) => {
        set({ isLoading: true });

        try {
            const response = await api(`/orders/${id}`);
            const pedidos = await response.json();
            set({ pedidos, isLoading: false });
        } catch (err) {
            console.log('Failed to fetch orders', err);
            set({ isLoading: false });
        }
    }
}));
