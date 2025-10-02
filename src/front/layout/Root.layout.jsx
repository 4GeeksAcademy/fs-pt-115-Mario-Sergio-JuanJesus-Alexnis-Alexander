import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Cookies } from "../components/Cookies";

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Cookies/>
      <main style={{minHeight: '450px'}}>
        <Outlet />
      </main>
      <Footer />
      
    </>
  );
};
