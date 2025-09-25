export const FormularioSpell = () => {
    return (
        <div className="container col-md-5 my-5 basic-form">
            <h2 className="text-center fw-bold">Formulario Homebrews Spells</h2>
            <form className="row fw-bold">
                <div className="p-2">
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="inputCard" className="form-label">
                        Spell Name<span className="text-danger">*</span>
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
                        Spell Level<span className="text-danger">*</span>
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
                        Spell School<span className="text-danger">*</span>
                    </label><br />
                    <select name="time" id="time" className="form-select">
                        <option>-</option>
                        <option value={1}>Abjuration</option>
                        <option value={2}>Conjuration</option>
                        <option value={3}>Divination</option>
                        <option value={4}>Enchantment</option>
                        <option value={5}>Evocation</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Casting Time<span className="text-danger">*</span>
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
                        Casting Time Select
                    </label><br />
                    <select name="casting" id="casting" className="form-select">
                        <option>-</option>
                        <option value={1}>Action</option>
                        <option value={2}>Bonus Action</option>
                        <option value={3}>No Action</option>
                        <option value={4}>Reaction</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Reaction Casting Time<span className="text-danger">*</span>
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
                    </label>
                    <input type="checkbox" required="" />
                    <input type="checkbox" required="" />
                    <input type="checkbox" required="" />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Material Components<span className="text-danger">*</span>
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
                        Spell Range<span className="text-danger">*</span>
                    </label><br />
                    <select name="range" id="range" className="form-select">
                        <option>-</option>
                        <option value={1}>Self</option>
                        <option value={2}>Touch</option>
                        <option value={3}>Ranged</option>
                        <option value={4}>Sight</option>
                        <option value={5}>Unlimited</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Range Distance<span className="text-danger">*</span>
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
                        Duration Type<span className="text-danger">*</span>
                    </label><br />
                    <select name="time" id="time" className="form-select">
                        <option>-</option>
                        <option value={1}>Concentration</option>
                        <option value={2}>Instantaneous</option>
                        <option value={3}>Special</option>
                        <option value={4}>Time</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Duration<span className="text-danger">*</span>
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
                        Duration Select<span className="text-danger">*</span>
                    </label><br />
                    <select name="duration" id="duration" className="form-select">
                        <option>-</option>
                        <option value={1}>Round</option>
                        <option value={2}>Minute</option>
                        <option value={2}>Hour</option>
                        <option value={2}>Day</option>
                    </select>
                </div>

                <div className="col-md-8 mb-3">
                    <label htmlFor="" className="form-label">
                        Description<span className="text-danger">*</span>
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
                        Ritual Spell
                    </label>
                    <input type="checkbox" required="" />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        At Higher Levels Scaling
                    </label>
                    <input type="checkbox" required="" />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Higher Level Scaling
                    </label><br />
                    <select name="higher" id="higher" className="form-select">
                        <option>-</option>
                        <option value={1}>Character Level</option>
                        <option value={2}>Spell Scale</option>
                        <option value={2}>Spell Level</option>
                    </select>
                </div>

                <div className="col-md-8 mb-3">
                    <label htmlFor="" className="form-label">
                        Available For Classes<span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        id="Available"
                        name="Available"
                        required=""
                    />
                </div>

                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary">Create Spell</button>
                </div>
            </form>
        </div>

    )
}