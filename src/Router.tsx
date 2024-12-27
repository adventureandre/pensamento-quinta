import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomePage } from "./pages/Home";
import { QuemSomosPage } from "./pages/QuemSomos";
import { CadastroPage } from "./pages/LoginCadastro/cadastroPage";
import { DashboardPage } from "./pages/DashBoard";
import { NossosLivros } from "./pages/NossosLivros";
import { NossosServicos } from "./pages/NossosServicos";
import { NossosAutores } from "./pages/NossosAutores";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginPage } from "./pages/LoginCadastro/loginPage";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quemsomos" element={<QuemSomosPage />} />
                    <Route path="/nossosservicos" element={<NossosServicos />} />
                    <Route path="/nossoslivros" element={<NossosLivros />} />
                    <Route path="/nossosautores" element={<NossosAutores />} />

                    <Route path="/dashboard/:section" element={<DashboardPage />} />
                </Route>

                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cadastro" element={<CadastroPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}