import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewFeats } from "../serviceApi/featsApi";

export const FormularioFeats = () => {
  const [page, setPage] = useState(1)

  const [input, setInputs] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, cheked, type } = e.target;

    const inputValue = type === "checkbox" ? cheked : value;

    setInputs({ ...input, [name]: inputValue });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dataFeats = await createNewFeats(input);
    if (!dataFeats.success) {
      return setError(dataFeats?.error || "Creación fallida");
    } else {
      setInputs({});
      setError(null);
    }
    navigate("/user/feats");
  };

  return (
    <div className="container col-md-5 my-5 basic-form">
      <h2 className="text-center fw-bold">Create a Feats</h2>
      <form className="row g-3 fw-bold" onSubmit={handleOnSubmit}>

        <div className="col-md-6">
          <label htmlFor="Name" className="form-label">
            Name<span className="text-danger">*</span>
          </label>
          <input 
          onChange={handleOnChange}
          type="text" 
          className="form-control" 
          id="Name" 
          name="name" 
          required />
        </div>

        <div className="col-md-6">
          <label htmlFor="Version" className="form-label">Version</label>
          <input 
          onChange={handleOnChange} 
          type="text" 
          className="form-control" 
          id="Version" 
          name="version" />
        </div>

        <div className="col-12 mt-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
          onChange={handleOnChange} 
          className="form-control" 
          id="description" 
          rows="5" 
          name="description"
          ></textarea>
        </div>

        <div className="col-12 mt-3">
          <label htmlFor="snippet" className="form-label">Snippet</label>
          <textarea 
          onChange={handleOnChange} 
          className="form-control" 
          id="snippet" 
          rows="3" 
          name="snippet"
          ></textarea>
        </div>

        <div className="col-md-6 mt-3">
          <label htmlFor="featTags" className="form-label">Feat Tags</label>
          <select onChange={handleOnChange} id="featTags" className="form-select" name="feat_tags">
            <option value="">---</option>
            <option value={"Combat"}>Combat</option>
            <option value={"Magic"}>Magic</option>
            <option value={"Ability"}>Ability</option>
            <option value={"General"}>General</option>
          </select>
        </div>

        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary">Create Feats</button>
        </div>
      </form>
    </div>
  );
};