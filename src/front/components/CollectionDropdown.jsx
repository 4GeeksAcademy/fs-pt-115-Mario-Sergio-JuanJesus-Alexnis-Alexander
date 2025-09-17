import { Link } from "react-router-dom";
import styles from '../styles/components/menuDropdown.module.css'

export const CollectionDropdown = ({ closeDropdown }) => {
  return (
    <>
      <div
        className={`${styles.dropdown} d-flex justify-content-between rounded`}
      >
        {/* **** SECCION IZQUIERDA DEL DROPDOWN **** */}
        <div className="row gap-1 p-3">
          <Link to={""}>
            <button className={`col-md-12 p-3 fw-bold ${styles.charButton}`}>
              Mis personajes
            </button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3 fw-bold">
              Mis campañas
            </button>
          </Link>
          <Link to={"/user/magics-items"}>
            <button
              className="col-md-12 p-3 fw-bold"
              onClick={closeDropdown}>
              Mis articulos magicos
            </button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3 fw-bold">
              Mis hechizos
            </button>
          </Link>
          <Link to={""}>
            <button className="col-md-12 p-3 fw-bold">
              Mis monstruos
            </button>
          </Link>
        </div>

        <hr className="tex-danger border border-danger border-3" />

        {/* **** SECCION DERECHA DEL DROPDOWN **** */}
        <div className="row gap-3 p-2">
          <h3 className="text-white text-start ms-2">Creaciones:</h3>
          <Link to={""} className="ms-4">
            <button className="btn text-white text-center">
              🔹 Crear personajes
            </button>
          </Link>
          <Link
            to={"user/create-spell"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear hechizos</button>
          </Link>
          <Link to={""} className="ms-4">
            <button className="btn text-white">
              🔹 Crear monstruos</button>
          </Link>
          <Link
            to={"/user/create-magic-item"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear articulos magicos
            </button>
          </Link>
          <Link to={""} className="ms-4">
            <button className="btn text-white">
              🔹 Crear campañas</button>
          </Link>
          <Link
            to={"/user/create-background"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear Background
            </button>
          </Link>
          <Link
            to={"/user/create-specie"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear Especie
            </button>
          </Link>
          <Link
            to={"/user/create-subclasses"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear Sub-clase
            </button>
          </Link>
          <Link
            to={"/user/create-feats"}
            onClick={closeDropdown}
            className="ms-4"
          >
            <button className="btn text-white">
              🔹 Crear Hazañas
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
