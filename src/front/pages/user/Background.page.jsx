import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { getAllBackgrounds } from "../../serviceApi/backgroundApi";
import { BackgroundCard } from "../../components/BackgroundCard";


export const BackgroundPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBackgroundApi = async () => {
    setLoading(true);
    const responseApi = await getAllBackgrounds();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "set_backgrounds",
      payload: responseApi.data,
    });
    setLoading(false);
  };
  useEffect(() => {
    getBackgroundApi();
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
        Aqui esta tu lista de background
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.backgrounds.length > 0 ? (
          store.backgrounds.map((background) => (
            <BackgroundCard key={background.background_id} item={background} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** No tienes ningun background creado *****
          </h1>
        )}
      </div>
    </>
  );
};
