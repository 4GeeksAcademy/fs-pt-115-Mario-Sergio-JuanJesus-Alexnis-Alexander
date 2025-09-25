import { Link } from "react-router-dom";
import styles from '../styles/components/menuDropdown.module.css'

export const GameRulesDropdown = ({ closeDropdown }) => {
  return (
    <>
      <div className={`${styles.dropdown} d-flex justify-content-between rounded p-4`}>        
        <div className="row w-100">
          <div className="col-12 d-grid gap-3" style={{ gridTemplateColumns: "repeat(4, 1fr)", display: "grid" }}>
            
            <Link to={"/wiki/classes"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Classes
              </button>
            </Link>
            <Link to={"/wiki/species"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Species
              </button>
            </Link>

            <Link to={"/wiki/backgrounds"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Backgrounds
              </button>
            </Link>

            <Link to={"/wiki/equipment"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Equipment
              </button>
            </Link>

            <Link to={"/wiki/feats"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Feats
              </button>
            </Link>

            <Link to={"/wiki/spells"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Spells
              </button>
            </Link>

            <Link to={"/wiki/magic-items"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Magic Items
              </button>
            </Link>

            <Link to={"/wiki/monsters"} onClick={closeDropdown}>
              <button className="p-4 fw-bold w-100 h-100">
                Monster
              </button>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};
