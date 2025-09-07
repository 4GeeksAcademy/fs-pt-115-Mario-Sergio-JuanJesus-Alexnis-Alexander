import { Link } from "react-router-dom";

export const CollectionDropdown = () => {
  return (
    <>
      <div className="container d-flex space-between bg-dark mt-5 rounded">
        <div className="row gap-1 p-3">
          <Link to={""}>
            <button className="col-md-12 p-3">Mis personajes</button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3">Mis campañas</button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3">Mis articulos magicos</button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3">Mis hechizos</button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3">Mis monstruos</button>
          </Link>
        </div>
        <hr className="tex-danger border border-danger border-3" />
        <div className="row gap-3 p-3">
          <h3 className="text-white text-start ms-3">Creaciones:</h3>
          <button className="btn text-white text-center">---- Crear personajes ----</button>
          <button className="btn text-white">---- Crea hechizos ----</button>
          <button className="btn text-white">---- Crear campañas ----</button>
          <button className="btn text-white">---- Crear monstruos ----</button>
          <button className="btn text-white">---- Crear item magico ----</button>
        </div>
      </div>
    </>
  );
};
