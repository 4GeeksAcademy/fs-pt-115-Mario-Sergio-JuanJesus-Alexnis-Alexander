import { createContext, useContext, useState } from "react";
import { userLogin } from "../serviceApi/userApi";

const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
    const [token, setToken] = useState(localStorage.getItem('token' || null));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await userLogin({email, password});
            setToken(data.token);
            setUser(data.data);
            localStorage.setItem('token', data.token);
            
        } catch (error) {
            console.log(error);
            setUser(null);
            setToken(null);
            
        } finally {
            setLoading(false);
        }
    }

    return <AuthContext.Provider value={{token, user, loading, login}}>{children}</AuthContext.Provider>
}

export const useAuth = () =>{
    return useContext(AuthContext);
} 
