import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid ms-5">
        <Link to={"/"}>
          <a className="navbar-brand" href="#">
            <span className="ms-4">__D&D__</span> <br />
            <span className="ms-0">Master of Infinity</span>
          </a>
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
          <form className="d-flex gap-2 ms-auto me-5">
            <Link to={"/signup"}>
              <button className="btn btn-success">Registrarse</button>
            </Link>
            <Link to={"/login"}>
              <button className="btn btn-primary">Iniciar sesion</button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};
