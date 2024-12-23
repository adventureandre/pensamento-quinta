import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "phosphor-react";
import { InputForm } from "@/components/InputForm";

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

export function LoginCadastroPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-[\'Times New Roman\', serif]">
      <div className="absolute top-0 right-0">
        <img
          src="/assets/images/livros_cadastro_cima.png"
          alt="Livros"
          className="w-[200px] sm:w-[300px]"
        />
      </div>
      <div className="absolute bottom-0 left-0">
        <img
          src="/assets/images/livros_cadastro.png"
          alt="Livros"
          className="w-[200px] sm:w-[300px]"
        />
      </div>
      <div className="absolute top-0 left-0 flex items-center space-x-2 p-4">
        <img
          src="/assets/images/logo.jpeg"
          alt="Logo da Editora"
          style={{ width: "91.29px", height: "87.23px" }}
        />
        <span className="text-lg font-bold text-[#4b4b4b]">
          A EDITORA QUE VAI TE ENCANTAR
        </span>
      </div>

      <div
        className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl shadow-gray-400"
        style={{
          width: "774.07px",
          height: "630.24px",
          borderRadius: "10px",
        }}
      >
        <div
          className="text-center mb-6"
          style={{ backgroundColor: "#57614f", color: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold mb-2">
            BEM-VINDO AO PENSAMENTOS DE QUINTA
          </h1>
        </div>
        <div
          className="text-center mb-2"
          style={{ color: "black", marginTop: "-20px" }}
        >
          <h1 className="text-sm">
            ONDE IDEIAS GANHAM VIDA E INSPIRAÇÕES FLORESCEM. CONECTE-SE, REFLITA
            E DESCUBRA NOVOS HORIZONTES A CADA VISITA!
          </h1>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Nome completo
                </label>
                <InputForm
                  name="fullName"
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
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
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
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
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
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
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
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
                  type="date"
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
                />
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
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
                  placeholder="Digite seu CPF"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-300" />
            <h2 className="text-lg font-bold mb-4">DEFINA SUA SENHA</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Senha
                </label>
                <InputForm
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
                  placeholder="Crie uma senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-7 right-0 flex items-center px-3"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>
              <div className="relative">
                <label
                  className="block text-sm text-gray-600 mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Confirmar senha
                </label>
                <InputForm
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-full px-4 py-2 bg-[#d1d4be] rounded-lg text-sm"
                  placeholder="Confirme sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-7 right-0 flex items-center px-3"
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

            <div className="flex justify-center">
              <button
                type="submit"
                style={{
                  width: "163.23px",
                  height: "23.9px",
                  fontSize: "12px",
                }}
                className="py-1 bg-[#d1bda0] text-black rounded-md hover:bg-[#bca88c]"
              >
                CRIAR MINHA CONTA
              </button>
            </div>
          </form>
        </FormProvider>
        <div className="mt-4 text-center">
          <p className="text-black font-bold text-sm">
            Já possui conta? Acesse aqui&nbsp;
            <a href="/login" className="text-black underline">
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
    </div>
  );
}
