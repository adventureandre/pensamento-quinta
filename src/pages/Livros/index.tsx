import { useState } from "react";
import { Heart } from "phosphor-react";

export function Livros() {
  const images = [
    "/assets/images/livro2.png",
    "/assets/images/livro2.png",
    "/assets/images/livro2.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Função para alternar o estado de favorito
  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  // Função para alterar a quantidade de livros
  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) =>
      operation === "increase"
        ? prevQuantity < 30
          ? prevQuantity + 1
          : 30
        : prevQuantity - 1 >= 1
          ? prevQuantity - 1
          : 1
    );
  };

  // Função para iniciar o aumento ou diminuição contínua da quantidade
  const handleMouseDown = (operation) => {
    handleQuantityChange(operation);
    const timeout = setTimeout(() => {
      const id = setInterval(() => handleQuantityChange(operation), 50);
      setIntervalId(id);
    }, 500);
    setTimeoutId(timeout);
  };

  // Função para parar o aumento ou diminuição contínua da quantidade
  const handleMouseUp = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Seção de navegação */}
        <nav className="mb-6">
          <span className="text-gray-500">Início</span> &gt;{" "}
          <span className="text-gray-500">Nossos Livros</span> &gt;{" "}
          <span className="text-gray-800 font-semibold">The Great Gatsby</span>
        </nav>

        {/* Seção da imagem e miniaturas */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex flex-col items-center gap-6 w-full md:w-auto">
            {/* Imagem principal */}
            <img
              src={images[currentImage]}
              alt="The Great Gatsby"
              className="w-full max-w-sm"
            />
            {/* Miniaturas */}
            <div className="flex gap-2 p-5 justify-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 cursor-pointer ${index === currentImage ? "ring-2 ring-white" : ""}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Seção de detalhes do livro */}
          <div className="flex-1 p-8 border border-gray-300 rounded-lg max-w-xl mx-auto">
            <div className="flex items-center gap-4">
              {/* Título do livro */}
              <h2 className="text-3xl font-bold text-gray-800 text-left">
                THE GREAT GATSBY
              </h2>
              {/* Botão de favoritos */}
              <div className="ml-auto">
                <button
                  className="p-2 rounded-full transition-colors"
                  onClick={toggleFavorito}
                >
                  <Heart
                    size={24}
                    weight="fill"
                    className={`${
                      favorito ? "text-red-500" : "text-gray-800"
                    } transition-colors`}
                  />
                </button>
              </div>
            </div>
            {/* Autor */}
            <p className="text-gray-600 mt-2 text-left">F. Scott</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-2xl font-semibold text-gray-800 text-left">
                R$ 37,90
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                  onMouseDown={() => handleMouseDown("decrease")}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  -
                </button>
                <span className="border border-gray-300 px-4 py-2 rounded">
                  {quantity}
                </span>
                <button
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                  onMouseDown={() => handleMouseDown("increase")}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-500 mt-4 text-left">
              <span className="font-bold text-black">Pedido em Estoque:</span>{" "}
              após confirmação do pagamento, envio imediato. Confira os prazos
              de entrega abaixo.
            </p>

            <button className="mt-6 bg-[#B3B792] text-white px-6 py-3 rounded w-full hover:bg-[#9FAF6F] transition">
              Adicionar ao carrinho
            </button>
            {/* Seção de CEP e consulta de frete */}
            <div className="mt-4 flex items-center gap-4 justify-center">
              <input
                type="text"
                placeholder="Digite seu CEP"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                Consultar Frete
              </button>
            </div>
          </div>
        </div>

        {/* Seção de sinopse */}
        <div className="flex-1 p-8 border border-gray-300 rounded-lg mt-12">
          <h3 className="text-2xl font-bold text-gray-800">Sinopse</h3>
          <p className="text-gray-600 mt-4">
            A hora da estrela leva esta proposta às últimas consequências e por
            isso a sua leitura torna-se tão intrigante. É certo que aqui
            encontramos a agudeza na investigação da natureza e psicologia
            humanas e o gosto pela minúcia, patente no trato dado à palavra, tão
            peculiares a Clarice Lispector...
          </p>
        </div>

        {/* Seção de ficha técnica */}
        <div className="flex-1 p-8 border border-gray-300 rounded-lg mt-12">
          <h3 className="text-2xl font-bold text-gray-800">Ficha Técnica</h3>
          <ul className="text-gray-600 mt-4">
            <li>
              <strong>Editora:</strong> Pensamentos de Quinta
            </li>
            <li>
              <strong>ISBN:</strong> XXXXXXXXXX
            </li>
            <li>
              <strong>Páginas:</strong> 180
            </li>
            <li>
              <strong>Ano:</strong> 2015
            </li>
            <li>
              <strong>Edição:</strong> 1
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
