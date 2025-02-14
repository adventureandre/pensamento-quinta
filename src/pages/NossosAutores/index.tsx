import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { autoresStore } from "@/store/autoresStore";

export function NossosAutores() {
  const navigate = useNavigate();
  const { autores, load, isLoading } = autoresStore();

  useEffect(() => {
    load();
  }, [load]);

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = event;
    const { offsetWidth, offsetHeight } = currentTarget;

    // Calcula a posição relativa do mouse em porcentagem
    const x = (clientX / offsetWidth) * 100;
    const y = (clientY / offsetHeight) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner com efeito de paralaxe */}
      <header
        className="w-full h-64 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/images/banner_livros.jpg")',
          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">Nossos Autores</h1>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full flex flex-col items-center mt-5 px-4 flex-grow">
        <div className="w-full max-w-7xl">
          <nav className="text-sm mb-4 text-gray-600 font-bold">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Início
            </span>{" "}
            &gt; <span>Nossos Autores</span>
          </nav>

          {isLoading ? (
            // Indicador de carregamento
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg font-semibold">Carregando...</p>
            </div>
          ) : (
            // Lista de autores
            <div className="flex flex-wrap gap-8 justify-center">
              {autores?.map((autor, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg border border-gray-300 rounded-lg p-6 flex flex-col items-center w-full sm:w-80 md:w-72 lg:w-64 transform transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={autor.foto}
                    alt={autor.name}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <h2 className="text-center text-xl font-bold">{autor.name}</h2>
                  <button className="bg-[#E5D2B8] text-black py-1 px-4 rounded-md font-bold text-sm hover:bg-[#d4c0a7] transition mt-4">
                    Saiba mais
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