export const FormularioSpell = () => {
    return (
        <div className="container col-md-8 my-5 basic-form">
            <form className="row ">
                <div className="p-2">
                    <h5 className="fw-bold">Formulario Homebrews Spells</h5>
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
                    <label htmlFor="School" className="form-label">
                        Spell School
                    </label>
                    <select
                        type="number"
                        placeholder=""
                        className="form-control"
                        id="School"
                        name="School"
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
                        Casting Time
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCasting"
                        name="inputCasting"
                        required=""
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Reaction Casting Time Description
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
                        Components
                    </label><br />
                    <label htmlFor="" className="form-label">
                        V
                    <input type="checkbox" required="" className="m-2" value={0}/>
                    </label>
                    <label htmlFor="" className="form-label">
                        S
                    <input type="checkbox" required="" className="m-2" value={1}/>
                    </label>
                    <label htmlFor="" className="form-label">
                        M
                    <input type="checkbox" required="" className="m-2" value={2}/>
                    </label>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Material Components Description
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
                        Spell Range Type
                    </label><br />
                    <select name="Type" id="Type" className="form-Type">
                        <option selected="" disabled="">
                            Options
                        </option>
                        <option value={1}>-</option>
                        <option value={2}>-</option>
                    </select>
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
                        Duration Type
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Duration"
                        name="Duration"
                        required=""
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Duration
                    </label><br />
                    <select name="time" id="time" className="form-time">
                        <option selected="" disabled="">
                            Options
                        </option>
                        <option value={1}>-</option>
                        <option value={2}>-</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Description"
                        name="Description"
                        required=""
                    />
                </div>
                
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        At Higher Levels Scaling
                    </label>
                    <input type="checkbox" required="" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Higher Level Scaling Type Select
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
                        Available For Classes
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Classes"
                        name="Classes"
                        required=""
                    />
                </div>
            </form>
        </div>

    )
}