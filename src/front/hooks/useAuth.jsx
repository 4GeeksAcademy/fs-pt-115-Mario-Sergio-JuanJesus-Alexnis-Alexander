import { createContext, useContext, useState } from "react";
import { userLogin } from "../serviceApi/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const data = await userLogin({ email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        console.log(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      } else {
        setUser(null);
        setToken(null);
        return {
          success: false,
          error: data.error || "Inicio de sesión fallido",
        };
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setToken(null);
      return { 
        success: false || "Inicio de sesión fallido" };
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
