// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layout/Root.layout";
import { PublicLayout } from "./layout/Public.layout";
import { UserLayout } from "./layout/User.layout";
import { AuthLayout } from "./layout/Auth.layout";
import { SignupPage } from "./pages/auth/Signup.page";
import { LoginPage } from "./pages/auth/Login.page";
import { Home } from "./pages/Home";


export const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={ <RootLayout/> }>

      {/* TODAS LAS RUTAS PUBLICAS (TODO LO QUE SE PUEDE VER SIN TENER QUE ESTAR LOGEADO) */}
      <Route element={ <PublicLayout/> }>
      
        {/* AQUI LAS RUTAS PUBLICAS: */}
        <Route index element={ <Home/>}/>
        
      </Route>




      {/* TODAS LAS RUTAS CUANDO EL USUARIO ESTA LOGEADO (MIS PERSONAJES, MIS CAMPAÑAS, PERFIL...) */}
      <Route element={ <UserLayout/> }>

          {/* METER AQUI LAS RUTAS COMO ESTAN LAS DE SIGNUP Y LOGIN: */}
          

      </Route>




      {/* AQUI SOLO LAS RUTAS DE LOGIN Y REGISTER */}
      <Route element={ <AuthLayout/> }>
        <Route path='/signup' element={ <SignupPage/> }/>
        <Route path='/login' element={ <LoginPage/> }/>
      </Route>
      



    </Route>
    )
);