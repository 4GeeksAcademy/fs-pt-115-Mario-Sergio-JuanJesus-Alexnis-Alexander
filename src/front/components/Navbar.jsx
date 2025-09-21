import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CollectionDropdown } from "./CollectionDropdown";
import { useRef, useState } from "react";
import styles from "../styles/components/navbar.module.css";
import { GameRulesDropdown } from "./GameRulesDropdown";

export const Navbar = () => {
  const { token, logOut } = useAuth();
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showRulesDropdown, setShowRulesDropdown] = useState(false);
  const navigate = useNavigate();
  const timeDropdown = useRef(null);

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handleMouseLeave = (setDropdown) => {
    timeDropdown.current = setTimeout(() => {
      setDropdown(false);
    }, 200);
  };

  const handleMouseEnterCollection = () => {
    if (timeDropdown.current) clearTimeout(timeDropdown.current);
    setShowCollectionDropdown(true);
    setShowRulesDropdown(false); 
  };

  const handleMouseEnterRules = () => {
    if (timeDropdown.current) clearTimeout(timeDropdown.current);
    setShowRulesDropdown(true);
    setShowCollectionDropdown(false); 
  };

  return (
    <nav className="navbar navbar-expand-lg" id={styles.navbar}>
      <div className="container-fluid ms-2">
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
          className="navbar-toggler bg-warning"
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
            <menu className={styles.btnDropdown}>
              <div
                onMouseEnter={handleMouseEnterCollection}
                onMouseLeave={() => handleMouseLeave(setShowCollectionDropdown)}
              >
                <button className={styles.button}>Mi colección 🔻</button>
              </div>
              <div
                onMouseEnter={handleMouseEnterRules}
                onMouseLeave={() => handleMouseLeave(setShowRulesDropdown)}
              >
                <button className={styles.button}>Reglas de juego 🔻</button>
              </div>
            </menu>

            {/* Dropdown de colección */}
            {showCollectionDropdown && (
              <div
                onMouseEnter={handleMouseEnterCollection}
                onMouseLeave={() =>
                  handleMouseLeave(setShowCollectionDropdown)
                }
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1000,
                }}
              >
                <CollectionDropdown
                  closeDropdown={() => setShowCollectionDropdown(false)}
                />
              </div>
            )}

            {/* Dropdown de reglas */}
            {showRulesDropdown && (
              <div
                onMouseEnter={handleMouseEnterRules}
                onMouseLeave={() => handleMouseLeave(setShowRulesDropdown)}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1000,
                }}
              >
                <GameRulesDropdown
                  closeDropdown={() => setShowRulesDropdown(false)}
                />
              </div>
            )}
          </div>

          {!token ? (
            <form className="d-flex gap-2">
              <Link to={"/signup"}>
                <button className={styles.button}>Registrarse</button>
              </Link>
              <Link to={"/login"}>
                <button className={styles.button}>Iniciar sesión</button>
              </Link>
            </form>
          ) : (
            <form className="d-flex gap-2 ms-auto me-5">
              <button onClick={handleLogout} className={styles.button}>
                Cerrar sesión
              </button>
              <Link to={"/user/profile"}>
                <button className={styles.button}>Perfil</button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};
