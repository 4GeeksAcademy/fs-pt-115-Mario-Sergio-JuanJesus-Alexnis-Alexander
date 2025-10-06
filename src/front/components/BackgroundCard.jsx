import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteBackground } from "../serviceApi/backgroundApi";

export const BackgroundCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteBackgroundApi = await deleteBackground(id);
    if (deleteBackgroundApi.success) {
      dispatch({
        type: "deleteBackground",
        payload: id,
      });
    } else {
      setError(deleteBackgroundApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name: {item.name}</h5>
          <h5 className="card-title">Version: {item.version}</h5>
          <h5 className="card-title">Introduction: {item.introduction}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={() => handleOnDelete(item.background_id)}
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
