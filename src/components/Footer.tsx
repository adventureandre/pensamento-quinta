import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaBarcode,
  FaCcDiscover,
  FaCcAmex,} from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import logo from "/public/assets/images/logo.png";

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white py-6 w-full mt-auto">
      <div className="container mx-auto px-4 flex flex-row flex-wrap items-start gap-y-8 lg:justify-between">
        {/* Logo */}
        <div className="w-full lg:w-1/5 flex flex-col items-center lg:items-start mb-4 lg:mb-0">
          <img
            src={logo}
            alt="Editora Pensamentos de Quinta"
            className="w-24 h-24 lg:w-44 lg:h-44"
          />
        </div>

        {/* Siga-nos e Institucional */}
        <div className="w-1/2 sm:w-1/2 lg:w-1/5 flex flex-col items-center lg:items-start px-2">
          <p className="font-bold mb-3 text-sm lg:text-base">Siga-nos</p>
          <div className="flex space-x-4 mb-4">
            <FaFacebook
              className="text-lg lg:text-xl cursor-pointer hover:text-black"
              onClick={() => window.open("https://www.facebook.com", "_blank")}
            />
            <FaInstagram
              className="text-lg lg:text-xl cursor-pointer hover:text-black"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/editora.pensamentosdequinta/",
                  "_blank"
                )
              }
            />
          </div>
          <p className="font-bold mb-3 text-sm lg:text-base">INSTITUCIONAL</p>
          <button
            onClick={() => navigate("/quemsomos")}
            className="mb-2 text-gray-400 hover:underline cursor-pointer text-xs lg:text-sm"
          >
            Quem Somos
          </button>
          <button
            onClick={() => navigate("/politica-de-privacidade")}
            className="mb-2 text-gray-400 hover:underline cursor-pointer text-xs lg:text-sm"
          >
            Política de Privacidade
          </button>
        </div>

        {/* Atendimento */}
        <div className="w-1/2 sm:w-1/2 lg:w-1/5 flex flex-col items-center lg:items-start px-2">
          <p className="font-bold mb-3 text-sm lg:text-base">Atendimento</p>
          <button
            onClick={() => navigate("/central-do-cliente")}
            className="mb-2 text-gray-400 hover:underline cursor-pointer text-xs lg:text-sm"
          >
            Central do Cliente
          </button>
          <button
            onClick={() => navigate("/meus-pedidos")}
            className="mb-2 text-gray-400 hover:underline cursor-pointer text-xs lg:text-sm"
          >
            Meus Pedidos
          </button>
          <button
            onClick={() => navigate("/duvidas-frequentes")}
            className="mb-2 text-gray-400 hover:underline cursor-pointer text-xs lg:text-sm"
          >
            Dúvidas Frequentes
          </button>
        </div>

        {/* Central de Relacionamento */}
        <div className="w-1/2 sm:w-1/2 lg:w-1/5 flex flex-col items-center lg:items-start px-2 mt-4 lg:mt-0">
          <p className="font-bold mb-3 text-sm lg:text-base">Central de Relacionamento</p>
          <p className="text-gray-400 text-center lg:text-left text-xs lg:text-sm mb-2">
            Preparada para esclarecer suas dúvidas e problemas
          </p>
          <button
            onClick={() =>
              (window.location.href = "mailto:drianacampos.autora@gmail.com")
            }
            className="bg-black text-white w-32 h-8 rounded mb-2 text-xs lg:text-sm"
          >
            Fale Conosco
          </button>
        </div>

        {/* Pagamento */}
        <div className="w-1/2 sm:w-1/2 lg:w-1/5 flex flex-col items-center lg:items-start px-2 mt-4 lg:mt-0">
          <p className="font-bold mb-3 text-sm lg:text-base">Pagamento</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            <FaCcVisa className="text-xl lg:text-2xl" />
            <FaCcMastercard className="text-xl lg:text-2xl" />
            <FaCcPaypal className="text-xl lg:text-2xl" />
            <FaCcAmex className="text-xl lg:text-2xl" />
            <FaCcDiscover className="text-xl lg:text-2xl" />
            <FaBarcode className="text-xl lg:text-2xl" />
            <SiPix className="text-xl lg:text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};