import { Link } from "react-router-dom";
import styles from "../styles/components/menuDropdown.module.css";

export const CollectionDropdown = ({ closeDropdown }) => {
  const creationsList = [
    {
      to: "user/create-character",
      text: " Create Characters",
      styles: styles.createBtn,
    },
    {
      to: "user/create-spell",
      text: " Create Spells",
      styles: styles.createBtn,
    },
    {
      to: "user/create-magic-item",
      text: " Create Magic Items",
      styles: styles.createBtn,
    },
    { to: "", text: " Create Monsters", styles: styles.createBtn },
    {
      to: "user/create-background",
      text: " Create Background",
      styles: styles.createBtn,
    },
    {
      to: "user/create-specie",
      text: " Create Species",
      styles: styles.createBtn,
    },
    {
      to: "user/create-subclasses",
      text: " Create Class",
      styles: styles.createBtn,
    },
    {
      to: "user/create-feats",
      text: " Create Feats",
      styles: styles.createBtn,
    },
    {
      to: "user/create-campaign",
      text: " Create Campaign",
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
              <span className={styles.titleBtn}>MY CHARACTERS</span>
            </button>
          </Link>
          <Link to={"/user/campaigns"}>
            <button className={styles.campaignsBtn}>
              <span className={styles.titleBtn}>MY CAMPAIGNS</span>
            </button>
          </Link>
          <Link to={"/user/magics-items"}>
            <button className={styles.magicsBtn} onClick={closeDropdown}>
              <span className={styles.titleBtn}>MY MAGIC ITEMS</span>
            </button>
          </Link>
          <Link to={"/user/spell"}>
            <button className={styles.spellsBtn}>
              <span className={styles.titleBtn}>MY SPELLS</span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.monstersBtn}>
              <span className={styles.titleBtn}>MY MONSTERS</span>
            </button>
          </Link>
          <Link to={""}>
            <button className={styles.diceBtn}>
              <span className={styles.titleBtn}>MY DICE</span>
            </button>
          </Link>
        </section>

        {/* **** SECCION DERECHA DEL DROPDOWN **** */}
      <div className={styles.dropRightContainer}>
        <section>
          <h3 className="text-white mt-2">Homebrew:</h3>
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
      </div>
      </main>

    </>
  );
};
