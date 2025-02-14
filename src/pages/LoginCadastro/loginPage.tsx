import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "phosphor-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { InputForm } from "@/components/InputForm";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof formSchema>;

export function LoginPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [savePassword, setSavePassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data, savePassword);
    navigate("/dashboard/dadospessoais");
  };

  const handleSavePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSavePassword(event.target.checked);
  };

  // Funções para lidar com a autenticação social
  const handleGoogleSignIn = () => {
    // Implemente aqui a lógica de autenticação com o Google
  };

  const handleFacebookSignIn = () => {
    // Implemente aqui a lógica de autenticação com o Facebook
  };

  return (
    <section className="w-full h-[80vh]">
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
      <main className="flex flex-col flex-wrap justify-center items-center w-full h-full">
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

        <div className="flex flex-col items-center w-full md:w-[50%] p-8 bg-white rounded-lg shadow-xl shadow-gray-400 z-10">
          <h2 className="text-2xl font-bold mb-2 bg-[#57614f] text-white px-3">
            Já possuo cadastro!
          </h2>

          <FormProvider {...methods}>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-bold">
                  E-mail
                </label>
                <InputForm
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-gray-600 mb-2 font-bold">
                  Senha
                </label>

                <div className="flex flex-col relative">
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

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="savePassword"
                    checked={savePassword}
                    onChange={handleSavePasswordChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="savePassword"
                    className="text-sm text-gray-600"
                  >
                    Salvar minha senha
                  </label>
                </div>
                <Link
                  to="/recuperar-senha"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-44 h-10 text-base py-2 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
                >
                  ENTRAR
                </button>
              </div>
            </form>
          </FormProvider>

          {/* Botões de login social simplificados */}
          <div className="w-full">
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200"
              >
                <FcGoogle size={30} />
              </button>
              <button
                onClick={handleFacebookSignIn}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200"
              >
                <FaFacebook size={30} color="#3b5998" />
              </button>
            </div>
          </div>

          {/* Link para a Tela Inicial */}
          <div className="mt-6 text-center">
            <p className="text-black font-bold text-sm">
              Ainda não possui conta? &nbsp;
              <Link to="/cadastro" className="underline">
                Crie sua conta aqui
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
