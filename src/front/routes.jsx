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
import { CreateCharacterPage } from "./pages/user/CreateCharacter.page";
import { CreateMagicItemPage } from "./pages/user/CreateMagicItem.page";
import { PageFormCampaign } from "./pages/user/CreateCampaign.page";
import { CreateFeatPage } from "./pages/user/CreateFeat.page";
import { CreateBackgroundPage } from "./pages/user/CreateBackground.page";
import { CreateSpeciePage } from "./pages/user/CreateSpecie.page";
import { CreateSubclassPage } from "./pages/user/CreateSubclass.page";
import { ShowMagicsItemsPage } from "./pages/user/ShowMagicsItems.page";
import { ShowCharactersPage } from "./pages/user/ShowCharacters";
import { ShowCampaignPage } from "./pages/user/ShowCampaign.page";
import { WikiClasses } from "./components/Wiki/WikiClasses";
import { WikiFeats } from "./components/Wiki/WikiFeats";
import { WikiBackgrounds } from "./components/Wiki/WikiBackgrounds";
import { WikiSpecies } from "./components/Wiki/WikiSpecies";
import { WikiSpells } from "./components/Wiki/WikiSpells";
import { WikiEquipment } from "./components/Wiki/WikiEquipment";
import { WikiMagicItems } from "./components/Wiki/WikiMagicItems";
import { WikiMonsters } from "./components/Wiki/WikiMonsters";
import { SpellPage } from "./pages/user/Spell.page";
import { ShowMonsterPage } from "./pages/user/ShowMonster.page";
import { CreateMonsterPage } from "./pages/user/CreateMonster.page";
import { SpeciePage } from "./pages/user/Specie.page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>

      {/* TODAS LAS RUTAS PUBLICAS (TODO LO QUE SE PUEDE VER SIN TENER QUE ESTAR LOGEADO) */}
      <Route element={<PublicLayout />}>

        {/* AQUI LAS RUTAS PUBLICAS: */}
        <Route index element={<Home />} />
        <Route path="wiki/classes" element={<WikiClasses />} />
        <Route path="wiki/feats" element={<WikiFeats />} />
        <Route path="wiki/backgrounds" element={<WikiBackgrounds />} />
        <Route path="wiki/species" element={<WikiSpecies />} />
        <Route path="wiki/spells" element={<WikiSpells />} />
        <Route path="wiki/equipment" element={<WikiEquipment />} />
        <Route path="wiki/magic-items" element={<WikiMagicItems />} />
        <Route path="wiki/monsters" element={<WikiMonsters />} />
      </Route>




      {/* TODAS LAS RUTAS CUANDO EL USUARIO ESTA LOGEADO (MIS PERSONAJES, MIS CAMPAÑAS, PERFIL...) */}
      <Route element={<UserLayout />}>

        {/* METER AQUI LAS RUTAS: */}
        <Route path="user/profile" element={<ProfilePage />} />
        <Route path="user/create-spell" element={<Formspell />} />
        <Route path="user/create-character" element={<CreateCharacterPage />} />
        <Route path="user/create-feat" element={<CreateFeatPage />} />
        <Route path="user/create-magic-item" element={<CreateMagicItemPage />} />
        <Route path="user/create-campaign" element={<PageFormCampaign />} />
        <Route path="user/create-background" element={<CreateBackgroundPage />} />
        <Route path="user/create-specie" element={<CreateSpeciePage />} />
        <Route path="user/create-subclasses" element={<CreateSubclassPage />} />
        <Route path="user/create-feats" element={<CreateFeatPage />} />
        <Route path="user/magics-items" element={<ShowMagicsItemsPage />} />
        <Route path="user/specie" element={<SpeciePage/>} />
        <Route path="user/characters" element={<ShowCharactersPage />} />
        <Route path="user/campaigns" element={<ShowCampaignPage />} />
        <Route path="user/create-monster" element={<CreateMonsterPage />} />
        <Route path="user/monster" element={<ShowMonsterPage />} />
      </Route>

      {/* AQUI SOLO LAS RUTAS DE LOGIN Y REGISTER */}
      <Route element={<AuthLayout />}>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

    </Route>
  )
);