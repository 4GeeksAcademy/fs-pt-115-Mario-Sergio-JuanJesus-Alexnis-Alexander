import { useEffect, useState } from "react";
import { MagicItemCard } from "../../components/MagicItemCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllMagicItems } from "../../serviceApi/magicItem.api";

export const ShowMagicsItemsPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);

  console.log('***DATOS PARA EXTRAER***');
  console.log(store.magicsItems);

  const getMagicsApi = async () => {
    const responseApi = await getAllMagicItems();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "showMagicItem",
      payload: responseApi.data,
    });
  };

  useEffect(() => {
    getMagicsApi();
  }, []);

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <h1 className="text-center mt-5">
        Aqui esta tu lista de articulos magicos
      </h1>

      {store.magicsItems.length > 0 ? (
        store.magicsItems.map((magicItem) => (
          <MagicItemCard key={magicItem.id} item={magicItem} />
        ))
      ) : (
        <h1 className="text-center mt-5">
          ***** No tienes ningun articulo creado *****
        </h1>
      )}
    </>
  );
};
