import { useState } from "react";
import { createMagicItem } from "../serviceApi/magicItem.api";
import { useNavigate } from "react-router-dom";
import { useDisabledFields } from "../hooks/useDisabledFields";
import { initialDisabled, rules } from "../rules-forms/magicsItems.rules";

export const FormMagicItems = () => {

  const [input, setInputs] = useState({});
  const [error, setError] = useState(null);
  const { disabledFields, updateDisabledFields } = useDisabledFields(
    rules,
    initialDisabled
  );
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setInputs({ ...input, [name]: inputValue });
    updateDisabledFields(name, inputValue);

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
      <h2 className="text-center fw-bold">Create Your Magic Item</h2>
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
            <option value={"Uncommon"}>Uncommon</option>
            <option value={"Rare"}>Rare</option>
            <option value={"Very Rare"}>Very Rare</option>
            <option value={"Legendary"}>Legendary</option>
            <option value={"Artifact"}>Artifact</option>
            <option value={"Varies"}>Varies</option>
            <option value={"nknow Rarit"}>Unknow Rarity</option>
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
            disabled={disabledFields.magic_item_type}
          >
            <option value="">---</option>
            <option value={"Wondrous Item"}>Wondrous Item</option>
            <option value={"Rod"}>Rod</option>
            <option value={"Scroll"}>Scroll</option>
            <option value={"Staff"}>Staff</option>
            <option value={"Wand"}>Wand</option>
            <option value={"Ring"}>Ring</option>
            <option value={"Potion"}>Potion</option>
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
            disabled={disabledFields.base_armor}
          >
            <option value="">---</option>
            <option value="Breastplate">Breastplate</option>
            <option value="Chain Mail">Chain Mail</option>
            <option value="Chain Shirt">Chain Shirt</option>
            <option value="Half Plate">Half Plate</option>
            <option value="Hide">Hide</option>
            <option value="Leather">Leather</option>
            <option value="Padded">Padded</option>
            <option value="Plate">Plate</option>
            <option value="Ring Mail">Ring Mail</option>
            <option value="Scale Mail">Scale Mail</option>
            <option value="Shield">Shield</option>
            <option value="Spiked Armor">Spiked Armor</option>
            <option value="Splint">Splint</option>
            <option value="Studded Leather">Studded Leather</option>
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
            disabled={disabledFields.dex_bonus}
          >
            <option value="">---</option>
            <option value="Full Modifier">Full Modifier</option>
            <option value="Max 2">Max 2</option>
            <option value="None">None</option>
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
            disabled={disabledFields.str_requirement}
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
            disabled={disabledFields.stealth_check}
          >
            <option value="">---</option>
            <option value={"None"}>None</option>
            <option value={"Disadvantage"}>Disadvantage</option>
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
            disabled={disabledFields.base_weapon}
          >
            <option value="">---</option>
            <option value="Antimatter Rifle">Antimatter Rifle</option>
            <option value="Battleaxe">Battleaxe</option>
            <option value="Blowgun">Blowgun</option>
            <option value="Boomerang">Boomerang</option>
            <option value="Club">Club</option>
            <option value="Crossbow, Hand">Crossbow, Hand</option>
            <option value="Crossbow, Heavy">Crossbow, Heavy</option>
            <option value="Crossbow, Light">Crossbow, Light</option>
            <option value="Dagger">Dagger</option>
            <option value="Dart">Dart</option>
            <option value="Double-Bladed Scimitar">
              Double-Bladed Scimitar
            </option>
            <option value="Flail">Flail</option>
            <option value="Glaive">Glaive</option>
            <option value="Greataxe">Greataxe</option>
            <option value="Greatclub">Greatclub</option>
            <option value="Greatsword">Greatsword</option>
            <option value="Halberd">Halberd</option>
            <option value="Handaxe">Handaxe</option>
            <option value="Javelin">Javelin</option>
            <option value="Lance">Lance</option>
            <option value="Laser Pistol">Laser Pistol</option>
            <option value="Laser Rifle">Laser Rifle</option>
            <option value="Light Hammer">Light Hammer</option>
            <option value="Longbow">Longbow</option>
            <option value="Longsword">Longsword</option>
            <option value="Mace">Mace</option>
            <option value="Maul">Maul</option>
            <option value="Morningstar">Morningstar</option>
            <option value="Musket">Musket</option>
            <option value="Net">Net</option>
            <option value="Pike">Pike</option>
            <option value="Pistol">Pistol</option>
            <option value="Pistol, Automatic">Pistol, Automatic</option>
            <option value="Quarterstaff">Quarterstaff</option>
            <option value="Rapier">Rapier</option>
            <option value="Revolver">Revolver</option>
            <option value="Rifle, Automatic">Rifle, Automatic</option>
            <option value="Rifle, Hunting">Rifle, Hunting</option>
            <option value="Scimitar">Scimitar</option>
            <option value="Semiautomatic Pistol">Semiautomatic Pistol</option>
            <option value="Shortbow">Shortbow</option>
            <option value="Shortsword">Shortsword</option>
            <option value="Shotgun">Shotgun</option>
            <option value="Sickle">Sickle</option>
            <option value="Sling">Sling</option>
            <option value="Spear">Spear</option>
            <option value="Trident">Trident</option>
            <option value="War Pick">War Pick</option>
            <option value="Warhammer">Warhammer</option>
            <option value="Whip">Whip</option>
            <option value="Yklwa">Yklwa</option>
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
            disabled={disabledFields.attunement_description}
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
