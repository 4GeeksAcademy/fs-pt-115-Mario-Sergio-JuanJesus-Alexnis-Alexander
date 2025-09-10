import { useAuth } from "../../hooks/useAuth"

export const ProfilePage = () => {
    const { user } = useAuth()

    // ✅ AGREGAR ESTOS LOGS
    console.log("=== INFORMACION PARA PROFILE ===");
    console.log("user completo:", user);
    

    return(
        <>
        <h1 className="text-center mt-5">
            Bienvenido a tu perfil {user?.username || 'Usuario'}!!
        </h1>
        </>
    )
}