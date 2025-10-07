import { useState } from "react";
import "../styles/forms/subclassesForms.css"
import { useNavigate } from "react-router-dom";
import { createNewSubclasses } from "../serviceApi/subclassesApi";

export const FormularioSubclasses = () => {
  const [page, setPage] = useState(1)

  const [input, setInputs] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setInputs({ ...input, [name]: inputValue });

  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log('hola');

    const dataSubclasses = await createNewSubclasses(input);
    if (!dataSubclasses.success) {
      return setError(dataSubclasses?.error || "Creación fallida");
    }
    setInputs({});
    setError(null);

    navigate("/user/subclasses");
  };

  return (
    <div className="container col-md-5 my-5 basic-form">
      <h2 className="text-center mb-4 fw-bold">Create Class</h2>
      <form className="row g-3 fw-bold" onSubmit={handleOnSubmit}>
        {page === 1 &&
          <>
            <div className="col-md-6">
              <label htmlFor="subclassName" className="form-label">Name<span className="text-danger">*</span></label>
              <input onChange={handleOnChange} type="text" className="form-control" id="subclassName" name="name" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="subclassVersion" className="form-label">Version</label>
              <input onChange={handleOnChange} type="text" className="form-control" id="subclassVersion" name="version" />
            </div>

            <div className="col-md-6">
              <label htmlFor="shortDescription" className="form-label">Short Description<span className="text-danger">*</span></label>
              <textarea onChange={handleOnChange} className="form-control" id="shortDescription" rows="3" name="short_description" required></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
              <textarea onChange={handleOnChange} className="form-control" id="description" rows="3" name="description" required></textarea>
            </div>

            <div className="col-md-4">
              <label htmlFor="spellcastingAbility" className="form-label">Spell Ability</label>
              <select onChange={handleOnChange} id="spellcastingAbility" className="form-select" name="spellcasting_ability">
                <option value="">-</option>
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
              <select onChange={handleOnChange} id="canCastSpells" className="form-select" name="can_cast_spells">
                <option value="">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="additionalSpellList" className="form-label">Additional Spell List</label>
              <select onChange={handleOnChange} id="additionalSpellList" className="form-select" name="additional_spell_list">
                <option value="">-</option>
                <option value={"List A"}>List A</option>
                <option value={"List B"}>List B</option>
              </select>
            </div>
          </>
        }

        {page === 2 &&
          <>

            <div className="col-md-4">
              <label htmlFor="spellPrepareType" className="form-label">Spell Type</label> 
              <select onChange={handleOnChange} id="spellPrepareType" className="form-select" name="spell_prepare_type">
                <option value="">-</option>
                <option value={"Prepared"}>Prepared</option>
                <option value={"Spontaneous"}>Spontaneous</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="knowsAllSpells" className="form-label">Knows All Spells</label>
              <select onChange={handleOnChange} id="knowsAllSpells" className="form-select" name="knows_all_spells">
                <option value="">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="spellLearningStyle" className="form-label">Spell Style</label>
              <select onChange={handleOnChange} id="spellLearningStyle" className="form-select" name="spell_learning_style">
                <option value="">-</option>
                <option value={"Learned"}>Learned</option>
                <option value={"Prepared"}>Prepared</option>
              </select>
            </div>

            <div className="col-md-12">
              <label htmlFor="additionalSpecificSpells" className="form-label">Additional Specific Spells</label>
              <select onChange={handleOnChange} id="additionalSpecificSpells" className="form-select" name="additional_specific_spells">
                <option value="">Select</option>
                <option value={"Spell Medium"}>Spell Medium</option>
                <option value={"Spell Advanced"}>Spell Advanced</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="avatar" className="form-label">Avatar<span className="text-danger">*</span></label>
              <input onChange={handleOnChange} className="form-control" type="file" id="avatar" name="avatar" />
            </div>

            <div className="col-md-6">
              <label htmlFor="largeAvatar" className="form-label">Large Avatar</label>
              <input onChange={handleOnChange} className="form-control" type="file" id="largeAvatar" name="large_avatar" />
            </div>
          </>
        }

                <div className="number-page-subclasses">
                    <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
                    <span>{page} / 2</span>
                    <button type="button" disabled={page === 2} onClick={() => setPage((p) => Math.min(p + 1, 2))}>next</button>
                </div>

                {
                    page === 2 &&
                    <div className="button-create-subclasses">
                        <button type="submit" className="btn btn-primary">Create Class</button>
                    </div>
                }


      </form>


    </div>
  );
};