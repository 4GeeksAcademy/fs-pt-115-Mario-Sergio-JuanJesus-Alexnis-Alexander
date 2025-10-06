import { useEffect, useState } from "react";
import { MagicItemCard } from "../../components/MagicItemCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllMagicItems } from "../../serviceApi/magicItem.api";
import styles from "../../styles/page/showItems.module.css";

export const ShowMagicsItemsPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMagicsApi = async () => {
    setLoading(true);
    const responseApi = await getAllMagicItems();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "showMagicItem",
      payload: responseApi.data,
    });
    setLoading(false);
  };
 
  useEffect(() => {
    getMagicsApi();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="position-relative" style={{ height: "100vh" }}>
        <div className="position-absolute top-50 start-50 translate-middle fs-2">
          ⌛⌛⌛⌛....Loading....⌛⌛⌛⌛
        </div>
      </div>
    );
  }

  return (
    <>
    <div style={{ textAlign: "center" }}>
      <div className={styles.titleContainer}>
          <h1 className={styles.titleText}>
            ITEM MAGIC LIST
          </h1>
        </div>
    </div>

    <div className="container mt-5" style={{ marginBottom: "50px" }}>
      <div className="row g-4 justify-content-center">
        {store.magicsItems.length > 0 ? (
          store.magicsItems.map((magicItem) => (
            <div 
              key={magicItem.id} 
              className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2-4 d-flex justify-content-center"
            >
              <MagicItemCard item={magicItem} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <h1 className="text-center text-dark mt-5">
              ***** You dont have any Items *****
            </h1>
          </div>
        )}
      </div>
    </div>
  </>
  );
};
