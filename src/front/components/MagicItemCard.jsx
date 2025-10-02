import { deleteMagicItem } from "../serviceApi/magicItem.api";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import styles from "../styles/components/magicCard.module.css";

export const MagicItemCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);
  const [transform, setTransform] = useState(false)

  const handleDelete = async (id) => {
    setError(false);
    const deleteItemApi = await deleteMagicItem(id);
    if (deleteItemApi.success) {
      dispatch({
        type: "deleteMagicItem",
        payload: id,
      });
    } else {
      setError(deleteItemApi.error);
    }
  };

  return (
    <>
      <div className={styles.flipCard}>
        <div onClick={()=> setTransform(!transform)} className={`${styles.flipCardInner} ${transform ? styles.flipCardTransform : ''}`}>
          <div className={styles.flipCardFront}>
            <p className={styles.title}>{item.name}</p>
            <span>Type: {item.magic_item_type}</span>
            <p>imagen de item</p>
            <span>Rarity: {item.rarity}</span>
          </div>
          <div className={styles.flipCardBack}>
            <p className={styles.title}>BACK</p>
            <p>Leave Me</p>
            <div className={`text-center${styles.buttonContainer}`}>
              {/* <button className={styles.btnPrimary} disabled>
                Detalles
              </button> */}
              <button
                className={styles.btnPrimary}
                onClick={() => handleDelete(item.id)}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
