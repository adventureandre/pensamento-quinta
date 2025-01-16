import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "phosphor-react";
import { InputForm } from "@/components/InputForm";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
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

  const router = useNavigate()

  const onSubmit = (data: FormData) => {
    console.log(data, savePassword);
    //navegar para dashboard/inicio
    router('/dashboard/inicio')
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSavePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavePassword(event.target.checked);
  };

  return (
    <section className="w-full h-[80vh]">
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

        <div
          className=" flex flex-col items-center  w-[100%] md:w-[50%] p-8 bg-white rounded-lg shadow-xl shadow-gray-400"
          style={{
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className=" text-2xl font-bold mb-2  bg-[#57614f] text-white px-3">
            Já possuo cadastro!
          </h2>

          <FormProvider {...methods}>
            <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  E-mail
                </label>
                <InputForm
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
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
                    className="mr-2 float-right absolute right-1 mt-2"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="savePassword"
                  checked={savePassword}
                  onChange={handleSavePasswordChange}
                  className="mr-2"
                />
                <label htmlFor="savePassword" className="text-sm text-gray-600">
                  Salvar minha senha
                </label>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  style={{
                    width: "163.23px",
                    height: "23.9px",
                    fontSize: "12px",
                  }}
                  className="py-1 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
                >
                  Entrar
                </button>
              </div>
            </form>
          </FormProvider>
          <div className="mt-4 text-center">
            <p className="text-black font-bold text-sm">
            Ainda não possui conta? Acesse aqui &nbsp;
            </p>
            <Link to="/cadastro" className="text-black underline">
                Quero me cadastrar
              </Link>
          </div>
        </div>
        <Link
          to="/"
          className="text-black text-sm hover:underline"
          style={{ marginTop: "16px" }}
        >
          Retornar para a tela inicial
        </Link>
      </main>
    </section>
  );
}
