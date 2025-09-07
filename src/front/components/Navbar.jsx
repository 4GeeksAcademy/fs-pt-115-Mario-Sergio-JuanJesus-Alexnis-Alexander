import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { token, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ms-5">
          <Link to={"/"}>
            <div className="navbar-brand">
              <span className="ms-4">__D&D__</span> <br />
              <span className="ms-0">Master of Infinity</span>
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
            <div className="d-flex ms-5" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                🔍
              </button>
            </div>
            {!token ? (
              <form className="d-flex gap-2 ms-auto me-5">
                <Link to={"/signup"}>
                  <button className="btn btn-success">Registrarse</button>
                </Link>
                <Link to={"/login"}>
                  <button className="btn btn-primary">Iniciar sesion</button>
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

      <menu className="bg-secondary p-3 d-flex justify-content-center gap-3">
        <button className="btn btn-lg bg-success fw-bold">
          Mi colección ⬇️
        </button>
        <button className="btn btn-lg bg-success fw-bold">
          Reglas de juego ⬇️
        </button>
      </menu>
    </>
  );
};
