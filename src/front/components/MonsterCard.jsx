import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteMonster } from "../serviceApi/monsterApi";

export const MonsterCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteMonsterApi = await deleteMonster(id);
    if (deleteMonsterApi.success) {
      dispatch({
        type: "deleteMonster",
        payload: id,
      });
    } else {
      setError(deleteMonsterApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Nombre: {item.name}</h5>
          <h5 className="card-title">type: {item.type}</h5>
          <h5 className="card-title">subtype: {item.subtype}</h5>
          <h5 className="card-title">size: {item.size}</h5>
          <h5 className="card-title">challenge: {item.challenge}</h5>

          <div className="d-flex justify-content-start gap-2 mt-3">
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
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
