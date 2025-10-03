import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllSpells } from "../../serviceApi/spellApi";
import { SpellCard } from "../../components/SpellCard";


export const SpellPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSpellApi = async () => {
    setLoading(true);
    const responseApi = await getAllSpells();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "set_spells",
      payload: responseApi.data,
    });
    setLoading(false);
  };
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.spells);
  useEffect(() => {
    getSpellApi();
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
      <h1 className="text-center fw-bold display-4 mt-5 mb-4">
        Your spells
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.spells.length > 0 ? (
          store.spells.map((spell) => (
            <SpellCard key={spell.spell_id} item={spell} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** You don't have any spell created *****
          </h1>
        )}
      </div>
    </>
  );
};
