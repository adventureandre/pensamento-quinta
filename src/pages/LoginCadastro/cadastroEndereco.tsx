import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useCadastroStore } from "@/store/cadastroStore";
import { InputForm } from "@/components/InputForm";
import axios from "axios";
import InputMask from "react-input-mask";

const formSchema = z.object({
  endereco: z.string().min(1, "Endereço é obrigatório."),
  complemento: z.string().optional(),
  cep: z
    .string()
    .min(9, "CEP inválido.")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido."),
  estado: z.string().min(1, "Estado é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  pais: z.string().min(1, "País é obrigatório."),
});

type FormData = z.infer<typeof formSchema>;

export function CadastroEndereco() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validação em tempo real
  });

  const { handleSubmit, setValue, watch, formState } = methods;
  const navigate = useNavigate();
  const { setDadosEndereco } = useCadastroStore();
  const [loadingCep, setLoadingCep] = useState(false);

  const cepValue = watch("cep");

  const onSubmit = (data: FormData) => {
    setDadosEndereco(data);
    navigate("/cadastro-senha");
  };

  const buscarEndereco = async (cep: string) => {
    setLoadingCep(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        methods.setError("cep", { message: "CEP não encontrado." });
      } else {
        setValue("endereco", response.data.logradouro);
        setValue("cidade", response.data.localidade);
        setValue("estado", response.data.uf);
        setValue("pais", "Brasil");
      }
    } catch (error) {
      methods.setError("cep", { message: "Erro ao buscar CEP." });
    } finally {
      setLoadingCep(false);
    }
  };

  // Efeito para monitorar mudanças no CEP
  const handleCepChange = (cep: string) => {
    const onlyNumbersCep = cep.replace(/\D/g, "");
    if (onlyNumbersCep.length === 8) {
      buscarEndereco(onlyNumbersCep);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="flex flex-row gap-3 w-full justify-center md:justify-start items-center p-4">
        <Link to="/">
          <img
            src="/assets/images/logo.png"
            alt="Logo da Editora"
            className="w-[91.29px] h-[87.23px]"
          />
        </Link>
        <h1 className="font-playfair font-semibold text-xl hidden md:block">
          A EDITORA QUE VAI TE ENCANTAR
        </h1>
      </header>
      <main className="flex flex-col flex-wrap justify-center items-center w-full flex-1">
        <div className="hidden absolute top-0 right-0 lg:block">
          <img
            src="/assets/images/livros_cadastro_cima.png"
            alt="Livros"
            className="w-[200px] sm:w-[300px]"
          />
        </div>
        <div className="hidden absolute bottom-0 left-0 lg:block">
          <img
            src="/assets/images/livros_cadastro.png"
            alt="Livros"
            className="w-[200px] sm:w-[300px]"
          />
        </div>

        {/* Formulário */}
        <div className="flex flex-col items-center w-full md:w-[50%] p-8 bg-white rounded-lg shadow-xl shadow-gray-400 z-10">
          <h2 className="text-2xl font-bold mb-4 bg-[#57614f] text-white px-4 py-2 rounded-md text-center">
            INFORME SEU ENDEREÇO
          </h2>

          <FormProvider {...methods}>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* Grid para os Campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CEP */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1">
                    CEP <span className="text-red-500">*</span>
                  </label>
                  <InputMask
                    mask="99999-999"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#57614f] bg-[#d9dbc8] ${formState.errors.cep ? "border-red-500" : ""}`}
                    placeholder="Digite seu CEP"
                    {...methods.register("cep")}
                    onBlur={() => handleCepChange(cepValue)}
                  />

                  {loadingCep && (
                    <p className="text-sm text-gray-500 mt-1">
                      Buscando endereço...
                    </p>
                  )}
                  {formState.errors.cep && (
                    <p className="text-sm text-red-500 mt-1">
                      {formState.errors.cep.message}
                    </p>
                  )}
                </div>
                {/* Endereço */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1">
                    Endereço <span className="text-red-500">*</span>
                  </label>
                  <InputForm
                    name="endereco"
                    type="text"
                    placeholder="Digite seu endereço"
                  />
                </div>
                {/* Complemento */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1">
                    Complemento
                  </label>
                  <InputForm
                    name="complemento"
                    type="text"
                    placeholder="Apartamento, casa, etc."
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <InputForm
                    name="cidade"
                    type="text"
                    placeholder="Digite sua cidade"
                  />
                </div>
                {/* Estado */}
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <InputForm
                    name="estado"
                    type="text"
                    placeholder="Digite seu estado"
                  />
                </div>
                {/* País */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-1">
                    País <span className="text-red-500">*</span>
                  </label>
                  <InputForm
                    name="pais"
                    type="text"
                    placeholder="Digite seu país"
                  />
                </div>
              </div>

              {/* Botão de Continuar */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="w-44 h-10 text-base py-2 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
                >
                  CONTINUAR
                </button>
              </div>
            </form>
          </FormProvider>

          {/* Links de Navegação */}
          <div className="mt-6 text-center">
            <p className="text-black font-bold text-sm">
              Já possui cadastro? &nbsp;
              <Link to="/login" className="underline">
                Faça login
              </Link>
            </p>
            <p className="text-black text-sm mt-2">
              <Link to="/" className="underline">
                Retornar para a tela inicial
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}