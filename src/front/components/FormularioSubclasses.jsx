export const FormularioSubclasses = () => {
    return (
        <div className="container">
            <form className="row mt-5 border border-secondary-emphasis border-1">
                <div className="p-2">
                    <h5>FORMULARIO DE HOMEBREWS SUBCLASSES</h5>
                </div>
                
                <div className="col-md-3 mb-3">
                    <label htmlFor="homebrewName" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="homebrewName"
                        name="name"
                        required
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="homebrewVersion" className="form-label">
                        Version
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="homebrewVersion"
                        name="version"
                    />
                </div>
                
                <div className="p-2">
                    <h6>Descriptions</h6>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="shortDescription" className="form-label">
                        Short Description
                    </label>
                    <textarea
                        className="form-control"
                        id="shortDescription"
                        name="short_description"
                        rows="3"
                        required
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
                        rows="3"
                        required
                    />
                </div>
                
                <div className="p-2">
                    <h6>Spell Details</h6>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="spellcastingAbility" className="form-label">
                        Spellcasting Ability
                    </label>
                    <select id="spellcastingAbility" className="form-select" name="spellcasting_ability">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="strength">Strength</option>
                        <option value="dexterity">Dexterity</option>
                        <option value="constitution">Constitution</option>
                        <option value="intelligence">Intelligence</option>
                        <option value="wisdom">Wisdom</option>
                        <option value="charisma">Charisma</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="canCastSpells" className="form-label">
                        Can Cast Spells
                    </label>
                    <select id="canCastSpells" className="form-select" name="can_cast_spells">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="additionalSpellList" className="form-label">
                        Additional Spell List
                    </label>
                    <select id="additionalSpellList" className="form-select" name="additional_spell_list">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="list_a">Lista A</option>
                        <option value="list_b">Lista B</option>
                        <option value="list_c">Lista C</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="spellPrepareType" className="form-label">
                        Spell Prepare Type
                    </label>
                    <select id="spellPrepareType" className="form-select" name="spell_prepare_type">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="prepared">Prepared</option>
                        <option value="spontaneous">Spontaneous</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="knowsAllSpells" className="form-label">
                        Knows All Spells
                    </label>
                    <select id="knowsAllSpells" className="form-select" name="knows_all_spells">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="spellLearningStyle" className="form-label">
                        Spell Learning Style
                    </label>
                    <select id="spellLearningStyle" className="form-select" name="spell_learning_style">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="from_scrolls">From Scrolls</option>
                        <option value="through_meditation">Through Meditation</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="additionalSpecificSpells" className="form-label">
                        Additional Specific Spells
                    </label>
                    <select id="additionalSpecificSpells" className="form-select" name="additional_specific_spells">
                        <option selected disabled value="">
                            Selecciona...
                        </option>
                        <option value="spell_x">Spell X</option>
                        <option value="spell_y">Spell Y</option>
                    </select>
                </div>
                
                <div className="p-2">
                    <h6>Avatars</h6>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="avatar" className="form-label">
                        Avatar
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="avatar"
                        name="avatar"
                    />
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
            </form>
        </div>
    );
};