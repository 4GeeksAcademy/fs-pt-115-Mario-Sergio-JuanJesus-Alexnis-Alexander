import { useState } from "react";
import "../styles/forms/backgroundForm.css"

export const FormularioBackground = () => {
    const [page, setPage] = useState(1)

    return (
        <div className="container col-md-5 my-5 basic-form position-relative">
            <h2 className="text-center fw-bold">Create Background</h2>
            <form className="row fw-bold">

                {page === 1 &&
                    <>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">
                                Name<span className="text-danger fs-5">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="namee"
                                name="name"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="version" className="form-label">
                                Version<span className="text-danger fs-5">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="version"
                                name="version"
                                required=""
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="introduction" className="form-label">
                                Introduction<span className="text-danger fs-5">*</span>
                            </label>
                            <textarea
                                className="form-control"
                                id="introduction"
                                name="introduction"
                                rows="3"
                                required=""
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="abilities_score_descriptio" className="form-label">
                                Ability Scores Description
                            </label>
                            <textarea
                                className="form-control"
                                id="abilities_score_descriptio"
                                name="abilities_score_descriptio"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="feats_description" className="form-label">
                                Feat Description
                            </label>
                            <textarea
                                className="form-control"
                                id="feats_description"
                                name="feats_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="skill_proficiencies_description" className="form-label">
                                Skill Proficiencies Description
                            </label>
                            <textarea
                                className="form-control"
                                id="skill_proficiencies_description"
                                name="skill_proficiencies_descriptionn"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="tool_proficiencies_description" className="form-label">
                                Tool Proficiencies Description
                            </label>
                            <textarea
                                className="form-control"
                                id="tool_proficiencies_descriptionn"
                                name="tool_proficiencies_description"
                                rows="3"
                            />
                        </div>
                    </>
                }

                {page === 2 &&
                    <>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="languages_description" className="form-label">
                                Languages Description
                            </label>
                            <textarea
                                className="form-control"
                                id="languages_description"
                                name="languages_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="equipment_description" className="form-label">
                                Equipment Description
                            </label>
                            <textarea
                                className="form-control"
                                id="equipment_description"
                                name="equipment_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="specific_table_name" className="form-label">
                                Background Specific Table Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="specific_table_name"
                                name="specific_table_name"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="specific_tabla_desc" className="form-label">
                                Background Specific Table Description
                            </label>
                            <textarea
                                className="form-control"
                                id="specific_tabla_desc"
                                name="specific_tabla_desc"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="feature" className="form-label">
                                Feature Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="feature"
                                name="feature"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="feature_desc" className="form-label">
                                Feature Description
                            </label>
                            <textarea
                                className="form-control"
                                id="feature_desc"
                                name="feature_desc"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="variant" className="form-label">
                                Variant Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="variant"
                                name="variant"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="variant_desc" className="form-label">
                                Variant Description
                            </label>
                            <textarea
                                className="form-control"
                                id="variant_desc"
                                name="variant_desc"
                                rows="3"
                            />
                        </div>
                    </>
                }

                {page === 3 &&
                    <>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="variant_feature" className="form-label">
                                Variant Feature Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="variant_feature"
                                name="variant_feature"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="variant_feature_desc" className="form-label">
                                Variant Feature Description
                            </label>
                            <textarea
                                className="form-control"
                                id="variant_feature_desc"
                                name="variant_feature_desc"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="suggested_characteristics" className="form-label">
                                Suggested Characteristics Description
                            </label>
                            <textarea
                                className="form-control"
                                id="suggested_characteristics"
                                name="suggested_characteristics"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="spell_list_desc" className="form-label">
                                Spell List Description
                            </label>
                            <textarea
                                className="form-control"
                                id="spell_list_desc"
                                name="spell_list_desc"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="spell_list_extended" className="form-label">
                                Spell List Extended Description
                            </label>
                            <textarea
                                className="form-control"
                                id="spell_list_extended"
                                name="spell_list_extended"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="contacts_list" className="form-label">
                                Contacts Description
                            </label>
                            <textarea
                                className="form-control"
                                id="contacts_list"
                                name="contacts_list"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="background_tags" className="form-label">
                                Background Tags
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="background_tags"
                                name="background_tags"
                            />
                        </div>
                    </>
                    }

                <div className="number-page-background">
                    <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
                    <span>{page} / 2</span>
                    <button type="button" disabled={page === 2} onClick={() => setPage((p) => Math.min(p + 1, 2))}>prev</button>
                    <button type="button" disabled={page === 3} onClick={() => setPage((p) => Math.min(p + 1, 3))}>next</button>
                </div>


                {
                    page === 3 &&
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-primary">Crear Background</button>
                    </div>
                }
            </form>

        </div>
    );
};