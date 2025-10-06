
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteCampaign } from "../serviceApi/campaignApi";


export const CampaignCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteCampaignApi = await deleteCampaign(id);
    if (deleteCampaign.success) {
      dispatch({
        type: "deleteCampaign",
        payload: id,
      });
    } else {
      setError(deleteCampaignApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Nombre: {item.name}</h5>
          <h5 className="card-title">Level: {item.level}</h5>
          <h5 className="card-title">Players: {item.players}</h5>
          <h5 className="card-title">Description: {item.description}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={() => handleOnDelete(item.id)}
            >
              ❌
            </button>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
