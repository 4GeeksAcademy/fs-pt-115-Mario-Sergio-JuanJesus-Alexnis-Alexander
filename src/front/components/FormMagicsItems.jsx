export const FormMagicItems = () => {
  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Introduce el nombre del item magico"
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="version" className="form-label">
          Versión
        </label>
        <input
          type="text"
          className="form-control"
          name="version"
          placeholder="1, 1.5, A, B, etc"
        />
      </div>
      <div className="col-12">
        <label htmlFor="rarity" className="form-label">
          Rareza
        </label>
        <select name="rarity" className="form-select" required>
          <option selected="">---</option>
          <option>Comun</option>
          <option>Raro</option>
          <option>Muy raro</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="baseItemType" className="form-label">
          Tipo de artículo base
        </label>
        <select name="baseItemType" className="form-select" required>
          <option selected="">Articulo</option>
          <option>Armadura</option>
          <option>Arma</option>
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="magicItemType" className="form-label">
          RTipo de objeto mágico
        </label>
        <select name="magicItemType" className="form-select" required>
          <option selected="">---</option>
          <option>Anillo</option>
          <option>Poción</option>
          <option>Varita</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="baseArmor" className="form-label">
          Armadura base
        </label>
        <select name="baseArmor" className="form-select">
          <option selected="">---</option>
          <option>...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor="dexBonus" className="form-label">
          Dex. Bonus
        </label>
        <select name="dexBonus" className="form-select">
          <option selected="">---</option>
          <option>...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="strRequeriment" className="form-label">
          Str. Requisito
        </label>
        <input type="text" className="form-control" name="strRequeriment" />
      </div>
      <div className="col-md-6">
        <label htmlFor="stealthCheck" className="form-label">
          Comprobación sigilosa
        </label>
        <select name="stealthCheck" className="form-select">
          <option selected="">---</option>
          <option>Ninguno</option>
          <option>Desventaja</option>
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="baseWepon" className="form-label">
          Arma base
        </label>
        <select name="baseWepon" className="form-select">
          <option selected="">---</option>
          <option>...</option>
          <option>...</option>
        </select>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="attunement"
          />
          <label className="form-check-label" htmlFor="attunement">
            Requiere sintonización
          </label>
        </div>
      </div>
      <div className="col-md-12">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          name="description"
          rows="10"
          cols="50"
          placeholder="Ingresa la descripción aquí..."
          required
        ></textarea>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Crear objeto
        </button>
      </div>
    </form>
  );
};
