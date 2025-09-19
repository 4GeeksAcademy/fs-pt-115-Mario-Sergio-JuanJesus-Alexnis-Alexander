import { Link } from "react-router-dom";
import styles from "../styles/components/menuDropdown.module.css";

export const CollectionDropdown = ({ closeDropdown }) => {
  const creationsList = [
    {
      to: "user/create-character",
      text: " Crear personajes",
      styles: styles.createBtn,
    },
    {
      to: "user/create-spell",
      text: " Crear hechizos",
      styles: styles.createBtn,
    },
    {
      to: "user/create-magic-item",
      text: " Crear articulos magicos",
      styles: styles.createBtn,
    },
    { to: "", text: " Crear monstruos", styles: styles.createBtn },
    { to: "", text: " Crear campañas", styles: styles.createBtn },
    {
      to: "user/create-background",
      text: " Crear transfondo",
      styles: styles.createBtn,
    },
    {
      to: "user/create-specie",
      text: " Crear especies",
      styles: styles.createBtn,
    },
    {
      to: "user/create-subclasses",
      text: " Crear subclase",
      styles: styles.createBtn,
    },
    {
      to: "user/create-feats",
      text: " Crear hazañas",
      styles: styles.createBtn,
    },
    {
      to: "user/create-feat",
      text: " Crear atributo",
      styles: styles.createBtn,
    },
    { to: "", text: " Crear raza", styles: styles.createBtn },
    { to: "", text: " Crear subraza", styles: styles.createBtn },
    { to: "", text: " Crear clase", styles: styles.createBtn },
  ];

  return (
    <>
      <main className={styles.dropdown}>
        {/* **** SECCION IZQUIERDA DEL DROPDOWN **** */}
        <section className={styles.dropLeft}>
          <Link to={""}>
            <button className={styles.charactersBtn}>
              <span className={styles.titleBtn}>MIS PERSONAJES</span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.campaignsBtn}>
              <span className={styles.titleBtn}>MIS CAMPAÑAS</span>
            </button>
          </Link>
          <Link to={"/user/magics-items"}>
            <button className={styles.magicsBtn} onClick={closeDropdown}>
              <span className={styles.titleBtn}> MIS ARTICULOS MAGICOS </span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.spellsBtn}>
              <span className={styles.titleBtn}>MIS HECHIZOS</span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.monstersBtn}>
              <span className={styles.titleBtn}>MIS MONSTRUOS</span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.diceBtn}>
              <span className={styles.titleBtn}>MIS DADOS</span>
            </button>
          </Link>
        </section>

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
          <Link 
            to={"/user/create-campaign"} 
            onClick={closeDropdown}
            className="ms-4 mb-3">
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
