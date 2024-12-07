import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomePage } from "./pages/Home";
import { PedidosPage } from "./pages/Pedidos";

export function Router(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pedidos" element={<PedidosPage/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}