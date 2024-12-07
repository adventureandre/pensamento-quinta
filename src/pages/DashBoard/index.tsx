import { useParams } from "react-router-dom";
import { MenuDashBoard } from "./components/menu";
import { PedidosDashboard } from "./Pedidos";
import { FavoritosDashboard } from "./Favoritos";
import { EnderecoDashboard } from "./Endereco";
import { InicioDashboard } from "./Inicio";
import { CarteiraDashboard } from "./Carteira";

export function DashboardPage() {
    const { section } = useParams()

    let ComponentPage;

    switch (section) {
        case "inicio":
            ComponentPage = InicioDashboard

            break;
        
        case "pedidos":
            ComponentPage = PedidosDashboard

            break;
        case "favoritos":
            ComponentPage = FavoritosDashboard
            break

            case "endereco":
            ComponentPage = EnderecoDashboard
            break

            case "carteira":
                ComponentPage = CarteiraDashboard
                break
        default:
            ComponentPage = () => <div>Seção indisponivel!</div>
    }
    return (
        <div className="w-full flex justify-center mt-5 gap-5">
            <MenuDashBoard />

            <div
                className="flex justify-center items-center flex-wrap w-[800px] h-[529px] mb-14 rounded-xl pb-3 border-b-2 border-r-2"
                style={{
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
                }}>
                <ComponentPage />
            </div>
        </div>
    )
}