import { useState } from "react";
import { Link } from "react-router-dom";
import { List, UserCircle, MagnifyingGlass, Heart, X } from "phosphor-react";
import ShopBag from "./ShopBag";

import logo from "../../public/assets/images/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full p-3 shadow-md">
      <div className="max-w-[1910px] mx-auto flex flex-col md:flex-row flex-wrap items-center justify-between gap-4">
        {/* Top Row - Mobile */}
        <div className="w-full flex md:hidden justify-between items-center">
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            onClick={() => setIsMenuOpen(true)}
          >
            <List size={28} />
          </button>

          {/* Logo Centralizada */}
          <Link className="flex items-center gap-2" to="/">
            <img src={logo} alt="Pensamentos de quinta" className="w-16" />
          </Link>

          <div className="flex items-center gap-4">
            <ShopBag />
            <Link to="/login">
              <UserCircle size={28} weight="fill" />
            </Link>
          </div>
        </div>

        {/* Barra de Busca Mobile */}
        <form className="w-full md:hidden mt-2">
          <label className="flex items-center w-full p-2 rounded-full bg-gray-100 border border-gray-300 px-4 transition-all focus-within:border-gray-500">
            <input
              className="bg-transparent w-full outline-none text-sm text-slate-800 placeholder-gray-500"
              type="search"
              placeholder="Pesquisar..."
            />
            <MagnifyingGlass size={20} className="text-gray-500" />
          </label>
        </form>

        {/* Logo Desktop */}
        <Link className="hidden md:flex items-center gap-4 w-auto" to="/">
        <img src={logo} alt="Pensamentos de quinta" className="w-12 md:w-20" />
          <h1 className="font-playfair font-semibold text-lg text-left max-w-[150px] leading-tight">
            A Editora Que Vai Te Encantar!
          </h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 text-sm font-bold">
            {[
              ["Papelaria Afetiva", "/quemsomos"],
              ["Quem Somos", "/quemsomos"],
              ["Nossos Serviços", "/nossosservicos"],
              ["Nossos Livros", "/nossoslivros"],
              ["Nossos Autores", "/nossosautores"],
            ].map(([title, url]) => (
              <li key={title}>
                <Link
                  className="hover:border-b-2 hover:border-gray-600 transition-all duration-200 px-2"
                  to={url}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <form className="w-72">
            <label className="flex items-center w-full p-2 rounded-full bg-gray-50 border border-gray-200 px-4 transition-colors hover:border-gray-400 focus-within:border-gray-500">
              <input
                className="bg-transparent w-full outline-none text-sm text-slate-800 placeholder-gray-500"
                id="search"
                type="search"
                placeholder="Digite o que procura"
              />
              <MagnifyingGlass size={20} className="text-gray-500" />
            </label>
          </form>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard/favoritos"
              className="transition-all hover:text-gray-600"
            >
              <Heart size={24} weight="fill" />
            </Link>
            <ShopBag />
            <Link to="/login" className="transition-all hover:text-gray-600">
              <UserCircle size={28} weight="fill" />
            </Link>
          </div>
        </div>

        {/* Menu Mobile Lateral */}
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed inset-y-0 right-0 z-50 w-64 bg-white p-6 rounded-l-lg shadow-2xl transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <ul className="mt-12 space-y-4">
              {[
                ["Home", "/"],
                ["Papelaria Afetiva", "/quemsomos"],
                ["Quem Somos", "/quemsomos"],
                ["Nossos Serviços", "/nossosservicos"],
                ["Nossos Livros", "/nossoslivros"],
                ["Nossos Autores", "/nossosautores"],
              ].map(([title, url]) => (
                <li key={title}>
                  <Link
                    className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
                    to={url}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
