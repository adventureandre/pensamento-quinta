import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { livrosStore } from "@/store/livrosStore";

// Validação com Zod
const checkoutSchema = z.object({
  nomeCartao: z.string().min(1, "O nome no cartão é obrigatório."),
  numeroCartao: z
    .string()
    .regex(/^\d{16}$/, "O número do cartão deve ter exatamente 16 dígitos."),
  validade: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "A validade deve estar no formato MM/AA e representar um mês válido."
    ),
  cvv: z.string().regex(/^\d{3}$/, "O CVV deve conter 3 dígitos."),
  cupom: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const { livros, load } = livrosStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [metodoPagamento, setMetodoPagamento] = useState("debito");
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);

  const watchCupom = watch("cupom");

  const aplicarCupom = () => {
    if (watchCupom === "livraria10") {
      setDesconto(subtotal * 0.1);
      setCupomAplicado(true);
    } else if (watchCupom) {
      setDesconto(0);
      setCupomAplicado(false);
    }
  };

  const removerCupom = () => {
    setDesconto(0);
    setValue("cupom", "");
    setCupomAplicado(false);
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log("Dados do formulário:", data);
  };

  useEffect(() => {
    load();
  }, [load]);

  const subtotal = livros
    ? livros.slice(0, 2).reduce((acc, livro) => acc + livro.price, 0)
    : 0;
  const frete = 11.9;
  const total = subtotal + frete - desconto;

  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Produtos Selecionados */}
        <div className="w-full p-4 border border-gray-300 rounded-lg bg-white mb-6">
          <h3 className="text-lg font-bold mb-4">Produtos Selecionados</h3>
          <ul>
            {livros?.slice(0, 2).map((livro) => (
              <li
                key={livro.id}
                className="flex justify-between items-center mb-4"
              >
                <img
                  src={livro.imgSrc}
                  alt={livro.title}
                  className="w-20 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4 flex items-center">
                  <div>
                    <h4 className="font-bold">{livro.title}</h4>
                    <p className="text-sm font-bold text-gray-600">Qtd: 1</p>
                  </div>
                  <div className="flex-grow border-b border-gray-300 mx-4"></div>
                  <p className="font-bold">R$ {livro.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Resumo do Pedido e Descontos */}
          <div className="md:w-1/3 p-4 border border-gray-300 rounded-lg bg-white flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4">Resumo do Pedido</h3>
              <p className="flex justify-between font-bold mb-1">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold mb-1">
                <span>Método de Envio:</span>
                <span>R$ {frete.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold mb-2">
                <span>Desconto:</span>
                <span>-R$ {desconto.toFixed(2)}</span>
              </p>
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Código do cupom"
                  {...register("cupom")}
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                  disabled={cupomAplicado}
                />
                {cupomAplicado ? (
                  <button
                    onClick={removerCupom}
                    className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-700 transition"
                  >
                    Remover
                  </button>
                ) : (
                  <button
                    onClick={aplicarCupom}
                    className="ml-2 bg-[#B3B792] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#9FAF6F] transition"
                  >
                    Aplicar
                  </button>
                )}
              </div>

              {errors.cupom && (
                <span className="text-red-500">{errors.cupom.message}</span>
              )}
              <p className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#B3B792] text-white py-2 px-4 rounded-lg font-bold mt-4 hover:bg-[#9FAF6F] transition"
              >
                Fazer Pedido
              </button>
              <p className="mt-2 text-sm text-center text-gray-700">
                Ao clicar, você concorda com nossos Termos e Condições. Política
                de Privacidade e Proteção de Dados.
              </p>
            </div>
          </div>

          {/* Informações do Cliente e Método de Envio */}
          <div className="md:w-2/3 flex flex-col gap-6">
            <div className="w-full p-4 border border-gray-300 rounded-lg bg-white">
              <h3 className="text-lg font-bold mb-4">Informações do Cliente</h3>
              <div className="flex justify-between">
                <div className="w-1/2 p-4 border border-gray-300 rounded-lg bg-white mr-4">
                  <p className="font-bold">E-mail:</p>
                  <p>xxxxxxxx@gmail.com</p>
                  <p className="font-bold mt-1">Número de Telefone:</p>
                  <p>(11) 99999-9999</p>
                </div>
                <div className="w-1/2 p-4 border border-gray-300 rounded-lg bg-white">
                  <p className="font-bold">Endereço para envio:</p>
                  <p>Av. xxxxxx</p>
                  <p>Nº 65</p>
                  <p>Brasil</p>
                  <p>São Paulo</p>
                  <p>CEP: 0000-000</p>
                </div>
              </div>
            </div>

            <div className="w-full p-4 border border-gray-300 rounded-lg bg-white">
              <h3 className="text-lg font-bold mb-4">Método de Envio</h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-500 rounded-full w-2.5 h-2.5"></span>
                  <p className="text-gray-700 font-bold">
                    Taxa fixa e envio padrão para todo Brasil
                  </p>
                </div>
                <p className="font-bold">R$ 11,90</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Método de Pagamento */}
          <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg bg-white h-60">
            <h3 className="text-lg font-bold mb-4">Método de Pagamento</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 font-bold p-3">
                <input
                  type="radio"
                  value="debito"
                  checked={metodoPagamento === "debito"}
                  onChange={() => setMetodoPagamento("debito")}
                  className="text-gray-700 appearance-none border border-gray-400 rounded-full w-4 h-4 checked:bg-gray-700 checked:border-transparent"
                />
                Débito
              </label>
              <label className="flex items-center gap-2 font-bold p-3">
                <input
                  type="radio"
                  value="credito"
                  checked={metodoPagamento === "credito"}
                  onChange={() => setMetodoPagamento("credito")}
                  className="text-gray-700 appearance-none border border-gray-400 rounded-full w-4 h-4 checked:bg-gray-700 checked:border-transparent"
                />
                Crédito
              </label>
              <label className="flex items-center gap-2 font-bold p-3">
                <input
                  type="radio"
                  value="pix"
                  checked={metodoPagamento === "pix"}
                  onChange={() => setMetodoPagamento("pix")}
                  className="text-gray-700 appearance-none border border-gray-400 rounded-full w-4 h-4 checked:bg-gray-700 checked:border-transparent"
                />
                PIX (QRCode)
              </label>
            </div>
          </div>

          {/* QR Code ou Formulário de Pagamento */}
          <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg bg-white">
            {metodoPagamento === "pix" ? (
              <div className="bg-gray-100 p-4 rounded-lg text-center h-[358px] flex flex-col justify-center">
              <p className="text-black font-bold mb-4">
                Escaneie o QR Code para pagar:
              </p>
              <img
                src="/public/assets/images/qr_code.png"
                alt="QR Code"
                className="mx-auto w-32 h-32"
              />
              <p className="mt-2 text-sm font-bold">
                Chave PIX: 000.000.000-00
              </p>
              <button
                onClick={() => navigator.clipboard.writeText("000.000.000-00")}
                className="bg-[#B3B792] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#9FAF6F] transition"
              >
                Copiar Chave PIX
              </button>
              <p className="text-black font-bold mb-4">
                Beneficiário Editora Pensamentos de Quinta
              </p>
            </div>
            
            ) : (
              <div>
                <h3
                  className={`text-lg font-bold mb-4 ${metodoPagamento === "debito" ? "text-black" : "text-black"}`}
                >
                  {metodoPagamento === "debito"
                    ? "PAGUE NO DÉBITO"
                    : "PAGUE NO CRÉDITO"}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="nomeCartao" className="block font-bold">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      id="nomeCartao"
                      {...register("nomeCartao")}
                      className={`w-full border rounded-lg p-2 bg-[#d9dbc8] ${
                        errors.nomeCartao ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                  <div>
                    <label htmlFor="numeroCartao" className="block font-bold">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      id="numeroCartao"
                      {...register("numeroCartao")}
                      className={`w-full border rounded-lg p-2 bg-[#d9dbc8] ${
                        errors.numeroCartao
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="1234 5678 1234 5678"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="validade" className="block font-bold">
                        Data de Expiração
                      </label>
                      <input
                        type="text"
                        id="validade"
                        {...register("validade")}
                        className={`w-full border rounded-lg p-2 bg-[#d9dbc8] ${errors.validade ? "border-red-500" : "border-gray-300"}`}
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block font-bold">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        {...register("cvv")}
                        className={`w-full border rounded-lg p-2 bg-[#d9dbc8] ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#B3B792] text-white py-2 px-4 rounded-lg font-bold mt-4 hover:bg-[#9FAF6F] transition"
                  >
                    {metodoPagamento === "debito"
                      ? "Pagar com Débito"
                      : "Pagar com Crédito"}
                  </button>
                </form>
                <p className="mt-2 text-sm text-center text-gray-700">
                  Ao clicar, você concorda com nossos Termos e Condições e
                  Política de Privacidade.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
