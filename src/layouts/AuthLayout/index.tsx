import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <>
            {/* <Header /> */}
            {/* //Paginação acontece aki */}
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}