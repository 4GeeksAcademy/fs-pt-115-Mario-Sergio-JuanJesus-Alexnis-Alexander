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
        {store.spells.length > 0 ? (
          store.spells.map((spell) => (
            <SpellCard key={spell.spell_id} item={spell} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun spell creado *****
          </h1>
        )}
      </div>
    </>
  );
};
