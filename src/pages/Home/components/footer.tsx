import { FacebookLogo, WhatsappLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import { Link } from "react-router-dom";

export function FooterHome(){
    return (
        <footer className="bg-fundoBanner flex flex-col items-center mt-5 text-white">
        <div className="flex justify-around mt-5 mb-5 w-full">
          <Link className='flex flex-col gap-3 w-[500px]  items-center' to="/">
            <img src="assets/images/logo.jpeg" alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
            <h1 className='font-playfair text-white font-bold text-sm hidden md:block'>Nossa Loja Virtual.</h1>
          </Link>
          <div >
            <FacebookLogo size={32} />
            <WhatsappLogo size={32} />
            <InstagramLogo size={32} />
            <TwitterLogo size={32} />
          </div>
          <div>
            <h3>Atendimento</h3>
            <p>+xx (xx) XXXXX-XXXX</p>
            <p>editorapensamentosdequinta@gmail.com</p>
            <p>Av. XXXXX XXXX, SP - 890, 00000-000 </p>
          </div>
          <div>
            <h3>Formas de PAgamento</h3>
            <img src="./assets/images/pagamentos.png" alt="" />
          </div>
        </div>
        <div>
          <p>© 2024 Editora Pensamentos de Quinta. Todos os direitos reservados. - XXXX XXXXXXXX - CNPJ XXXXXXXXXXXX</p>
        </div>
      </footer>
    )
}