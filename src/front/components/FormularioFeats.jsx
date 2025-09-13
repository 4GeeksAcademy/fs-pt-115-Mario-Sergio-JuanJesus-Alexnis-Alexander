export const FormularioFeats = () => {
    return (
        <div className="container my-5">
      <h2 className="text-center mb-4">FORMULARIO FEATS</h2>
      <form className="row g-3">

        <div className="col-md-6">
          <label htmlFor="featName" className="form-label">Name</label>
          <input type="text" className="form-control" id="featName" name="name" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="featVersion" className="form-label">Version</label>
          <input type="text" className="form-control" id="featVersion" name="version" />
        </div>
        
        <div className="col-12 mt-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="5" name="description"></textarea>
        </div>

        <div className="col-12 mt-3">
          <label htmlFor="snippet" className="form-label">Snippet</label>
          <textarea className="form-control" id="snippet" rows="3" name="snippet"></textarea>
        </div>

        <div className="col-md-6 mt-3">
          <label htmlFor="featTags" className="form-label">Feat Tags</label>
          <select id="featTags" className="form-select" name="feat_tags">
            <option selected disabled value="">Selecciona...</option>
            <option>Combate</option>
            <option>Magia</option>
            <option>Habilidad</option>
            <option>General</option>
          </select>
        </div>

        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    );
};