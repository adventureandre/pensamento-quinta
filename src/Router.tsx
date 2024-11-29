import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomePage } from "./pages/Home";

export function Router(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
        <Route path="/" element={<HomePage/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}