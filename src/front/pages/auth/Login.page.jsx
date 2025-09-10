import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LoginPage = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const userInput = { ...input, [name]: value };
    setInput(userInput);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await login(input.email, input.password);
    if (data.success) {
      navigate("/");
    } else {
      setError(data.error || 'Email y/o contraseña incorectos')
    }
    
  };

  if (loading) {
    return (
      <div className="position-relative" style={{height: '100vh'}}>
        <div className="position-absolute top-50 start-50 translate-middle fs-2">
          ⌛⌛⌛⌛....Cargando....⌛⌛⌛⌛
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="container w-50 mt-5 bg-light p-3 rounded-3 "
    >
      <div className="mb-3">
        <h2 className="text-center">Iniciar sesión</h2>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={(e) => handleOnChange(e)}
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
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Recordarme
        </label>
      </div>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
};
