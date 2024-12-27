import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "phosphor-react";
import { InputForm } from "@/components/InputForm";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Nome completo é obrigatório."),
    username: z.string().min(1, "Nome de usuário é obrigatório."),
    email: z.string().email("E-mail inválido."),
    phone: z
      .string()
      .regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Telefone inválido."),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida."),
    cpf: z.string().transform((value) => value.replace(/\D/g, "")),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export function CadastroPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);

    //navegar para dashboard/inicio
    router('/login')
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (<>
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
    <main className="flex flex-col items-center  bg-white font-[\'Times New Roman\', serif]">
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
        className=" flex flex-col items-center w-[100%] md:w-[90%] p-8 bg-white rounded-lg shadow-xl shadow-gray-400"
        style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 className=" text-2xl font-bold mb-2  bg-[#57614f] text-white px-3">
          BEM-VINDO AO PENSAMENTOS DE QUINTA
        </h2>


        <p className="text-sm text-center text-black mt-1 font-bold mb-6 w-[80%]">
          ONDE IDEIAS GANHAM VIDA E INSPIRAÇÕES FLORESCEM. CONECTE-SE, REFLITA
          E DESCUBRA NOVOS HORIZONTES A CADA VISITA!
        </p>

        <span className="text-center font-bold bg-[#d1bda0] mb-5">JUNTE-SE A NÓS!</span>

        <FormProvider {...methods}>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Nome completo
                </label>
                <InputForm
                  name="fullName"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Nome de usuário
                </label>
                <InputForm
                  name="username"
                  placeholder="Digite seu nome de usuário"
                />
              </div>
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
                  Número de Telefone
                </label>
                <InputForm
                  name="phone"
                  type="text"
                  placeholder="Digite seu telefone"
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Data de Nascimento
                </label>
                <InputForm
                  name="birthDate"
                  type="date" />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  CPF
                </label>
                <InputForm
                  name="cpf"
                  type="text"
                  placeholder="Digite seu CPF"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-300" />
            <h2 className="text-lg font-bold mb-4">DEFINA SUA SENHA</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
                    placeholder="Crie uma senha"
                  />
                  <button
                    type="button"
                    className=" mr-2  float-right absolute right-1 mt-2"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Confirmar senha
                </label>
                <div className="flex flex-col relative">

                  <InputForm
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                   placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    className=" mr-2 float-right absolute right-1 mt-2"
                   onClick={toggleConfirmPasswordVisibility}
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

            <div className="flex justify-center">
              <button
                type="submit"
                style={{
                  width: "163.23px",
                  height: "23.9px",
                  fontSize: "12px",
                }}
                className="py-1 bg-[#d1bda0] font-bold text-black rounded-md hover:bg-[#bca88c]"
              >
                CRIAR MINHA CONTA
              </button>
            </div>
          </form>
        </FormProvider>
        <div className="mt-4 text-center">
          <p className="text-black font-bold text-sm">
            Já possui conta? Acesse aqui&nbsp;
            <a href="login" className="text-black underline">
              Fazer Login
            </a>
          </p>
        </div>
      </div>
      <a
        href="/"
        className="text-black text-sm hover:underline"
        style={{ marginTop: "16px" }}
      >
        Retornar para a tela inicial
      </a>
    </main>
  </>
  );
}
