export const FormularioSpecie = () => {
    return (
        <div className="container col-md-5 my-5 basic-form">
            <h2 className="text-center fw-bold">CREATE A SPECIES</h2>
            <form className="row fw-bold">

                <div className="col-md-12 mb-3">
                    <label htmlFor="shortDescription" className="form-label">
                        Short Description
                    </label>
                    <textarea
                        className="form-control"
                        id="shortDescription"
                        name="short_description"
                        rows="3"
                    />
                </div>

                <div className="col-md-12 mb-3">
                    <label htmlFor="speciesGroup" className="form-label">
                        Species Group
                    </label>
                    <select id="speciesGroup" className="form-select" name="species_group">
                        <option selected disabled value="">-</option>
                        <option value="a">Group A</option>
                        <option value="b">Group B</option>
                        <option value="c">Group C</option>
                    </select>
                </div>

                <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="2"
                        required
                    />
                </div>

                <div className="col-md-12 mb-3">
                    <label htmlFor="traitIntroduction" className="form-label">
                        Trait Description
                    </label>
                    <textarea
                        className="form-control"
                        id="traitIntroduction"
                        name="species_trait_introduction"
                        rows="2"
                        required
                    />
                </div>

                <div className="col-md-12 mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="hideTraitsHeading"
                            name="hide_traits_heading"
                        />
                        <label className="form-check-label" htmlFor="hideTraitsHeading">
                            Hide Traits Heading
                        </label>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="portraitAvatar" className="form-label">
                        Avatar
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="portraitAvatar"
                        name="portrait_avatar"
                    />
                </div>

                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary">Create Specie</button>
                </div>
            </form>
        </div>
    );
};