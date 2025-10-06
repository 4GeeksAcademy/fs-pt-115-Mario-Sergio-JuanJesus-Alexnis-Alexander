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
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginTop: '3rem',
            display: "inline-block",
            padding: "30px 50px",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            clipPath:
              "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
            position: "relative",
            border: "3px solid #d4a017",
          }}
        >
          <h1
            style={{
              color: "#dcbe73ff",
              fontWeight: "bold",
              fontSize: "36px",
              fontFamily: "Georgia, serif",
              letterSpacing: "2px",
              margin: "0",
              textShadow:
                "0 0 15px rgba(212, 160, 23, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)",
            }}
          >
            ITEM MAGIC LIST
          </h1>
        </div>
      </div>
      <div
        className="container mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 210px)",
          gap: "60px",
          justifyContent: "center",
          minHeight: "350px",
          marginBottom: "50px",
        }}
      >
        {store.magicsItems.length > 0 ? (
          store.magicsItems.map((magicItem) => (
            <MagicItemCard key={magicItem.id} item={magicItem} />
          ))
        ) : (
          <h1
            className="text-center text-dark mt-5"
            style={{ gridColumn: "1 / -1" }}
          >
            ***** You dont have any Items *****
          </h1>
        )}
      </div>
    </>
  );
};
