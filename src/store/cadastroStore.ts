import { DadosEndereco } from "@/types/dadosEndereco";
import { DadosPessoais } from "@/types/dadosPessoais";
import { create } from "zustand";

interface CadastroState {
  dadosPessoais: DadosPessoais | null;
  dadosEndereco: DadosEndereco | null;
  senha: string | null;
  setDadosPessoais: (dados: DadosPessoais) => void;
  setDadosEndereco: (dados: DadosEndereco) => void;
  setSenha: (senha: string) => void;
  resetCadastro: () => void;
}

export const useCadastroStore = create<CadastroState>((set) => ({
  dadosPessoais: null,
  dadosEndereco: null,
  senha: null,

  setDadosPessoais: (dados) => set({ dadosPessoais: dados }),
  
  setDadosEndereco: (dados) => set({ dadosEndereco: dados }),

  setSenha: (senha) => set({ senha }),

  resetCadastro: () =>
    set({ dadosPessoais: null, dadosEndereco: null, senha: null }),
}));
