import { createContext, useContext, useEffect, useState } from "react";
import { signUp, userLogin } from "../serviceApi/userApi";
import { useAuth0 } from "@auth0/auth0-react";
const urlApi = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect, user: userAuth0, isAuthenticated, logout: logoutGoogle } = useAuth0();


  const loginWithGoogle = () => {
    loginWithRedirect()
  }

  const loginSync = async () => {
    if (!userAuth0) return

    setLoading(true)
    try {
      const response = await fetch(`${urlApi}/api/user/signup-google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userAuth0.nickname,
          email: userAuth0.email,
          avatar: userAuth0.picture,
          full_name: userAuth0.name,
        })
      }
      
    )
    const data = await response.json()

    setToken(data.token)
    localStorage.setItem('token', data.token)
    setUser(data.user)

    } catch (error) {
      console.log(error.message);
      return error.message
    } finally {
      setLoading(false)
    }
  }

  const login = async (emailOrUsername, password) => {
    setLoading(true);

    try {
      const data = await userLogin({ emailOrUsername, password });

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
    logoutGoogle()
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

  const userInfo = async () => {
    setLoading(true);
    

    try {
      const response = await fetch(`${urlApi}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al traer información");
      }
      const data = await response.json()

      setUser(data.user)
    } catch (error) {
      console.error(error.message);

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      userInfo()
    }
  }, [token])

  useEffect(()=> {
    if (userAuth0 && isAuthenticated) {
      loginSync()
    }
  },[userAuth0, isAuthenticated])

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logOut, authSignUp, loginWithGoogle, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
