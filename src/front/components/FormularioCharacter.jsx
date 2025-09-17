import { useEffect, useState } from "react"
import { getBackgrounds, getClasses, getRaces } from "../serviceApi/characterApi"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { element } from "prop-types"

export const FormularioCharacter = () => {
    const { store, dispatch } = useGlobalReducer()
    useEffect(() => {
        getClasses(dispatch)
        getRaces(dispatch)
        getBackgrounds(dispatch)

    }, [])

    return (
        <div className="container col-md-5 my-5 basic-form">
            <form className="row g-4">
                <h1>Create your Character</h1>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Name <span className="text-danger fs-5">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Introduce el nombre del personaje"
                        required
                    />
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Class <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        name="Clase"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        {store.classes.map((element, index) => (
                            <option key={index} value={index}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Race <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        name="Raza"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        {store.races.map((element, index) => (
                            <option key={index} value={index}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-8">
                    <label htmlFor="name" className="form-label">
                        Background <span className="text-danger fs-5">*</span>
                    </label>
                    <select
                        name="Transfondo"
                        className="form-select"
                        required
                    >
                        <option value="">---</option>
                        {store.backgrounds.map((element, index) => (
                            <option key={index} value={index}>{element.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn border m-4">
                        Submit new Character
                    </button>
                </div>
            </form>
        </div>
    )
}