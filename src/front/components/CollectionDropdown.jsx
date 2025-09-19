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
      text: " Crear clase",
      styles: styles.createBtn,
    },
    {
      to: "user/create-feats",
      text: " Crear hazañas",
      styles: styles.createBtn,
    },
  ];

  return (
    <>
      <main className={styles.dropdown}>
        {/* **** SECCION IZQUIERDA DEL DROPDOWN **** */}
        <section className={styles.dropLeft}>
          <Link to={"/user/characters"}>
            <button className={styles.charactersBtn} onClick={closeDropdown}>
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

        <section>
          <h3 className="text-white mt-2">Creaciones:</h3>
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
                      strokeWidth="2"
                    />

                    <path
                      d="M12 6v12M6 12h12"
                      stroke="#F1C40F"
                      strokeWidth="2"
                      strokeLinecap="round"
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
