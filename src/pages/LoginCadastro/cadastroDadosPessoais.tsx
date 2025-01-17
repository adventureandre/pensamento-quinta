import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/components/InputForm";
import { useNavigate, Link } from "react-router-dom";
import { useCadastroStore } from "@/store/cadastroStore";

const formSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório."),
  username: z.string().min(1, "Nome de usuário é obrigatório."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(1, "Telefone é obrigatório."),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória."),
  cpf: z.string().min(11, "CPF inválido."),
});

type FormData = z.infer<typeof formSchema>;

export function CadastroDadosPessoais() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;
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
        <img
          src="/assets/images/logo.jpeg"
          alt="Logo da Editora"
          style={{ width: "91.29px", height: "87.23px" }}
        />
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
        <div
          className="flex flex-col items-center w-full md:w-[50%] p-8 bg-white rounded-lg shadow-xl shadow-gray-400 z-10"
          style={{
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-2xl font-bold mb-4 bg-[#57614f] text-white px-3 py-2 rounded-md">
            INFORME SEUS DADOS
          </h2>

          <FormProvider {...methods}>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                </div>
                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Data de Nascimento
                  </label>
                  <InputForm name="birthDate" type="date"/>
                </div>
                {/* CPF */}
                <div>
                  <label className="block text-sm font-bold mb-2">CPF</label>
                  <InputForm
                    name="cpf"
                    type="text"
                    placeholder="Digite seu CPF"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  style={{
                    width: "180px",
                    height: "40px",
                    fontSize: "14px",
                  }}
                  className="py-2 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
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
