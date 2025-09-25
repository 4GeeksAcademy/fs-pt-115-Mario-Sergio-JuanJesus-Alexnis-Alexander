import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom";

export const FormularioMonster = () => {
    const { store, dispatch } = useGlobalReducer()
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

        const dataMonster = await createCharacter(input);

        if (!dataMonster.success) {
            return setError(dataMonster.error || "Creación fallida");
        } else {
            setInputs({});
            setError(null);
        }

        navigate("/user/monsters");
    };
    useEffect(() => {

    }, [])

    return (
        <div className="container col-md-5 my-5 basic-form">
            <form onSubmit={handleOnSubmit} className="row g-4">
                <h1>Create your Monster</h1>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Name <span className="text-danger fs-5">*</span>
                    </label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Introduce el nombre del monstruo"
                        required
                    />
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        type <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="class_name"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        <option value="">aberration</option>
                        <option value="">dragon</option>
                        <option value="">elemental</option>
                        
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        subtype <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="race_name"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        <option value="">aquatic</option>
                        <option value="">celestial</option>
                        <option value="">construct</option>
                        <option value="">elemental</option>
                        <option value="">fey</option>
                        <option value="">fiend</option>
                        <option value="">giant</option>
                        <option value="">humanoid</option>
                        <option value="">monstrosity</option>
                        <option value="">ooze</option>
                        <option value="">plant</option>
                        <option value="">undead</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Size <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="background_name"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        <option value="">Tiny</option>
                        <option value="">Small</option>
                        <option value="">Medium</option>
                        <option value="">Large</option>
                        <option value="">Huge</option>
                        <option value="">Gargantuan</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Challenge <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        onChange={handleOnChange}
                        name="background_name"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        <option value="">0</option>
                        <option value="">1/8</option>
                        <option value="">1/4</option>
                        <option value="">1/2</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                        <option value="">13</option>
                        <option value="">14</option>
                        <option value="">15</option>
                        <option value="">16</option>
                        <option value="">17</option>
                        <option value="">18</option>
                        <option value="">19</option>
                        <option value="">20</option>
                        <option value="">21</option>
                        <option value="">22</option>
                        <option value="">23</option>
                        <option value="">24</option>
                        <option value="">25</option>
                        <option value="">26</option>
                        <option value="">27</option>
                        <option value="">28</option>
                        <option value="">29</option>
                        <option value="">30</option>
                    </select>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary m-4">
                        Submit new Monster
                    </button>
                </div>
                
            </form>
        </div>
    )
}