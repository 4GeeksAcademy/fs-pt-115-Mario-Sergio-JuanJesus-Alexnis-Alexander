import { useState } from "react";
import "../styles/forms/backgroundForm.css"

export const FormularioBackground = () => {
    const [page, setPage] = useState(1)
    return (
        <div className="container col-md-5 my-5 basic-form position-relative">
            <h2 className="text-center fw-bold">CREATE A NEW BACKGROUND</h2>
            <form className="row fw-bold">
                {page === 1 &&
                    <>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="backgroundName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="backgroundName"
                                name="name"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="backgroundVersion" className="form-label">
                                Base Description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="backgroundVersion"
                                name="version"
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="backgroundIntroduction" className="form-label">
                                Habilities Description
                            </label>
                            <textarea
                                className="form-control"
                                id="backgroundIntroduction"
                                name="introduction"
                                rows="3"
                                required
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="backgroundIntroduction" className="form-label">
                                Feats Description
                            </label>
                            <textarea
                                className="form-control"
                                id="backgroundIntroduction"
                                name="introduction"
                                rows="3"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="abilityScoresDescription" className="form-label">
                                Skill Proficiencies Description
                            </label>
                            <textarea
                                className="form-control"
                                id="abilityScoresDescription"
                                name="ability_scores_description"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="featDescription" className="form-label">
                                Tool Proficiencies Description
                            </label>
                            <textarea
                                className="form-control"
                                id="featDescription"
                                name="feat_description"
                                rows="3"
                            />
                        </div>
                    </>
                }

                {
                    page === 2 &&
                    <>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="skillProficienciesDescription" className="form-label">
                                Languages Description
                            </label>
                            <textarea
                                className="form-control"
                                id="skillProficienciesDescription"
                                name="skill_proficiencies_description"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="toolProficienciesDescription" className="form-label">
                                Equipment Description
                            </label>
                            <textarea
                                className="form-control"
                                id="toolProficienciesDescription"
                                name="tool_proficiencies_description"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="languagesDescription" className="form-label">
                                Specific Table Name
                            </label>
                            <textarea
                                className="form-control"
                                id="languagesDescription"
                                name="languages_description"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="equipmentDescription" className="form-label">
                                Specific Table Desc
                            </label>
                            <textarea
                                className="form-control"
                                id="equipmentDescription"
                                name="equipment_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="backgroundIntroduction" className="form-label">
                                Feature
                            </label>
                            <textarea
                                className="form-control"
                                id="backgroundIntroduction"
                                name="introduction"
                                rows="3"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="tableName" className="form-label">
                                Feature Desc
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="tableName"
                                name="background_specific_table_name"
                                rows="3"

                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="tableDescription" className="form-label">
                                Variant
                            </label>
                            <textarea
                                className="form-control"
                                id="tableDescription"
                                name="background_specific_table_description"
                                rows="3"
                            />
                        </div>
                    </>
                }

                {
                    page === 3 &&
                    <>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="featureName" className="form-label">
                                Variant Desc
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="featureName"
                                name="feature_name"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="featureDescription" className="form-label">
                                Variant Feature
                            </label>
                            <textarea
                                className="form-control"
                                id="featureDescription"
                                name="feature_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="featureDescription" className="form-label">
                                Variant Feature Desc
                            </label>
                            <textarea
                                className="form-control"
                                id="featureDescription"
                                name="feature_description"
                                rows="3"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="variantName" className="form-label">
                                Suggested Characteristics
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="variantName"
                                name="variant_name"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="variantDescription" className="form-label">
                                Spell List Introduction
                            </label>
                            <textarea
                                className="form-control"
                                id="variantDescription"
                                name="variant_description"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="variantFeatureName" className="form-label">
                                Spell List Extended
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="variantFeatureName"
                                name="variant_feature_name"
                                rows="3"
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="variantFeatureDescription" className="form-label">
                                Contacts List
                            </label>
                            <textarea
                                className="form-control"
                                id="variantFeatureDescription"
                                name="variant_feature_description"
                                rows="3"
                            />
                        </div>
                    </>
                }

                <div className="number-page-background">
                    <button className={page === 1 && "active"} type="button" onClick={() => setPage(1)}>1</button>
                    <button className={page === 2 && "active"} type="button" onClick={() => setPage(2)}>2</button>
                    <button className={page === 3 && "active"} type="button" onClick={() => setPage(3)}>3</button>
                </div>

                <div className="button-create-background">
                    <button type="submit" className="btn btn-primary">Create Background</button>
                </div>

            </form>

        </div>
    );
};