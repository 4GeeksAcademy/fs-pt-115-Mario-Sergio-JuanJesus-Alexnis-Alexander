import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { SpellCard } from "../../components/SpellCard";
import { getAllSpecies } from "../../serviceApi/specieApi";
import { SpecieCard } from "../../components/SpecieCard";
import styles from "../../styles/page/showItems.module.css";


export const SpeciePage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSpecieApi = async () => {
    setLoading(true);
    const responseApi = await getAllSpecies();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "set_species",
      payload: responseApi.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getSpecieApi();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="position-relative" style={{ height: "100vh" }}>
        <div className="position-absolute top-50 start-50 translate-middle fs-2">
          ⌛⌛⌛⌛....Cargando....⌛⌛⌛⌛
        </div>
      </div>
    );
  }


  return (
    <>
      <div style={{ textAlign: "center" }}>
            <div className={styles.titleContainer}>
                <h1 className={styles.titleText}>
                  YOUR SPECIES
                </h1>
              </div>
          </div>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.species.length > 0 ? (
          store.species.map((specie) => (
            <SpecieCard key={specie.specie_id} item={specie} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ninguna specie creada *****
          </h1>
        )}
      </div>
    </>
  );
};
