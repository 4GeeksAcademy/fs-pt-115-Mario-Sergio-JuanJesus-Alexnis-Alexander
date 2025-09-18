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
        <div className={styles.dropLeft}>
          <Link to={""}>
            <button className={styles.charactersBtn}>Mis personajes</button>
          </Link>
          <Link to={""}>
            <button className={styles.campaignsBtn}>Mis campañas</button>
          </Link>
          <Link to={"/user/magics-items"}>
            <button className={styles.magicsBtn} onClick={closeDropdown}>
              Mis articulos magicos
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.spellsBtn}>Mis hechizos</button>
          </Link>
          <Link to={""}>
            <button className={styles.monstersBtn}>Mis monstruos</button>
          </Link>
          <Link to={""}>
            <button className={styles.diceBtn}>Mis dados</button>
          </Link>
        </div>
        {/* **** SECCION DERECHA DEL DROPDOWN **** */}

        <section>
          <h3 className="text-white">Creaciones:</h3>
          <div className={styles.dropRight}>
            {creationsList.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={closeDropdown}
                className={item.styles}
              >
                <span className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      fill="none"
                      stroke="#F1C40F"
                      stroke-width="2"
                    />

                    <path
                      d="M12 6v12M6 12h12"
                      stroke="#F1C40F"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  {item.text}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
