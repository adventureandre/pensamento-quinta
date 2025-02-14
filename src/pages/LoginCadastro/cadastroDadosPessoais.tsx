import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/components/InputForm";
import { useNavigate, Link } from "react-router-dom";
import { useCadastroStore } from "@/store/cadastroStore";

const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

// Função para validar telefone
const validatePhone = (phone: string) => {
  const phoneRegex = /\(\d{2}\)\s\d{5}-\d{4}/;
  return phoneRegex.test(phone);
};

// Função para validar e-mail
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

const formSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório."),
  username: z.string().min(1, "Nome de usuário é obrigatório."),
  email: z.string().email("E-mail inválido.").refine(validateEmail),
  phone: z.string().min(1, "Telefone é obrigatório.").refine(validatePhone),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória."),
  cpf: z.string().min(11, "CPF inválido.").refine(validateCPF),
});

type FormData = z.infer<typeof formSchema>;


export function CadastroDadosPessoais() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const { setDadosPessoais } = useCadastroStore();

  const onSubmit = (data: FormData) => {
    // Armazenar os dados no estado global
    setDadosPessoais(data);
    // Navegar para a próxima página
    navigate("/cadastro-endereco");
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
      <main className="flex flex-col flex-wrap justify-center items-center w-full  h-[100%]">
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
          <h2 className="text-2xl font-bold mb-4 bg-[#57614f] text-white px-3 py-2 rounded-md">
            INFORME SEUS DADOS
          </h2>

          <FormProvider {...methods}>
            <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Nome Completo
                  </label>
                  <InputForm
                    name="fullName"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                {/* Nome de Usuário */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Nome de Usuário
                  </label>
                  <InputForm
                    name="username"
                    placeholder="Digite seu nome de usuário"
                  />
                </div>
                {/* E-mail */}
                <div>
                  <label className="block text-sm font-bold mb-2">E-mail</label>
                  <InputForm
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                  />
                  {methods.formState.errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      
                    </p>
                  )}
                </div>
                {/* Telefone */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Telefone
                  </label>
                  <InputForm
                    name="phone"
                    type="text"
                    placeholder="(xx) 99999-9999"
                  />
                  {methods.formState.errors.phone && (
                    <p className="text-xs text-red-500 mt-1">

                    </p>
                  )}
                </div>
                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Data de Nascimento
                  </label>
                  <InputForm name="birthDate" type="date" />
                </div>
                {/* CPF */}
                <div>
                  <label className="block text-sm font-bold mb-2">CPF</label>
                  <InputForm
                    name="cpf"
                    type="text"
                    placeholder="Digite seu CPF"
                  />
                  {methods.formState.errors.cpf && (
                    <p className="text-xs text-red-500 mt-1">

                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c] focus:outline-none focus:ring-2 focus:ring-[#57614f]"
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
