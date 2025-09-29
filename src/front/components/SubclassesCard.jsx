import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteSubclasses } from "../serviceApi/subclassesApi";

export const SubclassesCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteSubclassesApi = await deleteSubclasses(id);
    if (deleteSubclassesApi.success) {
      dispatch({
        type: "deleteSubclasses",
        payload: id,
      });
    } else {
      setError(deleteSubclassesApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name: {item.name}</h5>
          <h5 className="card-title">Version: {item.version}</h5>
          <h5 className="card-title">Short Description: {item.short_description}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button className="btn btn-primary" disabled>Detalles</button>
            <button className="btn btn-primary" disabled>✏️</button>
            <button
              className="btn btn-primary"
              onClick={() => handleOnDelete(item.subclasses_id)}
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
