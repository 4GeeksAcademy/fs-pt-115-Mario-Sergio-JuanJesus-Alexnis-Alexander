import { useState } from "react"
import { signUp } from "../../serviceApi/userApi"


export const SignupPage = () => {

  const [input, setInput] = useState({})
  const [error, setError] = useState(null)

  const handleOnSubmit = async (e) => {
    e.preventDefault(e)

    if (input.password != input.confirmPassword) {
      setError('Contraseñas no coinciden')
      return error
    } else {
      setError(null)
    }

    const newUserData = await signUp({
      username: input.username,
      email: input.email,
      password: input.password,
    })

    

  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    const infoNewUser = {...input, [name]: value}
    setInput(infoNewUser)

    

  }
  console.log(input);
  
  
  


  return (
    <form className="container w-50 mt-5 bg-light p-3 rounded-3 ">
      <div className="mb-3">
        <h2 className="text-center">Nuevo usuario</h2>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          onChange={(e)=>handleOnChange(e)}
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={(e)=>handleOnChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={(e)=>handleOnChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
         Confirmar contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          onChange={(e)=>handleOnChange(e)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}


