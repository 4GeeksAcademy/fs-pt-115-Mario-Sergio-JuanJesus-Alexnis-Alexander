import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { deleteCharacter } from "../serviceApi/characterApi";

export const CharacterCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);

  const handleOnDelete = async (id) => {
    setError(false);
    const deleteCharacterApi = await deleteCharacter(id);
    if (deleteCharacterApi.success) {
      dispatch({
        type: "deleteCharacter",
        payload: id,
      });
    } else {
      setError(deleteCharacterApi.error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Nombre: {item.name}</h5>
          <h5 className="card-title">Class: {item.class_name}</h5>
          <h5 className="card-title">Race: {item.race_name}</h5>
          <h5 className="card-title">Bacground: {item.background_name}</h5>

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
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
