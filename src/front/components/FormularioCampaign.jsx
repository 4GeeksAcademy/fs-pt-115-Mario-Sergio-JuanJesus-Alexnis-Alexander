import { createCampaign } from "../serviceApi/campaignApi";
import { useEffect, useState } from "react"
import { createCharacter, getBackgrounds, getClasses, getRaces } from "../serviceApi/characterApi"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom";

export const FormularioCampaign = () => {
  const { store, dispatch } = useGlobalReducer()
  const [input, setInputs] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const formCampaing = { ...input, [name]: value };
    setInputs(formCampaing);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const dataCampaing = await createCampaign(input);

    if (!dataCampaing.success) {
      return setError(dataCampaing.error || "Creación fallida");
    } else {
      setInputs({});
      setError(null);
    }

    navigate("/user/campaigns");
  };

  return (
    <div className="container col-md-5 my-5 basic-form">
      <form onSubmit={handleOnSubmit} className="row g-4">
        <h1>Create your Campaings</h1>
        <div className="col-md-8">
          <label htmlFor="name" className="form-label">
            Name <span className="text-danger fs-5">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="name"
            placeholder="Character name"
            required
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="name" className="form-label">
            Description <span className="text-danger fs-5">*</span>
          </label>
          <textarea
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="description"
            placeholder="Campaing description"
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="name" className="form-label">
            Settings <span className="text-danger fs-5">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            name="settings"
            className="form-control"
            placeholder="Campaign Setting"
          ></input>
        </div>
        <div className="col-md-8">
          <label htmlFor="name" className="form-label">
            Level <span className="text-danger fs-5">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="number"
            name="level"
            className="form-control"
            required
          ></input>
        </div>
        <div className="col-md-8">
          <label htmlFor="name" className="form-label">
            Players <span className="text-danger fs-5">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="number"
            name="players"
            className="form-control"
            required
          ></input>
        </div>
        <div className="col-md-8">
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary m-4">
            Submit new Campaing
          </button>
        </div>
      </form>
    </div>
  )
}
