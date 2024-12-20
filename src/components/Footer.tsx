import { FacebookLogo, WhatsappLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL

export function Footer() {
    return (
        <footer className="bg-fundoBanner w-full flex flex-col items-center mt-5 text-white p-4">
            <div className="flex flex-col sm:flex-row justify-around mt-5 mb-5 w-full items-center">
                <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                    <Link className='flex flex-col gap-3 items-center sm:items-start' to="/">
                        <img src={`${BASE_URL}/assets/images/logo.jpeg`} alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
                        <h1 className='font-playfair text-white font-bold text-sm hidden md:block'>Nossa Loja Virtual.</h1>
                    </Link>
                    <div className="flex justify-center mt-2 gap-1">
                        <FacebookLogo size={32} />
                        <WhatsappLogo size={32} />
                        <InstagramLogo size={32} />
                        <TwitterLogo size={32} />
                    </div>
                </div>
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className="font-bold">Atendimento</h3>
                    <p>+xx (xx) XXXXX-XXXX</p>
                    <p>editorapensamentosdequinta@gmail.com</p>
                    <p>Av. XXXXX XXXX, SP - 890, 00000-000 </p>
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="font-bold">Formas de Pagamento</h3>
                    <img src="/assets/images/pagamentos.png" alt="Formas de Pagamento" className="mx-auto sm:mx-0"/>
                </div>
            </div>
            <div className="text-center">
                <p>© 2024 Editora Pensamentos de Quinta. Todos os direitos reservados. - XXXX XXXXXXXX - CNPJ XXXXXXXXXXXX</p>
            </div>
        </footer>
    )
}
