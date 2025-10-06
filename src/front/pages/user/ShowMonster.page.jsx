import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllMonsters } from "../../serviceApi/monsterApi";
import { MonsterCard } from "../../components/MonsterCard";
import styles from "../../styles/page/showItems.module.css";


export const ShowMonsterPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMonsterApi = async () => {
    setLoading(true);
    const responseApi = await getAllMonsters();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer personajes");
      return;
    }
    dispatch({
      type: "showMonsters",
      payload: responseApi.data,
    });
    setLoading(false);

  };
  
  useEffect(() => {
    getMonsterApi();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="position-relative" style={{ height: "100vh" }}>
        <div className="position-absolute top-50 start-50 translate-middle text-center fs-2 fw-bold">
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
                  YOUR MOSNTERS
                </h1>
              </div>
          </div>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.monsters.length > 0 ? (
          store.monsters.map((element) => (
            <MonsterCard key={element.id} item={element} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** You don't have any monsters created *****
          </h1>
        )}
      </div>
    </>
  );
};
