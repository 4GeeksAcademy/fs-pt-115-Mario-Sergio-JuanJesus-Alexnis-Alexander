export const FormularioSubclasses = () => {
    return (
    <div className="container col-md-8 my-5 bg-light basic-form">
      <h2 className="text-center mb-4">FORMULARIO CREATE A SUBCLASS</h2>
      <form className="row g-3">

        <div className="col-md-6">
          <label htmlFor="subclassName" className="form-label">Name</label>
          <input type="text" className="form-control" id="subclassName" name="name" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="subclassVersion" className="form-label">Version</label>
          <input type="text" className="form-control" id="subclassVersion" name="version" />
        </div>
        
        <div className="col-12">
          <h5 className="mt-3">Descriptions</h5>
        </div>
        <div className="col-md-6">
          <label htmlFor="shortDescription" className="form-label">Short Description</label>
          <textarea className="form-control" id="shortDescription" rows="3" name="short_description" required></textarea>
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" name="description" required></textarea>
        </div>

        <div className="col-12">
          <h5 className="mt-3">Spell Details</h5>
        </div>
        <div className="col-md-4">
          <label htmlFor="spellcastingAbility" className="form-label">Spellcasting Ability</label>
          <select id="spellcastingAbility" className="form-select" name="spellcasting_ability">
            <option selected disabled value="">Selecciona...</option>
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
            <option selected disabled value="">Selecciona...</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="additionalSpellList" className="form-label">Additional Spell List</label>
          <select id="additionalSpellList" className="form-select" name="additional_spell_list">
            <option selected disabled value="">Selecciona...</option>
            <option>Lista A</option>
            <option>Lista B</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="spellPrepareType" className="form-label">Spell Prepare Type</label>
          <select id="spellPrepareType" className="form-select" name="spell_prepare_type">
            <option selected disabled value="">Selecciona...</option>
            <option>Prepared</option>
            <option>Spontaneous</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="knowsAllSpells" className="form-label">Knows All Spells</label>
          <select id="knowsAllSpells" className="form-select" name="knows_all_spells">
            <option selected disabled value="">Selecciona...</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="spellLearningStyle" className="form-label">Spell Learning Style</label>
          <select id="spellLearningStyle" className="form-select" name="spell_learning_style">
            <option selected disabled value="">Selecciona...</option>
            <option>From Scrolls</option>
            <option>Through Meditation</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="additionalSpecificSpells" className="form-label">Additional Specific Spells</label>
          <select id="additionalSpecificSpells" className="form-select" name="additional_specific_spells">
            <option selected disabled value="">Selecciona...</option>
            <option>Spell X</option>
            <option>Spell Y</option>
          </select>
        </div>
        
        <div className="col-12">
          <h5 className="mt-3">Avatars</h5>
        </div>
        <div className="col-md-6">
          <label htmlFor="avatar" className="form-label">Avatar</label>
          <input className="form-control" type="file" id="avatar" name="avatar" />
        </div>
        <div className="col-md-6">
          <label htmlFor="largeAvatar" className="form-label">Large Avatar</label>
          <input className="form-control" type="file" id="largeAvatar" name="large_avatar" />
        </div>

        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    );
};