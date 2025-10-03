import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewSpecie } from "../serviceApi/specieApi";

export const FormularioSpecie = () => {

    const [page, setPage] = useState(1)
    const [input, setInputs] = useState({});

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value, checked, type } = e.target;

        const inputValue = type === "checkbox" ? checked : value;

        setInputs({ ...input, [name]: inputValue });

    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const dataSpecie = await createNewSpecie(input);
        if (!dataSpecie.success) {
            console.log(dataSpecie?.error || "Creación fallida");
            return;
        } else {
            setInputs({});
        }
        navigate("/user/specie");
    };

    console.log(input)


    return (
        <div className="container col-md-5 my-5 basic-form">
            <h2 className="text-center fw-bold">Create Species</h2>
            <form onSubmit={handleOnSubmit} className="row fw-bold">

                {page === 1 &&
                    <>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                        Name<span className="text-danger">*</span>
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="name"
                        name="name"
                        rows="1"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="version" className="form-label">
                        Version
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="version"
                        name="version"
                        rows="1"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                        Size<span className="text-danger">*</span>
                    </label><br />
                    <select name="size" id="size" className="form-select" onChange={handleOnChange}>

                        <option>-</option>
                        <option value={"Small"}>Small</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Large"}>Large</option>
                        <option value={"Huge"}>Huge</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speed_walking" className="form-label">
                        Speed Walking
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="speed_walking"
                        name="speed_walking"
                        rows="1"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speed_burrowing" className="form-label">
                        Speed Burrowing
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="speed_burrowing"
                        name="speed_burrowing"
                        rows="1"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speed_flying" className="form-label">
                        Speed Flying
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="speed_flying"
                        name="speed_flying"
                        rows="1"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="speed_swimming" className="form-label">
                        Speed Swimming
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="speed_swimming"
                        name="speed_swimming"
                        rows="1"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="short_description" className="form-label">
                        Short Description
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="short_description"
                        name="speed_swimming"
                        rows="1"
                    />
                </div>

                    </>
                }

                {page === 2 &&
                    <>

                <div className="col-md-6 mb-3">
                    <label htmlFor="group" className="form-label">
                        Species Group
                    </label>
                    <select name="group" id="group" className="form-select" onChange={handleOnChange}>
                        <option>-</option>
                        <option value={"Aaracokra"}>Aaracokra</option>
                        <option value={"Aasimar"}>Aasimar</option>
                        <option value={"Bearfolk"}>Bearfolk</option>
                        <option value={"Bugbear"}>Bugbear</option>
                        <option value={"Cervan"}>Cervan</option>
                        <option value={"Corvum"}>Corvum</option>
                        <option value={"Dara"}>Dara</option>
                        <option value={"Elf"}>Elf</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="description" className="form-label">
                        Description<span className="text-danger">*</span>
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="description"
                        name="description"
                        rows="1"
                        required
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="hide_trait" className="form-label">
                        Hide Traits Heading
                    </label>
                    <input type="checkbox" onChange={handleOnChange} />
                </div>

                <div className="col-md-9 mb-3">
                    <label htmlFor="specie_trait" className="form-label">
                        Species Trait Introduction<span className="text-danger">*</span>
                    </label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        id="specie_trait"
                        name="specie_trait"
                        rows="1"
                        required
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="will_have_species" className="form-label">
                        Will have Species Options?
                    </label>
                    <input type="checkbox" onChange={handleOnChange} />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="large_avatar" className="form-label">
                        Large Avatar
                    </label>
                    <input
                        onChange={handleOnChange}
                        className="form-control"
                        type="file"
                        id="large_avatar"
                        name="large_avatar"
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="portrait_avatar" className="form-label">
                        Portrait Avatar
                    </label>
                    <input
                        onChange={handleOnChange}
                        className="form-control"
                        type="file"
                        id="portrait_avatar"
                        name="portrait_avatar"
                    />
                </div>

                    </>
                }

               <div className="number-page-specie">
                    <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>prev</button>
                    <span>{page} / 2</span>
                    <button type="button" disabled={page === 2} onClick={() => setPage((p) => Math.min(p + 1, 2))}>next</button>
                </div>

                {
                    page === 2 &&
                    <div className="button-create-specie">
                        <button type="submit" className="btn btn-primary">Create Specie</button>
                    </div>
                }

            </form>
        </div>
    );
};