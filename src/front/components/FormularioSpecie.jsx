export const FormularioSpecie = () => {
    return (
        <div className="container col-md-5 my-5 basic-form">
            <h2 className="text-center fw-bold">CREATE A SPECIES</h2>
            <form className="row fw-bold">
                <div className="p-2">
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="speciesName" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speciesName"
                        name="name"
                        required
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="speciesVersion" className="form-label">
                        Version
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speciesVersion"
                        name="version"
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="speciesSize" className="form-label">
                        Size
                    </label>
                    <select id="speciesSize" className="form-select" name="size" required>
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="pequeño">Pequeño</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                        <option value="enorme">Enorme</option>
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="speciesGroup" className="form-label">
                        Species Group
                    </label>
                    <select id="speciesGroup" className="form-select" name="species_group">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="a">Grupo A</option>
                        <option value="b">Grupo B</option>
                        <option value="c">Grupo C</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speedWalking" className="form-label">
                        Speed Walking
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speedWalking"
                        name="speed_walking"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speedBurrowing" className="form-label">
                        Speed Burrowing
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speedBurrowing"
                        name="speed_burrowing"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speedClimbing" className="form-label">
                        Speed Climbing
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speedClimbing"
                        name="speed_climbing"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speedFlying" className="form-label">
                        Speed Flying
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speedFlying"
                        name="speed_flying"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speedSwimming" className="form-label">
                        Speed Swimming
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speedSwimming"
                        name="speed_swimming"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="shortDescription" className="form-label">
                        Short Description
                    </label>
                    <textarea
                        className="form-control"
                        id="shortDescription"
                        name="short_description"
                        rows="2"
                    />
                </div>

                <div className="col-md-6 mb-3">
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

                <div className="col-md-12 mb-3">
                    <label htmlFor="traitIntroduction" className="form-label">
                        Species Trait Introduction
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
                            id="hasOptions"
                            name="will_have_species_options"
                        />
                        <label className="form-check-label" htmlFor="hasOptions">
                            Will have Species Options?
                        </label>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="largeAvatar" className="form-label">
                        Large Avatar
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="largeAvatar"
                        name="large_avatar"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="portraitAvatar" className="form-label">
                        Portrait Avatar
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