import logo  from '../../../../public/assets/images/logo.jpeg'
export function MenuDashBoard(){
    return (
        <div className="w-[270px] h-[529px]  border flex justify-around flex-wrap rounded-xl"
        style={{
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
    >
        <div className="flex flex-row  items-center gap-3 h-[30%]">
            <img src={logo} alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
            <span>Olá,Anna Cruz!</span>
        </div>
        <ul className=" w-full h-[70%]">
            <li className=" px-4 mb-2"><a href="inicio">Dados Pessoais</a></li>
            <li className=" px-4 mb-2"><a href="endereco">Endereços</a></li>
            <li className=" px-4 mb-2"><a href="pedidos">Pedidos</a></li>
            <li className=" px-4 mb-2"><a href="carteira">Carteira</a></li>
            <li className=" px-4 mb-2"><a href="favoritos">Favoritos</a></li>
        </ul>
    </div>
    )
}