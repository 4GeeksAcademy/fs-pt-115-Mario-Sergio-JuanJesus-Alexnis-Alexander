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
                    <label htmlFor="School" className="form-label">
                        Spell School
                    </label>
                    <select
                        className="form-select"
                        id="School"
                        name="School"
                        required=""
                    >
                    <option value="">
                            Selecciona...
                        </option>
                        <option value="a">Turn</option>
                        <option value="b">Reaction</option>
                        <option value="c">Hour</option>
                    </select>
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
                        Casting Type
                    </label><br />
                    <select id="spellCast" className="form-select" name="spell_cast">
                        <option  value="">
                            Selecciona...
                        </option>
                        <option value="a">Turn</option>
                        <option value="b">Reaction</option>
                        <option value="c">Hour</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Reaction Description
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
                        <input type="checkbox" required="" className="m-2" value={0} />
                    </label>
                    <label htmlFor="" className="form-label">
                        S
                        <input type="checkbox" required="" className="m-2" value={1} />
                    </label>
                    <label htmlFor="" className="form-label">
                        M
                        <input type="checkbox" required="" className="m-2" value={2} />
                    </label>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Material Description
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
                    <select name="Type" id="Type" className="form-select">
                        <option >
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
                    <select name="time" id="time" className="form-select">
                        <option >
                            Options
                        </option>
                        <option value={1}>-</option>
                        <option value={2}>-</option>
                    </select>
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
                <div className="col-md-12 mb-3">
                    <label htmlFor="" className="form-label">
                        Description
                    </label>
                    <textarea
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Description"
                        name="Description"
                        required=""
                        row="3"
                    />
                </div>
            </form>
        </div>

    )
}