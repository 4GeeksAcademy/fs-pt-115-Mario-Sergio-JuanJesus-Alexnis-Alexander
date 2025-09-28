import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteFeats } from "../serviceApi/featsApi";

export const FeatsCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteFeatsApi = await deleteFeats(id);
    if (deleteFeatsApi.success) {
      dispatch({
        type: "deleteFeats",
        payload: id,
      });
    } else {
      setError(deleteFeatsApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name: {item.name}</h5>
          <h5 className="card-title">Version: {item.version}</h5>
          <h5 className="card-title">Description: {item.description}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button className="btn btn-primary" disabled>Detalles</button>
            <button className="btn btn-primary" disabled>✏️</button>
            <button
              className="btn btn-primary"
              onClick={() => handleOnDelete(item.feats_id)}
            >
              ❌
            </button>
          </div>
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
