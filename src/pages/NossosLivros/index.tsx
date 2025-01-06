import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "phosphor-react";

export function NossosLivros() {
  const navigate = useNavigate();

  const livros = Array(8).fill({
    titulo: "The Great Gatsby - F. Scott",
    preco: "R$ 37,90",
    imagem: "/assets/images/livroPedidos.png",
    sinopse:
      "Uma obra-prima que narra a vida de Jay Gatsby, seu amor impossível e os excessos dos anos 1920. Esta é uma história sobre riqueza, obsessão e tragédia, ambientada nos exuberantes anos 1920, que captura a essência de uma era e os desafios emocionais enfrentados pelos personagens.",
  });

  const [favoritos, setFavoritos] = useState<boolean[]>(Array(livros.length).fill(false));
  const [showSinopse, setShowSinopse] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleFavorito = (index: number) => {
    const novosFavoritos = [...favoritos];
    novosFavoritos[index] = !novosFavoritos[index];
    setFavoritos(novosFavoritos);
  };

  const handleMouseEnterImage = (index: number) => {
    const timeout = setTimeout(() => {
      setShowSinopse(index);
    }, 800); // tempo
    setHoverTimeout(timeout);
  };

  const handleMouseLeaveImage = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setShowSinopse(null);
  };

  return (
    <main className="w-full flex flex-col items-center mt-5 px-4">
      <div className="w-full max-w-7xl">
        <nav className="text-sm mb-4 text-gray-600">
          <span
            className="cursor-pointer font-bold hover:underline"
            onClick={() => navigate("/")}
          >
            Início
          </span>{" "}
          &gt; <span className="font-bold">Nossos Livros</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6">NOSSOS LIVROS!</h1>

        <button className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold">
          Todos
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 justify-center">
          {livros.map((livro, index) => (
            <div
              key={index}
              className="relative bg-white shadow-2xl rounded-lg p-4 flex flex-col items-center transform transition-transform hover:scale-105 max-w-xs mx-auto overflow-hidden"
            >
              <button
                className="absolute top-3 right-3 z-20"
                onClick={() => toggleFavorito(index)}
              >
                <Heart
                  size={24}
                  weight="fill"
                  className={`${
                    favoritos[index] ? "text-red-500" : "text-black"
                  } transition-colors`}
                />
              </button>

              <div
                className="relative w-full h-40"
                onMouseEnter={() => handleMouseEnterImage(index)}
                onMouseLeave={handleMouseLeaveImage}
              >
                <img
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="w-full h-full object-cover rounded-lg"
                />

                {showSinopse === index && (
                  <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-4 rounded-lg shadow-xl z-10 animate-tracking-in-contract-bck overflow-hidden">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      {livro.titulo}
                    </h3>
                    <p
                      className="text-sm text-gray-600 text-center overflow-y-auto max-h-24"
                      style={{ lineHeight: "1.5rem" }}
                    >
                      {livro.sinopse}
                    </p>
                  </div>
                )}
              </div>

              <h2 className="text-center text-sm font-bold mb-2">{livro.titulo}</h2>

              <p className="text-lg font-bold text-gray-700 mb-4">{livro.preco}</p>

              <button className="bg-[#E5D2B8] text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-[#d4c0a7] transition">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
