import { create } from "zustand";

interface DadosPessoais {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
}

interface DadosEndereco {
  endereco: string;
  complemento?: string;
  cep: string;
  estado: string;
  cidade: string;
  pais: string;
}

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
