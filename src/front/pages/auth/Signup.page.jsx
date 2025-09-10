import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SignupPage = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const { authSignUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault(e);

    if (input.password != input.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    } else {
      setError(null);
    }

    const newUserData = await authSignUp(
      input.username,
      input.email,
      input.password
    );

    if (newUserData.success) {
      return navigate("/");
    } else {
      setError(newUserData.error || "Error en el registro");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const infoNewUser = { ...input, [name]: value };
    setInput(infoNewUser);
  };

  if (loading) {
    return (
      <div className="position-relative" style={{ height: "100vh" }}>
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
        <h2 className="text-center">Nuevo usuario</h2>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="username"
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          required
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
          required
          type="password"
          className="form-control"
          name="password"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar contraseña
        </label>
        <input
          required
          type="password"
          className="form-control"
          name="confirmPassword"
          onChange={(e) => handleOnChange(e)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};
