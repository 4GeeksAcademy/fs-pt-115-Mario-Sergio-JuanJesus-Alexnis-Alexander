import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const UserLayout = () => {
    
    const { token, user } = useAuth();


    if (!token || !user) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Outlet/>
    )

}