export const FormularioBackground = () => {
    return (
        <div className="container col-md-8 my-5 bg-light basic-form">
            <form className="row">
                <div className="p-2">
                    <h5>CREATE A NEW BACKGROUND</h5>
                </div>

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
                        Version
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
                        Introduction
                    </label>
                    <textarea
                        className="form-control"
                        id="backgroundIntroduction"
                        name="introduction"
                        rows="3"
                        required
                    />
                </div>
                
                <hr className="my-3" />
                <div className="p-2">
                    <h6>Skills & Abilities</h6>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="abilityScoresDescription" className="form-label">
                        Ability Scores Description
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
                        Feat Description
                    </label>
                    <textarea
                        className="form-control"
                        id="featDescription"
                        name="feat_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="skillProficienciesDescription" className="form-label">
                        Skill Proficiencies Description
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
                        Tool Proficiencies Description
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
                        Languages Description
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
                        Equipment Description
                    </label>
                    <textarea
                        className="form-control"
                        id="equipmentDescription"
                        name="equipment_description"
                        rows="3"
                    />
                </div>
                
                <hr className="my-3" />
                <div className="p-2">
                    <h6>Specifics & Traits</h6>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="tableName" className="form-label">
                        Background Specific Table Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tableName"
                        name="background_specific_table_name"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="tableDescription" className="form-label">
                        Background Specific Table Description
                    </label>
                    <textarea
                        className="form-control"
                        id="tableDescription"
                        name="background_specific_table_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="featureName" className="form-label">
                        Feature Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="featureName"
                        name="feature_name"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="featureDescription" className="form-label">
                        Feature Description
                    </label>
                    <textarea
                        className="form-control"
                        id="featureDescription"
                        name="feature_description"
                        rows="3"
                    />
                </div>
                
                <hr className="my-3" />
                <div className="p-2">
                    <h6>Variants & Other Info</h6>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="variantName" className="form-label">
                        Variant Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="variantName"
                        name="variant_name"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="variantDescription" className="form-label">
                        Variant Description
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
                        Variant Feature Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="variantFeatureName"
                        name="variant_feature_name"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="variantFeatureDescription" className="form-label">
                        Variant Feature Description
                    </label>
                    <textarea
                        className="form-control"
                        id="variantFeatureDescription"
                        name="variant_feature_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="suggestedCharacteristics" className="form-label">
                        Suggested Characteristics Description
                    </label>
                    <textarea
                        className="form-control"
                        id="suggestedCharacteristics"
                        name="suggested_characteristics_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="spellListDescription" className="form-label">
                        Spell List Description
                    </label>
                    <textarea
                        className="form-control"
                        id="spellListDescription"
                        name="spell_list_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="spellListExtendedDescription" className="form-label">
                        Spell List Extended Description
                    </label>
                    <textarea
                        className="form-control"
                        id="spellListExtendedDescription"
                        name="spell_list_extended_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="contactsDescription" className="form-label">
                        Contacts Description
                    </label>
                    <textarea
                        className="form-control"
                        id="contactsDescription"
                        name="contacts_description"
                        rows="3"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <label htmlFor="backgroundTags" className="form-label">
                        Background Tags
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="backgroundTags"
                        name="background_tags"
                    />
                </div>

                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary">Create Background</button>
                </div>
            </form>
        </div>
    );
};