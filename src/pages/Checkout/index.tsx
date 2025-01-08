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
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const { livros, load } = livrosStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [metodoPagamento, setMetodoPagamento] = useState("credito");

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log("Dados do formulário:", data);
    alert("Compra finalizada com sucesso!");
  };

  useEffect(() => {
    load();
  }, [load]);

  const subtotal = livros
    ? livros.slice(0, 2).reduce((acc, livro) => acc + livro.price, 0)
    : 0;
  const frete = 11.9;
  const total = subtotal + frete;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
            <ul>
              {livros?.slice(0, 2).map((livro) => (
                <li
                  key={livro.id}
                  className="flex items-center justify-between mb-4 border-b pb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={livro.imgSrc}
                      alt={livro.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{livro.title}</h3>
                      <p className="text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  <span>R$ {livro.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 pt-4">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Método de Envio</span>
                <span>R$ {frete.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Informações de Pagamento</h2>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="credito"
                  checked={metodoPagamento === "credito"}
                  onChange={() => setMetodoPagamento("credito")}
                />
                Crédito
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="debito"
                  checked={metodoPagamento === "debito"}
                  onChange={() => setMetodoPagamento("debito")}
                />
                Débito
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="pix"
                  checked={metodoPagamento === "pix"}
                  onChange={() => setMetodoPagamento("pix")}
                />
                PIX (QRCode)
              </label>
            </div>

            {metodoPagamento === "pix" ? (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-center text-gray-700 font-bold">
                  Escaneie o QR Code para realizar o pagamento.
                </p>
                <div className="flex justify-center mt-4">
                  <img
                    src="/path/to/qrcode.png"
                    alt="QR Code"
                    className="w-40 h-40"
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="nomeCartao" className="block font-medium">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    id="nomeCartao"
                    {...register("nomeCartao")}
                    className={`w-full border rounded-md p-2 ${
                      errors.nomeCartao ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nomeCartao && (
                    <p className="text-red-500 text-sm">
                      {errors.nomeCartao.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="numeroCartao" className="block font-medium">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    id="numeroCartao"
                    {...register("numeroCartao")}
                    className={`w-full border rounded-md p-2 ${
                      errors.numeroCartao
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.numeroCartao && (
                    <p className="text-red-500 text-sm">
                      {errors.numeroCartao.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="validade" className="block font-medium">
                      Validade (MM/AA)
                    </label>
                    <input
                      type="text"
                      id="validade"
                      {...register("validade")}
                      className={`w-full border rounded-md p-2 ${
                        errors.validade
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.validade && (
                      <p className="text-red-500 text-sm">
                        {errors.validade.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block font-medium">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      {...register("cvv")}
                      className={`w-full border rounded-md p-2 ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-md ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Processando..." : "Finalizar Compra"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

