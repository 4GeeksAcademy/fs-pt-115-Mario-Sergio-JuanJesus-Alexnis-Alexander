import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createMonster } from "../serviceApi/monsterApi";

export const FormularioMonster = () => {
    const [input, setInputs] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const formMonster = { ...input, [name]: value };
        setInputs(formMonster);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Validación extra de campos requeridos
        const requiredFields = ["name", "type", "size", "challenge"];
        const missingFields = requiredFields.filter(
            field => !input[field] || input[field].trim() === ""
        );
        if (missingFields.length > 0) {
            setError(`Faltan campos obligatorios: ${missingFields.join(", ")}`);
            return;
        }

        const dataMonster = await createMonster(input);

        if (!dataMonster.success) {
            return setError(dataMonster.error || "Creación fallida");
        } else {
            setInputs({});
            setError(null);
        }

        navigate("/user/monster");
    };

    return (
        <div className="container col-md-5 my-5 basic-form position-relative">
            <form onSubmit={handleOnSubmit} className="row g-4 row fw-bold">
                <h2 className="text-center fw-bold">Create Monster</h2>
                
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
                        type <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="type"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        <option value="aquatic">aquatic</option>
                        <option value="celestial">celestial</option>
                        <option value="construct">construct</option>
                        <option value="elemental">elemental</option>
                        <option value="fey">fey</option>
                        <option value="fiend">fiend</option>
                        <option value="giant">giant</option>
                        <option value="humanoid">humanoid</option>
                        <option value="monstrosity">monstrosity</option>
                        <option value="ooze">ooze</option>
                        <option value="plant">plant</option>
                        <option value="undead">undead</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        subtype <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="subtype"
                        className="form-select"
                        required
                    >
                        <option value="none">-</option>
                        <option value="unknown">unknown</option>
                        <option value="aquatic">aquatic</option>
                        <option value="celestial">celestial</option>
                        <option value="construct">construct</option>
                        <option value="elemental">elemental</option>
                        <option value="fey">fey</option>
                        <option value="fiend">fiend</option>
                        <option value="giant">giant</option>
                        <option value="humanoid">humanoid</option>
                        <option value="monstrosity">monstrosity</option>
                        <option value="ooze">ooze</option>
                        <option value="plant">plant</option>
                        <option value="undead">undead</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Size <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="size"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        <option value="Tiny">Tiny</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Huge">Huge</option>
                        <option value="Gargantuan">Gargantuan</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Challenge <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="challenge"
                        className="form-select"
                        required
                    >
                        <option value="">-</option>
                        <option value="0">0</option>
                        <option value="1/8">1/8</option>
                        <option value="1/4">1/4</option>
                        <option value="1/2">1/2</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary m-4">
                        Create Monster
                    </button>
                </div>

            </form>
        </div>
    )
}