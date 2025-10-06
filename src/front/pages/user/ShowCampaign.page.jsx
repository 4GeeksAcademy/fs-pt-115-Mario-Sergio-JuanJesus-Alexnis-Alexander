import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { CampaignCard } from "../../components/CampaignCard";
import { getCampaigns } from "../../serviceApi/campaignApi";
import styles from "../../styles/page/showItems.module.css";

export const ShowCampaignPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCampaignApi = async () => {
    setLoading(true);
    const responseApi = await getCampaigns();
    if (!responseApi.success) {
      setError(responseApi.error || "Error al traer campañas");
      return;
    }
    dispatch({
      type: "showCampaign",
      payload: responseApi.data,
    });
    setLoading(false);
  };
  
  useEffect(() => {
    getCampaignApi();
  }, []);

  if (error) {
    return <div className="text-center fs-2 fw-bold">{error}</div>;
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
      <div style={{ textAlign: "center" }}>
            <div className={styles.titleContainer}>
                <h1 className={styles.titleText}>
                  YOUR CAMPAINGS
                </h1>
              </div>
          </div>
      <div className="container d-flex gap-4 justify-content-center mt-5">
        {store.campaign.length > 0 ? (
          store.campaign.map((campaign) => (
            <CampaignCard key={campaign.id} item={campaign} />
          ))
        ) : (
          <h1 className="text-center text-dark mt-5">
            ***** You don't have any campaign created *****
          </h1>
        )}
      </div>
    </>
  );
};
