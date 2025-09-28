import { Link } from "react-router-dom";
import styles from '../styles/components/menuDropdown.module.css';

export const GameRulesDropdown = ({ closeDropdown }) => {
  return (
    <>
      <div className={`${styles.dropdown} d-flex justify-content-between rounded p-4`}>
        <div className="row w-100">
          <div className="col-12 d-grid gap-3" style={{ gridTemplateColumns: "repeat(4, 1fr)", display: "grid" }}>

            <Link to={"/wiki/classes"} onClick={closeDropdown}>
              <button className={`${styles.classeswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Classes</div>
              </button>
            </Link>

            <Link to={"/wiki/species"} onClick={closeDropdown}>
              <button className={`${styles.specieswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Species</div>
              </button>
            </Link>

            <Link to={"/wiki/backgrounds"} onClick={closeDropdown}>
              <button className={`${styles.backgroundswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Backgrounds</div>
              </button>
            </Link>

            <Link to={"/wiki/equipment"} onClick={closeDropdown}>
              <button className={`${styles.equipmentwikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Equipment</div>
              </button>
            </Link>

            <Link to={"/wiki/feats"} onClick={closeDropdown}>
              <button className={`${styles.featswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Feats</div>
              </button>
            </Link>

            <Link to={"/wiki/spells"} onClick={closeDropdown}>
              <button className={`${styles.spellswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Spells</div>
              </button>
            </Link>

            <Link to={"/wiki/magic-items"} onClick={closeDropdown}>
              <button className={`${styles.magicitemswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Magic Items</div>
              </button>
            </Link>

            <Link to={"/wiki/monsters"} onClick={closeDropdown}>
              <button className={`${styles.monsterswikibtn} p-4 fw-bold w-100 h-100`}>
                <div className={styles.titleBtn}>Monsters</div>
              </button>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};
