import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CollectionDropdown } from "./CollectionDropdown";
import { useState } from "react";
import styles from "../styles/components/navbar.module.css";

export const Navbar = () => {
  const { token, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid ms-5">
          <Link to={"/"}>
            <div className="navbar-brand">
              <img
                className={styles.logoNavbar}
                src="src/front/assets/img/logo-navbar.png"
                alt="logo"
              />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex justify-content-center flex-grow-1">
              <menu className={styles.dropdown}>
                <div style={{ position: "relative" }}>
                  <button
                    className={styles.button}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Mi colección 🔻
                  </button>

                  {/* DROPDOWN AQUI */}
                  <div className={showDropdown ? "" : "d-none"}>
                    <CollectionDropdown
                      closeDropdown={() => setShowDropdown(false)}
                    />
                  </div>
                </div>

                <button className={styles.button}>Reglas de juego 🔻</button>
              </menu>
            </div>

            {!token ? (
              <form className="d-flex gap-2">
                <Link to={"/signup"}>
                  <button className={styles.button}>Registrarse</button>
                </Link>
                <Link to={"/login"}>
                  <button className={styles.button}>Iniciar sesion</button>
                </Link>
              </form>
            ) : (
              <form className="d-flex gap-2 ms-auto me-5">
                <button onClick={handleLogout} className="btn btn-success">
                  Cerrar sesión
                </button>

                <Link to={"/user/profile"}>
                  <button className="btn btn-primary">Perfil</button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
