import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { CampaignCard } from "../../components/CampaignCard";

export const ShowCampaignPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCampaignApi= async () => {
    setLoading(true);
    const responseApi = await getAllCampaigns();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer articulos magicos");
      return;
    }
    dispatch({
      type: "showCampaign",
      payload: responseApi.data,
    });
    setLoading(false);
  };
  console.log("***DATOS PARA EXTRAER***");
  console.log(store.campaigns);
  useEffect(() => {
    getCampaignApi();
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
        Aqui esta tu lista de campaña
      </h1>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.campaigns.length > 0 ? (
          store.campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} item={campaign} />
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
