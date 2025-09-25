import { useState } from "react";
import "../styles/forms/subclassesForms.css"

export const FormularioSubclasses = () => {
  const [page, setPage] = useState(1)
  return (
    <div className="container col-md-5 my-5 basic-form">
      <h2 className="text-center mb-4 fw-bold">Create a Subclass</h2>
      <form className="row g-3 fw-bold">
        {page === 1 &&
          <>
            <div className="col-md-6">
              <label htmlFor="subclassName" className="form-label">Name<span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="subclassName" name="name" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="subclassVersion" className="form-label">Version</label>
              <input type="text" className="form-control" id="subclassVersion" name="version" />
            </div>

            <div className="col-md-6">
              <label htmlFor="shortDescription" className="form-label">Short Description<span className="text-danger">*</span></label>
              <textarea className="form-control" id="shortDescription" rows="3" name="short_description" required></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
              <textarea className="form-control" id="description" rows="3" name="description" required></textarea>
            </div>

            <div className="col-md-4">
              <label htmlFor="spellcastingAbility" className="form-label">Spellcasting Ability</label>
              <select id="spellcastingAbility" className="form-select" name="spellcasting_ability">
                <option selected disabled value="">-</option>
                <option value="strength">Strength</option>
                <option value="dexterity">Dexterity</option>
                <option value="constitution">Constitution</option>
                <option value="intelligence">Intelligence</option>
                <option value="wisdom">Wisdom</option>
                <option value="charisma">Charisma</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="canCastSpells" className="form-label">Can Cast Spells</label>
              <select id="canCastSpells" className="form-select" name="can_cast_spells">
                <option selected disabled value="">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="additionalSpellList" className="form-label">Additional Spell List</label>
              <select id="additionalSpellList" className="form-select" name="additional_spell_list">
                <option selected disabled value="">-</option>
                <option>List A</option>
                <option>List B</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="spellPrepareType" className="form-label">Spell Prepare Type</label>
              <select id="spellPrepareType" className="form-select" name="spell_prepare_type">
                <option selected disabled value="">-</option>
                <option>Prepared</option>
                <option>Spontaneous</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="knowsAllSpells" className="form-label">Knows All Spells</label>
              <select id="knowsAllSpells" className="form-select" name="knows_all_spells">
                <option selected disabled value="">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="spellLearningStyle" className="form-label">Spell Learning Style</label>
              <select id="spellLearningStyle" className="form-select" name="spell_learning_style">
                <option selected disabled value="">-</option>
                <option>Learned</option>
                <option>Prepared</option>
              </select>
            </div>
          </>
        }

        {page === 2 &&
          <>
            <div className="col-md-12">
              <label htmlFor="additionalSpecificSpells" className="form-label">Additional Specific Spells</label>
              <select id="additionalSpecificSpells" className="form-select" name="additional_specific_spells">
                <option selected disabled value="">Select</option>
                <option>Spell Medium</option>
                <option>Spell Advanced</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="avatar" className="form-label">Avatar<span className="text-danger">*</span></label>
              <input className="form-control" type="file" id="avatar" name="avatar" />
            </div>

            <div className="col-md-6">
              <label htmlFor="largeAvatar" className="form-label">Large Avatar</label>
              <input className="form-control" type="file" id="largeAvatar" name="large_avatar" />
            </div>
          </>
        }



      </form>

      <div className="number-page-subclasses">
        <button className={page === 1 && "active"} type="button" onClick={() => setPage(1)}>1</button>
        <button className={page === 2 && "active"} type="button" onClick={() => setPage(2)}>2</button>
      </div>

      <div className="button-create-subclasses">
        <button type="submit" className="btn btn-primary">Create Subclasses</button>
      </div>
    </div>
  );
};