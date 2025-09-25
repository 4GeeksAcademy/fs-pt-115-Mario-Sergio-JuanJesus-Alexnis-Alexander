import { useState } from "react";
import "../styles/forms/backgroundForm.css"
import { useDisabledFields } from "../hooks/useDisabledFields";
import { initialDisabled, rules } from "../rules-forms/spell.rules";

export const FormularioSpell = () => {
    const [page, setPage] = useState(1)
    const [input, setInputs] = useState({});

    const { disabledFields, updateDisabledFields } = useDisabledFields(rules, initialDisabled);

    const handleOnChange = (e) => {
        const { name, value, checked, type } = e.target;

        const inputValue = type === "checkbox" ? checked : value;

        setInputs({ ...input, [name]: inputValue });
        updateDisabledFields(name, inputValue);


    };



    return (
        <div className="container col-md-5 my-5 basic-form position-relative">
            <h2 className="text-center fw-bold">Formulario Homebrews Spells</h2>
            <form className="row fw-bold">
                {page === 1 &&
                    <>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="spell_name" className="form-label">
                                Spell Name<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="spell_name"
                                name="spell_name"
                                required=""
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="spell_level" className="form-label">
                                Spell Level<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="number"
                                placeholder=""
                                className="form-control"
                                id="spell_level"
                                name="spell_level"
                                required=""
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="spell_school" className="form-label">
                                Spell School<span className="text-danger">*</span>
                            </label><br />
                            <select onChange={handleOnChange} name="spell_school" id="spell_school" className="form-select">
                                <option>-</option>
                                <option value={"Abjuration"}>Abjuration</option>
                                <option value={"Conjuration"}>Conjuration</option>
                                <option value={"Divination"}>Divination</option>
                                <option value={"Enchantment"}>Enchantment</option>
                                <option value={"Evocation"}>Evocation</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="casting_time" className="form-label">
                                Casting Time<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="casting_time"
                                name="casting_time"
                                required=""
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="casting_time_select" className="form-label">
                                Casting Time Select
                            </label><br />
                            <select onChange={handleOnChange} name="casting_time_select" id="casting_time_select" className="form-select">
                                <option>-</option>
                                <option value={"Action"}>Action</option>
                                <option value={"Bonus Action"}>Bonus Action</option>
                                <option value={"No Action"}>No Action</option>
                                <option value={"Reaction"}>Reaction</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="reaction_casting_time" className="form-label">
                                Reaction Casting Time<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="reaction_casting_time"
                                name="reaction_casting_time"
                                disabled={disabledFields.reaction_casting_time}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label d-block">
                                Components
                            </label>
                            <input onChange={handleOnChange} type="checkbox" className="btn-check" name="v" id="v" autocomplete="off" />
                            <label className="btn btn-outline-secondary" htmlFor="v">V</label>
                            <input onChange={handleOnChange} type="checkbox" className="btn-check" name="s" id="s" autocomplete="off" />
                            <label className="btn btn-outline-secondary" htmlFor="s">S</label>
                            <input onChange={handleOnChange} type="checkbox" className="btn-check" name="m" id="m" autocomplete="off" />
                            <label className="btn btn-outline-secondary" htmlFor="m">M</label>
                        </div>


                        <div className="col-md-4 mb-3">
                            <label htmlFor="material_components" className="form-label">
                                Material Components<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="material_components"
                                name="material_components"
                                disabled={disabledFields.material_components}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="spell_range" className="form-label">
                                Spell Range<span className="text-danger">*</span>
                            </label><br />
                            <select onChange={handleOnChange} name="spell_range" id="spell_range" className="form-select">
                                <option>-</option>
                                <option value={"Self"}>Self</option>
                                <option value={"Touch"}>Touch</option>
                                <option value={"Ranged"}>Ranged</option>
                                <option value={"Sight"}>Sight</option>
                                <option value={"Unlimited"}>Unlimited</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="range_distance" className="form-label">
                                Range Distance<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="range_distance"
                                name="range_distancee"
                                disabled={disabledFields.range_distance}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="duration_type" className="form-label">
                                Duration Type<span className="text-danger">*</span>
                            </label><br />
                            <select onChange={handleOnChange} name="duration_type" id="duration_type" className="form-select">
                                <option>-</option>
                                <option value={"Concentration"}>Concentration</option>
                                <option value={"Instantaneous"}>Instantaneous</option>
                                <option value={"Special"}>Special</option>
                                <option value={"Time"}>Time</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="duration" className="form-label">
                                Duration<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="duration"
                                name="duration"
                                disabled={disabledFields.duration}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="duration_select" className="form-label">
                                Duration Select<span className="text-danger">*</span>
                            </label><br />
                            <select onChange={handleOnChange} disabled={disabledFields.duration_select} name="duration_select" id="duration_select" className="form-select">
                                <option>-</option>
                                <option value={"Round"}>Round</option>
                                <option value={"Minute"}>Minute</option>
                                <option value={"Hour"}>Hour</option>
                                <option value={"Day"}>Day</option>
                            </select>
                        </div>

                        <div className="col-md-8 mb-3">
                            <label htmlFor="description" className="form-label">
                                Description<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                required=""
                            />
                        </div>
                    </>
                }

                {page === 2 &&
                    <>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="ritual_spell" className="form-label">
                                Ritual Spell
                            </label>
                            <input onChange={handleOnChange} name="ritual_spell" id="ritual_spell" type="checkbox" required="" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="at_higher_levels" className="form-label">
                                At Higher Levels Scaling
                            </label>
                            <input onChange={handleOnChange} name="at_higher_levels" id="at_higher_levels" type="checkbox" required="" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="higher_level_scaling" className="form-label">
                                Higher Level Scaling
                            </label><br />
                            <select onChange={handleOnChange} disabled={disabledFields.higher_level_scaling} name="higher_level_scaling" id="higher_level_scaling" className="form-select">
                                <option>-</option>
                                <option value={"Character Level"}>Character Level</option>
                                <option value={"Spell Scale"}>Spell Scale</option>
                                <option value={"Spell Level"}>Spell Level</option>
                            </select>
                        </div>

                        <div className="col-md-8 mb-3">
                            <label htmlFor="available_for_classes" className="form-label">
                                Available For Classes<span className="text-danger">*</span>
                            </label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="available_for_classes"
                                name="available_for_classes"
                                required=""
                            />
                        </div>
                    </>
                }

                <div className="number-page-background">
                    <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
                    <span>{page} / 2</span>
                    <button type="button" disabled={page === 2} onClick={() => setPage((p) => Math.min(p + 1, 2))}>next</button>
                </div>

                {
                    page === 2 &&
                    <div className="button-create-background">
                        <button type="submit" className="btn btn-primary">Create Spell</button>
                    </div>
                }

            </form>
        </div>

    )
}