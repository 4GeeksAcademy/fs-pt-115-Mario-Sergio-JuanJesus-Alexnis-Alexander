import { useEffect, useState } from "react";
import { MagicItemCard } from "../../components/MagicItemCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllMagicItems } from "../../serviceApi/magicItem.api";

export const ShowMagicsItemsPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 

  const getMagicsApi = async () => {
    setLoading(true);
    const responseApi = await getAllMagicItems();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "showMagicItem",
      payload: responseApi.data,
    });
    setLoading(false);
  };
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.magicsItems);
  useEffect(() => {
    getMagicsApi();
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
      <h1 className="text-center mt-5">
        Item Magic list:
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.magicsItems.length > 0 ? (
          store.magicsItems.map((magicItem) => (
            <MagicItemCard key={magicItem.id} item={magicItem} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun articulo creado *****
          </h1>
        )}
      </div>
    </>
  );
};
