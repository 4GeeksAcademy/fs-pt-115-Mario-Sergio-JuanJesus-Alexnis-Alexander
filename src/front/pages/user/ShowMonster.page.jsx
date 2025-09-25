import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllMonsters } from "../../serviceApi/monsterApi";
import { MonsterCard } from "../../components/MonsterCard";

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
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.monsters);
  useEffect(() => {
    getMonsterApi();
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
      <h1 className="text-center mt-5">
        Tu lista de monstruos
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.monsters.length > 0 ? (
          store.monsters.map((element) => (
            <MonsterCard key={element.id} item={element} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun monstruo creado *****
          </h1>
        )}
      </div>
    </>
  );
};
