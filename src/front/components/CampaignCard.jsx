
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const CampaignCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteCampaign = await deleteCampaign(id);
    if (deleteCampaign.success) {
      dispatch({
        type: "deleteCampaign",
        payload: id,
      });
    } else {
      setError(deleteCampaign.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Nombre: {item.name}</h5>
          <h5 className="card-title">Tipo: {item.level}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button className="btn btn-primary" disabled>Detalles</button>
            <button className="btn btn-primary" disabled>✏️</button>
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
