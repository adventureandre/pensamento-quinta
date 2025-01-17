import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart } from "phosphor-react";
import { create, StateCreator } from "zustand";
import { Link, useParams } from "react-router-dom";
import { livrosStore } from "@/store/livrosStore";
import { Livro } from "@/types/livro";

interface StoreState {
  favorito: boolean;
  toggleFavorito: () => void;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const storeCreator: StateCreator<StoreState> = (set) => ({
  favorito: false,
  toggleFavorito: () => set((state) => ({ favorito: !state.favorito })),
  quantity: 1,
  increaseQuantity: () =>
    set((state) => ({
      quantity: Math.min(state.quantity + 1, 30),
    })),
  decreaseQuantity: () =>
    set((state) => ({
      quantity: Math.max(state.quantity - 1, 1),
    })),
});

const useStore = create<StoreState>(storeCreator);

const cepSchema = z.object({
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/, "CEP inválido"),
});

type CepSchema = z.infer<typeof cepSchema>;

export function Livros() {
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentImage, setCurrentImage] = useState<string>("");
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const {
    favorito,
    toggleFavorito,
    quantity,
    increaseQuantity,
    decreaseQuantity,
  } = useStore();

  const { findById } = livrosStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CepSchema>({
    resolver: zodResolver(cepSchema),
  });

  useEffect(() => {
    const fetchLivro = async () => {
      setIsLoading(true);
      if (id) {
        const livroData = await findById(Number(id));
        if (livroData) {
          console.log("Dados do livro:", livroData);
          setLivro(livroData);
          if (livroData.imgSrc) {
            setCurrentImage(livroData.imgSrc);
          } else {
            console.warn("Propriedade imgSrc não encontrada no livro.");
          }
        } else {
          console.warn("Livro não encontrado.");
          setLivro(null);
        }
      }
      setIsLoading(false);
    };

    fetchLivro();
  }, [id, findById]);

  const handleMouseDown = (operation: "increase" | "decrease") => {
    if (operation === "increase") increaseQuantity();
    else decreaseQuantity();

    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        if (operation === "increase") increaseQuantity();
        else decreaseQuantity();
      }, 50);
      intervalId.current = id;
    }, 500);
    timeoutId.current = timeout;
  };

  const handleMouseUp = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  const onSubmit: SubmitHandler<CepSchema> = (data) => {
    alert(`CEP válido: ${data.cep}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-xl font-bold">Carregando livro...</p>
      </div>
    );
  }

  if (!livro) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-xl font-bold">Livro não encontrado.</p>
      </div>
    );
  }

  const thumbnails = Array(4).fill(currentImage);

  return (
    <div className="min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Seção de navegação */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:underline">
            Início
          </Link>{" "}
          &gt;{" "}
          <Link to="/nossoslivros" className="hover:underline">
            Nossos Livros
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-800 font-bold">{livro.title}</span>
        </nav>

        {/* Seção principal */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Imagem */}
          <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
            {/* Imagem principal */}
            <div className="relative w-full max-w-md">
              <img
                src={currentImage}
                alt={livro.title}
                className="w-full rounded-2xl"
              />
            </div>
            {/* Miniaturas */}
            <div className="flex gap-4 justify-center">
              {thumbnails.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Miniatura ${index + 1}`}
                  className="w-28 h-28 object-cover rounded-lg cursor-pointer"
                  onClick={() => setCurrentImage(imageUrl)}
                />
              ))}
            </div>
          </div>

          {/* Detalhes do livro */}
          <div className="flex-1 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800">
                  {livro.title}
                </h2>
                {livro.author && (
                  <p className="text-gray-500 mt-1 font-semibold">
                    {livro.author}
                  </p>
                )}
              </div>
              <button
                className="p-2 rounded-full transition-colors hover:bg-gray-100"
                onClick={toggleFavorito}
              >
                <Heart
                  size={28}
                  weight={favorito ? "fill" : "regular"}
                  className={`${
                    favorito ? "text-red-500" : "text-gray-500"
                  } transition-colors`}
                />
              </button>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-gray-800">
                R$ {livro.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-full hover:bg-gray-300"
                    onMouseDown={() => handleMouseDown("decrease")}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    &minus;
                  </button>
                  <span className="border-t border-b border-gray-200 px-4 py-1 font-semibold">
                    {quantity}
                  </span>
                  <button
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-full hover:bg-gray-300"
                    onMouseDown={() => handleMouseDown("increase")}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500 font-semibold">
                  Disponível em estoque
                </span>
              </div>
            </div>
            {/* Informações adicionais */}
            <p className="text-sm text-gray-600 mt-4 font-semibold">
              <span className="font-bold text-gray-700">
                Pedido em Estoque:
              </span>{" "}
              após confirmação do pagamento, envio imediato. Confira os prazos de
              entrega abaixo.
            </p>
            {/* Botão adicionar ao carrinho */}
            <button className="mt-6 bg-[#B3B792] text-white px-6 py-3 rounded-full w-full hover:bg-[#9FAF6F] transition-colors font-bold">
              Adicionar ao carrinho
            </button>
            {/* Consulta de frete */}
            <div className="mt-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  {...register("cep")}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors font-bold"
                >
                  Consultar Frete
                </button>
              </form>
              {errors.cep && (
                <p className="text-red-500 text-sm mt-2 font-semibold">
                  {errors.cep.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Seção de sinopse */}
        {livro.sinopse && (
          <div className="mt-12">
            <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800">Sinopse</h3>
              <p className="text-gray-700 mt-4 leading-relaxed font-semibold">
                {livro.sinopse}
              </p>
            </div>
          </div>
        )}
        {/* Seção de ficha técnica */}
        <div className="mt-8">
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800">Ficha Técnica</h3>
            <ul className="text-gray-700 mt-4 space-y-2 font-semibold">
              <li>
                <strong>Editora:</strong> {livro.editora}
              </li>
              <li>
                <strong>ISBN:</strong> {livro.isbn}
              </li>
              <li>
                <strong>Páginas:</strong> {livro.paginas}
              </li>
              <li>
                <strong>Ano:</strong> {livro.ano}
              </li>
              <li>
                <strong>Edição:</strong> {livro.edicao}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
