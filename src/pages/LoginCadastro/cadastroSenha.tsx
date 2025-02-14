import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/components/InputForm";
import { useNavigate, Link } from "react-router-dom";
import { useCadastroStore } from "@/store/cadastroStore";
import { Eye, EyeSlash } from "phosphor-react";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres.")
      .regex(/[a-z]/, "Deve conter letra minúscula.")
      .regex(/[A-Z]/, "Deve conter letra maiúscula.")
      .regex(/[0-9]/, "Deve conter número.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Deve conter pelo menos um caractere especial."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export function CadastroSenha() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, watch } = methods;
  const navigate = useNavigate();
  const { setSenha, dadosPessoais, dadosEndereco, resetCadastro } =
    useCadastroStore();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    setSenha(data.password);
    // Aqui você pode enviar todos os dados para o backend
    const cadastroCompleto = {
      ...dadosPessoais,
      ...dadosEndereco,
      password: data.password,
    };
    console.log("Dados do cadastro:", cadastroCompleto);
    // Resetar o cadastro e navegar para a página de login
    resetCadastro();
    navigate("/login");
  };

  // Função para verificar a força da senha
  const password = watch("password", "");
  const verificaForcaSenha = () => {
    let forca = 0;
    if (password.length >= 8) forca++;
    if (/[a-z]/.test(password)) forca++;
    if (/[A-Z]/.test(password)) forca++;
    if (/[0-9]/.test(password)) forca++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) forca++;
    return forca;
  };

  return (
    <section className="w-full min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="flex flex-row gap-3 w-full justify-center md:justify-start items-center p-4">
        <Link to="/">
          <img
            src="/assets/images/logo.png"
            alt="Logo da Editora"
            style={{ width: "91.29px", height: "87.23px" }}
          />
        </Link>
        <h1 className="font-playfair font-semibold text-xl hidden md:block">
          A EDITORA QUE VAI TE ENCANTAR
        </h1>
      </header>
      
      <main className="flex flex-col justify-center items-center w-full h-full px-4">
        <div className="hidden lg:block absolute top-0 right-0">
          <img
            src="/assets/images/livros_cadastro_cima.png"
            alt="Livros"
            className="w-[200px] sm:w-[300px]"
          />
        </div>
        <div className="hidden lg:block absolute bottom-0 left-0">
          <img
            src="/assets/images/livros_cadastro.png"
            alt="Livros"
            className="w-[200px] sm:w-[300px]"
          />
        </div>

        {/* Formulário */}
        <div className="flex flex-col items-center w-full md:w-[50%] p-8 bg-white rounded-lg shadow-xl z-10">
          <h2 className="text-2xl font-bold mb-4 bg-[#57614f] text-white px-3 py-2 rounded-md">
            CRIE SUA SENHA
          </h2>

          <FormProvider {...methods}>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* Grid para os Campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Senha */}
                <div>
                  <label className="block text-sm font-bold mb-2">Senha</label>
                  <div className="relative">
                    <InputForm
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <Eye size={20} />
                      ) : (
                        <EyeSlash size={20} />
                      )}
                    </button>
                  </div>
                </div>
                {/* Confirmar Senha */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <InputForm
                      name="confirmPassword"
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <Eye size={20} />
                      ) : (
                        <EyeSlash size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Indicador de força da senha */}
              <div className="mt-4 w-full">
                <p className="text-sm font-bold mb-1">Força da senha:</p>
                <div className="w-full bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${verificaForcaSenha() >= 5 ? "bg-green-500" : verificaForcaSenha() >= 3 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${(verificaForcaSenha() / 5) * 100}%` }}
                  ></div>
                </div>
                <ul className="text-sm mt-2">
                  <li>{password.length >= 8 ? "✅" : "❌"} Pelo menos 8 caracteres</li>
                  <li>{/[a-z]/.test(password) ? "✅" : "❌"} Letra minúscula</li>
                  <li>{/[A-Z]/.test(password) ? "✅" : "❌"} Letra maiúscula</li>
                  <li>{/[0-9]/.test(password) ? "✅" : "❌"} Número</li>
                  <li>{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✅" : "❌"} Caractere especial</li>
                </ul>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  style={{ width: "180px", height: "40px", fontSize: "14px" }}
                  className="py-2 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
                >
                  CONCLUIR CADASTRO
                </button>
              </div>
            </form>
          </FormProvider>

          {/* Link para a Tela Inicial */}
          <div className="mt-6 text-center">
            <p className="text-black font-bold text-sm">
              Já possui cadastro? &nbsp;
              <Link to="/login" className="underline">
                Faça login
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-black text-sm">
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
