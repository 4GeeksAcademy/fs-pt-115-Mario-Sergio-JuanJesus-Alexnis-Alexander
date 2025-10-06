import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllFeats } from "../../serviceApi/featsApi";
import { FeatsCard } from "../../components/FeatsCard";
import styles from "../../styles/page/showItems.module.css";

export const FeatsPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFeatsApi = async () => {
    setLoading(true);
    const responseApi = await getAllFeats();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer Feats");
      return;
    }
    dispatch({
      type: "set_feats",
      payload: responseApi.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getFeatsApi();
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
            YOUR FEATS
          </h1>
        </div>
      </div>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.feats.length > 0 ? (
          store.feats.map((feat) => (
            <FeatsCard key={feat.feats_id} item={feat} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun feats creado *****
          </h1>
        )}
      </div>
    </>
  );
};
