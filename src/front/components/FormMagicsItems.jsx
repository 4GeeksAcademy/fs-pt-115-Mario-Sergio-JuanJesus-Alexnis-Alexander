import { useState } from "react";

export const FormMagicItems = () => {

  const [input, setInputs] =  useState({})

  const handleOnChange = (e) => {
    const { name, value} = e.target
    const formMagicsItems = {...input, [name]: value}
    setInputs(formMagicsItems)
  }

  return (
    <div className="container my-5 bg-light">
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            onChange={handleOnChange}
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
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="version"
            placeholder="1, 1.5, A, B, etc"
          />
        </div>
        <div className="col-6">
          <label htmlFor="rarity" className="form-label">
            Rareza
          </label>
          <select
            value={input.rarity}
            onChange={handleOnChange}
            name="rarity"
            className="form-select"
            required
          >
            <option>---</option>
            <option value={"0"}>Comun</option>
            <option value={"1"}>Raro</option>
            <option value={"2"}>Muy raro</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="baseItemType" className="form-label">
            Tipo de artículo base
          </label>
          <select
            value={input.baseItemType}
            onChange={handleOnChange}
            name="baseItemType"
            className="form-select"
            required
          >
            <option>Articulo</option>
            <option value={'1'}>Armadura</option>
            <option value={'2'}>Arma</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="magicItemType" className="form-label">
            RTipo de objeto mágico
          </label>
          <select
            value={input.magicItemType}
            onChange={handleOnChange}
            name="magicItemType"
            className="form-select"
            required
          >
            <option>---</option>
            <option value={'0'}>Anillo</option>
            <option value={'1'}>Poción</option>
            <option value={'2'}>Varita</option>
            <option value={'3'}>...</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="baseArmor" className="form-label">
            Armadura base
          </label>
          <select
            value={input.baseArmor}
            onChange={handleOnChange}
            name="baseArmor"
            className="form-select"
          >
            <option>---</option>
            <option value="0">afa</option>
            <option value="1">acac</option>
            
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="dexBonus" className="form-label">
            Dex. Bonus
          </label>
          <select
            value={input.dexBonus}
            onChange={handleOnChange}
            name="dexBonus"
            className="form-select"
          >
            <option>---</option>
            <option value="0">afvavf</option>
            <option value="1">afafa</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="strRequeriment" className="form-label">
            Str. Requisito
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="strRequeriment"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="stealthCheck" className="form-label">
            Comprobación sigilosa
          </label>
          <select
            value={input.stealthCheck}
            onChange={handleOnChange}
            name="stealthCheck"
            className="form-select"
          >
            <option>---</option>
            <option value={'0'}>Ninguno</option>
            <option value={'1'}>Desventaja</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="baseWeapon" className="form-label">
            Arma base
          </label>
          <select
            value={input.baseWeapon}
            onChange={handleOnChange}
            name="baseWeapon"
            className="form-select"
          >
            <option>---</option>
            <option value={'0'}>dfghd</option>
            <option value={'1'}>ndndfg</option>
          </select>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              onChange={handleOnChange}
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
            onChange={handleOnChange}
            className="form-control"
            name="description"
            rows="10"
            cols="100"
            placeholder="Ingresa la descripción aquí..."
            required
          ></textarea>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary mb-4 w-25">
            Crear objeto
          </button>
        </div>
      </form>
    </div>
  );
};
