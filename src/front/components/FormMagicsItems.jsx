import { useState } from "react";
import { createMagicItem } from "../serviceApi/magicItem.api";
import { useNavigate } from "react-router-dom";

export const FormMagicItems = () => {
  const [input, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState({
    base_armor: true,
    base_weapon: true,
    dex_bonus: true,
    str_requirement: true,
    stealth_check: true,
    magic_item_type: true,
    attunement_description: true,
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const formMagicsItems = { ...input, [name]: value };
    setInputs(formMagicsItems);

    if (name === "base_item_type") {
      if (value === "Item") {
        setIsDisabled({
          base_armor: true,
          base_weapon: true,
          dex_bonus: true,
          str_requirement: true,
          stealth_check: true,
          magic_item_type: false,
        });
      } else if (value === "Armor") {
        setIsDisabled({
          ...isDisabled,
          base_armor: false,
          base_weapon: true,
          dex_bonus: false,
          str_requirement: false,
          stealth_check: false,
          magic_item_type: true,
        });
      } else if (value === "Weapon") {
        setIsDisabled({
          ...isDisabled,
          base_weapon: false,
          base_armor: true,
          dex_bonus: true,
          str_requirement: true,
          stealth_check: true,
          magic_item_type: true,
        });
      }
    } else if (name === "requires_attunement") {
      const isChecked = e.target.checked;
      setIsDisabled({
        ...isDisabled,
        attunement_description: !isChecked,
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const dataMagicItem = await createMagicItem(input);

    if (!dataMagicItem.success) {
      return setError(dataMagicItem?.error || "Creación fallida");
    } else {
      setInputs({});
      setError(null);
    }

    navigate("/user/magics-items");
  };

  return (
    <div className="container col-md-5 my-5 basic-form">
      <h2 className="text-center fw-bold">Create your Magic Item</h2>
      <form onSubmit={handleOnSubmit} className="row g-2">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name<span className="text-danger">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter magic item name"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="version" className="form-label">
            Version
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
            Rarity <span className="text-danger">*</span>
          </label>
          <select
            onChange={handleOnChange}
            name="rarity"
            className="form-select"
            required
          >
            <option value="">---</option>
            <option value={"Common"}>Common</option>
            <option value={"Rare"}>Rare</option>
            <option value={"Very rare"}>Very rare</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="base_item_type" className="form-label">
            Base Item Type <span className="text-danger">*</span>
          </label>
          <select
            onChange={handleOnChange}
            name="base_item_type"
            className="form-select"
            required
          >
            <option value="">---</option>
            <option value={"Item"}>Item</option>
            <option value={"Armor"}>Armor</option>
            <option value={"Weapon"}>Weapon</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="magic_item_type" className="form-label">
            Magic Item Type
          </label>
          <select
            onChange={handleOnChange}
            name="magic_item_type"
            className="form-select"
            disabled={isDisabled.magic_item_type}
          >
            <option value="">---</option>
            <option value={"Anillo"}>Anillo</option>
            <option value={"Poción"}>Poción</option>
            <option value={"Varita"}>Varita</option>
            <option value={"3"}>...</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="base_armor" className="form-label">
            Base armor
          </label>
          <select
            onChange={handleOnChange}
            name="base_armor"
            className="form-select"
            disabled={isDisabled.base_armor}
          >
            <option value="">---</option>
            <option value="0">afa</option>
            <option value="1">acac</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="dex_bonus" className="form-label">
            Dex. Bonus
          </label>
          <select
            onChange={handleOnChange}
            name="dex_bonus"
            className="form-select"
            disabled={isDisabled.dex_bonus}
          >
            <option value="">---</option>
            <option value="0">afvavf</option>
            <option value="1">afafa</option>
          </select>
        </div>
        <div className="col-md-4">
          <label
            htmlFor="str_requirement"
            className="form-label"
            placeholder="8-20 characters"
          >
            Str. Requirement
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="str_requirement"
            disabled={isDisabled.str_requirement}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="stealth_check" className="form-label">
            Stealth Check
          </label>
          <select
            onChange={handleOnChange}
            name="stealth_check"
            className="form-select"
            disabled={isDisabled.stealth_check}
          >
            <option value="">---</option>
            <option value={"Ninguno"}>Ninguno</option>
            <option value={"Desventaja"}>Desventaja</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="base_weapon" className="form-label">
            Base Weapon
          </label>
          <select
            onChange={handleOnChange}
            name="base_weapon"
            className="form-select"
            disabled={isDisabled.base_weapon}
          >
            <option value="">---</option>
            <option value={"0"}>dfghd</option>
            <option value={"1"}>ndndfg</option>
          </select>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              onChange={handleOnChange}
              className="form-check-input"
              type="checkbox"
              name="requires_attunement"
            />
            <label className="form-check-label" htmlFor="requires_attunement">
              Requires Attunement
            </label>
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="attunement_description" className="form-label">
            Attunement Description <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            className="form-control"
            name="attunement_description"
            placeholder="Enter the magic item attunement description."
            disabled={isDisabled.attunement_description}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="description" className="form-label">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            onChange={handleOnChange}
            className="form-control"
            name="description"
            rows="4"
            required
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary mt-2 w-50">
            Create Magic Item
          </button>
        </div>
      </form>
    </div>
  );
};
