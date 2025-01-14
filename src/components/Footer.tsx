import { FacebookLogo, WhatsappLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import { Link } from "react-router-dom";


// const BASE_URL = import.meta.env.VITE_BASE_URL
const logo = "/assets/images/logo_br.png"

export function Footer() {

    return (
        <footer className="bg-fundoBanner w-full h-80 flex flex-col justify-center mt-5 text-white">
            <div className="flex flex-col sm:flex-row justify-between mb-5 w-full items-center">
                <div className="h-[160px] ml-10 w-[190px] flex flex-col items-center">
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <img src={logo} alt="Pensamentos de quinta" className="w-[100px] min-w-20 pb-1" />
                        <h1 className="font-playfair font-bold text-sm hidden md:block pb-1 text-[#FFF]">Nossa Loja Virtual.</h1>
                    </div>
                    <div className="w-full h-12 flex items-center justify-around bg-[#FFF] rounded-sm">
                        <a href="#"><FacebookLogo size={32} className="text-[#566150]"/></a>
                        <a href="#"><WhatsappLogo size={32} className="text-[#566150]"/></a>
                        <a href="#"><InstagramLogo size={32} className="text-[#566150]"/></a>
                        <a href="#"><TwitterLogo size={32} className="text-[#566150]"/></a>
                    </div>
                </div>
                <div className="flex flex-row pr-10">
                    <div>
                        
                    </div>
                    <div>...</div>
                </div>
            </div>
            <div className="text-center mt-5 text-[#FFF]">
                <p className="">© 2024 Editora Pensamentos de Quinta. Todos os direitos reservados. - XXXX XXXXXXXX - CNPJ XXXXXXXXXXXX</p>
            </div>
        </footer>
    )
}