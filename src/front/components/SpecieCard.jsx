import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteSpecie } from "../serviceApi/specieApi";

export const SpecieCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteSpecieApi = await deleteSpecie(id);
    if (deleteSpecieApi.success) {
      dispatch({
        type: "deleteSpecie",
        payload: id,
      });
    } else {
      setError(deleteSpecieApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name: {item.name}</h5>
          <h5 className="card-title">Version: {item.version}</h5>
          <h5 className="card-title">Size: {item.size}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button className="btn btn-primary" disabled>Detalles</button>
            <button className="btn btn-primary" disabled>✏️</button>
            <button
              className="btn btn-primary"
              onClick={() => handleOnDelete(item.specie_id)}
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
