import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllSpells } from "../../serviceApi/spellApi";
import { SpellCard } from "../../components/SpellCard";


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
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.feats);
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
          ⌛⌛⌛⌛....Cargando....⌛⌛⌛⌛
        </div>
      </div>
    );
  }


  return (
    <>
      <h1 className="text-center mt-5">
        Aqui esta tu lista de spell
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.feats.length > 0 ? (
          store.feats.map((feats) => (
            <FeatsCard key={feats.feats_id} item={feats} />
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
