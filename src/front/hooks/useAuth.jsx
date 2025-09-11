import { createContext, useContext, useEffect, useState } from "react";
import { signUp, userLogin } from "../serviceApi/userApi";

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
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        setUser(null);
        setToken(null);
        return {
          success: false,
          error: data.error || data.msg || data.message || "Inicio de sesión fallido",
        };
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      return {
        success: false || "Inicio de sesión fallido",
      };
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const authSignUp = async (username, email, password) => {
    setLoading(true);

    try {
      const data = await signUp({ username, email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        setUser(null);
        setToken(null);
        return {
          success: false,
          error: data.error || "Registro fallido",
        };
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      return {
        success: false || "Registro fallido",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logOut, authSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
