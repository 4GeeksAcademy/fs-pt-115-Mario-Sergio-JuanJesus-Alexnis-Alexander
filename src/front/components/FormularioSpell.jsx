export const FormularioSpell = () => {
    return (
        <div className="container col-md-5 my-5 basic-form">
            <h2 className="text-center fw-bold">Formulario Homebrews Spells</h2>
            <form className="row fw-bold">
                <div className="p-2">
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="inputCard" className="form-label">
                        Spell Name
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="inputCard"
                        name="inputCard"
                        required=""
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="inputlevel" className="form-label">
                        Spell Level
                    </label>
                    <input
                        type="number"
                        placeholder=""
                        className="form-control"
                        id="level"
                        name="inputlevel"
                        required=""
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Casting Time
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTime"
                        name="inputTime"
                        required=""
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Reaction Condition
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Reaction"
                        name="Reaction"
                        required=""
                    />
                </div>
               
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Components Material
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Components"
                        name="Components"
                        required=""
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Range Distance
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Range"
                        name="Range"
                        required=""
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Duration
                    </label><br />
                    <select name="time" id="time" className="form-select">
                        <option>-</option>
                        <option value={1}>Concentration</option>
                        <option value={2}>Instantaneous</option>
                        <option value={2}>Special</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Is Ritual
                    </label>
                    <input type="checkbox" required="" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Has Scaling
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Higher"
                        name="Higher"
                        required=""
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Scaling Typr
                    </label><br />
                    <select name="time" id="time" className="form-select">
                        <option>-</option>
                        <option value={1}>Spell Level</option>
                        <option value={2}>Spell Scale</option>
                    </select>
                </div>

                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary">Create Spell</button>
                </div>
            </form>
        </div>

    )
}