import { Link } from "react-router-dom";

export const CollectionDropdown = ({ closeDropdown }) => {
  return (
    <>
      <div
        className="d-flex justify-content-between bg-dark mt-5 rounded"
        style={{
          top: "100%",
          zIndex: "1001",
          position: "absolute",
          transform: "translateX(-50%)",
          width: "60vw",
          marginLeft: "15rem",
        }}
      >
        {/* **** SECCION IZQUIERDA DEL DROPDOWN **** */}
        <div className="row gap-1 p-3">
          <Link to={""}>
            <button className="col-md-12 p-3 fw-bold">
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
          <Link
            to={"user/create-character"}
            onClick={closeDropdown}
            className="ms-4"
          >
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
          <Link to={""} className="ms-4 ">
            <button className="btn text-white">
              🔹 Crear campañas</button>
          </Link>
        </div>
        <div className="row gap-3 p-2">
          <Link to={"user/create-feat"} className="ms-4 ">
            <button className="btn text-white">
              🔹 Crear atributo</button>
          </Link>
          <Link to={""} className="ms-4">
            <button className="btn text-white">
              🔹 Crear transfondo</button>
          </Link>
          <Link to={""} className="ms-4">
            <button className="btn text-white">
              🔹 Crear raza</button>
          </Link>
          <Link to={""} className="ms-4 ">
            <button className="btn text-white">
              🔹 Crear subraza</button>
          </Link>
          <Link to={""} className="ms-4 ">
            <button className="btn text-white">
              🔹 Crear clase</button>
          </Link>
          <Link to={""} className="ms-4">
            <button className="btn text-white">
              🔹 Crear subclase</button>
          </Link>
        </div>
      </div>
    </>
  );
};
