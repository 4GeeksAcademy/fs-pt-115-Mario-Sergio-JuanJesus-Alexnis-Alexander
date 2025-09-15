import { deleteMagicItem } from "../serviceApi/magicItem.api";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const MagicItemCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleDelete = async (id) => {
    setError(false);
    const delteItemApi = await deleteMagicItem(id);
    if (delteItemApi.success) {
      dispatch({
        type: "deleteMagicItem",
        payload: id,
      });
    } else {
      setError(delteItemApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Nombre: {item.name}</h5>
          <h5 className="card-title">Tipo: {item.base_item_type}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <button className="btn btn-primary" disabled>Detalles</button>
            <button
              className="btn btn-primary"
              onClick={() => handleDelete(item.id)}
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
