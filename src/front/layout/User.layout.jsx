import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const UserLayout = () => {
    
    const { token, user } = useAuth();


    if (!token ) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Outlet/>
    )

}