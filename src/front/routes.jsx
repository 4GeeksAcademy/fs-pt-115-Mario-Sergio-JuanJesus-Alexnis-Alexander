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
import { Home } from "./pages/publics/Home.page";
import { ProfilePage } from "./pages/user/Profile.page";
import { Formspell } from "./pages/user/Formspell.page";
import { CreateMagicItemPage } from "./pages/user/CreateMagicItem.page";
import { ShowMagicsItemsPage } from "./pages/user/ShowMagicsItems.page";
import { CreateCharacterPage } from "./pages/user/CreateCharacter.page";
import { CreateFeatPage } from "./pages/user/CreateFeat.page";


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

          {/* METER AQUI LAS RUTAS: */}
          <Route path="user/profile" element={ <ProfilePage/> }/>
          <Route path="user/create-spell" element={ <Formspell/> }/>
          <Route path="user/create-character" element={ <CreateCharacterPage/> }/>
          <Route path="user/create-feat" element={ <CreateFeatPage/> }/>
          <Route path="user/create-magic-item" element={ <CreateMagicItemPage/> }/>
          <Route path="user/magics-items" element={ <ShowMagicsItemsPage/> }/>
          
      </Route>




      {/* AQUI SOLO LAS RUTAS DE LOGIN Y REGISTER */}
      <Route element={ <AuthLayout/> }>
        <Route path='/signup' element={ <SignupPage/> }/>
        <Route path='/login' element={ <LoginPage/> }/>
      </Route>
      



    </Route>
    )
);