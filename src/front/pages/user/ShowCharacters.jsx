import { useEffect, useState } from "react";
import { MagicItemCard } from "../../components/MagicItemCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllCharacters } from "../../serviceApi/characterApi";
import { CharacterCard } from "../../components/CharacterCard";

export const ShowCharactersPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCharactersApi = async () => {
    setLoading(true);
    const responseApi = await getAllCharacters();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer personajes");
      return;
    }
    dispatch({
      type: "showCharacters",
      payload: responseApi.data,
    });
    setLoading(false);
    
  };
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.characters);
  useEffect(() => {
    getCharactersApi();
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
        Tu lista de personajes
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.characters.length > 0 ? (
          store.characters.map((element) => (
            <CharacterCard key={element.id} item={element} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun personaje creado *****
          </h1>
        )}
      </div>
    </>
  );
};
