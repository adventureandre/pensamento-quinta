import { Link } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import logo from '../../../../public/assets/images/logo.jpeg';

export function MenuDashBoard() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index: SetStateAction<null>) => {
        setActiveIndex(index);
    };

    const itens = [{
        texto: "Dados Pessoais",
        rota: "/dashboard/dadospessoais"
    },
    {
        texto: "Endereços",
        rota: "/dashboard/endereco"
    },
    {
        texto: "Histórico de Pedidos",
        rota: "/dashboard/pedidos"
    },
    {
        texto: "Carteira",
        rota: "/dashboard/carteira"
    },
    {
        texto: "Lista de Desejos",
        rota: "/dashboard/favoritos"
    },
    {
        texto: "Sair",
        rota: ""
    }
    ]

    return (
        <div className="w-[270px] h-[529px] border flex justify-around flex-wrap rounded-xl border-solid border border-[#566150]"
            style={{
                boxShadow: '4px 10px 10px rgba(0, 0, 0, 0.49)',
            }}
        >
            <div className="flex flex-row items-center gap-3 h-[30%]">
                <img src={logo} alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
                <span className='font-bold'>Olá, Anna Cruz!</span>
            </div>
            <ul className="w-full h-[70%]">
                {itens.map((item, index) => (
                    <li
                        key={index}
                        className={`w-[95%] ml-2 py-1 px-4 mb-3 font-bold text-lg italic rounded-lg ${activeIndex === index ? 'bg-[#D9DBC8]' : 'bg-white'
                            }`} 
                        onClick={() => handleClick(index)}>
                        <Link to={item.rota}>{item.texto}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
