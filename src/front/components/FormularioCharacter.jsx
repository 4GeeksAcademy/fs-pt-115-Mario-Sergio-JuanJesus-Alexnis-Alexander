import { useEffect, useState } from "react"
import { createCharacter, getBackgrounds, getClasses, getRaces } from "../serviceApi/characterApi"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom";

export const FormularioCharacter = () => {
    const { store, dispatch } = useGlobalReducer()
    const [input, setInputs] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const formCharacter = { ...input, [name]: value };
        setInputs(formCharacter);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const dataCharacter = await createCharacter(input);

        if (!dataCharacter.success) {
            return setError(dataCharacter.error || "Creación fallida");
        } else {
            setInputs({});
            setError(null);
        }

        navigate("/user/characters");
    };
    useEffect(() => {
        getClasses(dispatch)
        getRaces(dispatch)
        getBackgrounds(dispatch)

    }, [])

    return (
        <div className="container col-md-5 my-5 basic-form position-relative">
            <form onSubmit={handleOnSubmit} className="row g-4 row fw-bold">
                <h2 className="text-center fw-bold">Create Character</h2>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Name <span className="text-danger fs-5">*</span>
                    </label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder=""
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Class <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="class_name"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        {store.classes.map((element, index) => (
                            <option key={index} value={element.name}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Race <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="race_name"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        {store.races.map((element, index) => (
                            <option key={index} value={element.name}>{element.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Background <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="background_name"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        {store.backgrounds.map((element, index) => (
                            <option key={index} value={element.name}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary m-4">
                        Create Character
                    </button>
                </div>
            </form>
        </div>
    )
}