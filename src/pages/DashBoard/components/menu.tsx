import { Link } from 'react-router-dom';
import logo from '../../../../public/assets/images/logo.jpeg';

export function MenuDashBoard() {
    return (
        <div className="w-[270px] h-[529px] border flex justify-around flex-wrap rounded-xl"
            style={{
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="flex flex-row items-center gap-3 h-[30%]">
                <img src={logo} alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
                <span>Olá, Anna Cruz!</span>
            </div>
            <ul className="w-full h-[70%]">
                <li className="px-4 mb-2"><Link to="/dashboard/inicio">Dados Pessoais</Link></li>
                <li className="px-4 mb-2"><Link to="/dashboard/endereco">Endereços</Link></li>
                <li className="px-4 mb-2"><Link to="/dashboard/pedidos">Pedidos</Link></li>
                <li className="px-4 mb-2"><Link to="/dashboard/carteira">Carteira</Link></li>
                <li className="px-4 mb-2"><Link to="/dashboard/favoritos">Favoritos</Link></li>
            </ul>
        </div>
    );
}
