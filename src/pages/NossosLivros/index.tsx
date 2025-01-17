import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "phosphor-react";
import { livrosStore } from "@/store/livrosStore";

export function NossosLivros() {
  const navigate = useNavigate();
  const { livros, load, isLoading } = livrosStore();

  const [favoritos, setFavoritos] = useState<boolean[]>([]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (livros) {
      setFavoritos(Array(livros.length).fill(false));
    }
  }, [livros]);

  const toggleFavorito = (index: number) => {
    const novosFavoritos = [...favoritos];
    novosFavoritos[index] = !novosFavoritos[index];
    setFavoritos(novosFavoritos);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="w-full flex flex-col items-center mt-5 px-4 flex-grow">
        <div className="w-full max-w-7xl">
          <nav className="text-sm mb-4 text-gray-600 font-bold">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Início
            </span>{" "}
            &gt; <span>Nossos Livros</span>
          </nav>

          <h1 className="text-2xl font-bold mb-6">NOSSOS LIVROS!</h1>

          <button className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm mb-6 font-bold">
            Todos
          </button>

          {isLoading ? (
            <p className="text-center text-xl font-bold">Carregando livros...</p>
          ) : (
            <div className="flex flex-wrap gap-8">
              {livros?.map((livro, index) => (
                <div
                  key={livro.id}
                  className="bg-white shadow-2xl border-[rgba(0,0,0,.2)] border-2 rounded-lg p-4 flex flex-col items-center transform transition-transform hover:scale-105 w-[auto] overflow-hidden"
                >
                  <button
                    className="absolute top-3 right-3 z-30"
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

                  <div className="relative w-full h-40">
                    <img
                      src={livro.imgSrc}
                      alt={livro.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <h2 className="text-center text-sm font-bold mb-2">{livro.title}</h2>
                  <p className="text-lg font-bold text-gray-700 mb-4">{`R$ ${livro.price.toFixed(2)}`}</p>

                  <button
                    onClick={() => navigate(`/livros/${livro.id}`)} // Redireciona para a página do livro
                    className="bg-[#E5D2B8] text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-[#d4c0a7] transition"
                  >
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
