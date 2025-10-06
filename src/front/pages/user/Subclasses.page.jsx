import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllSubclasses } from "../../serviceApi/subclassesApi";
import { SubclassesCard } from "../../components/SubclassesCard";


export const SubclassesPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSubclassesApi = async () => {
    setLoading(true);
    const responseApi = await getAllSubclasses();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "set_subclasses",
      payload: responseApi.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getSubclassesApi();
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
                  SUBCLASSES
                </h1>
              </div>
          </div>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.subclasses.length > 0 ? (
          store.subclasses.map((subclasse) => (
            <SubclassesCard key={subclasse.subclasses_id} item={subclasse} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ninguna subclasse creada *****
          </h1>
        )}
      </div>
    </>
  );
};
