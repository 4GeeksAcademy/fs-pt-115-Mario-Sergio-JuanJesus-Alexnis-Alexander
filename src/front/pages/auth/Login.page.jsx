import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LoginPage = () => {
  const [input, setInput] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await login(input.email, input.password, input.remember);
    if (data.success) navigate("/");
    else setError(data.error || "Email y/o contraseña incorrectos");
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
    <form onSubmit={handleOnSubmit} className="container w-50 mt-5 bg-light p-3 rounded-3 ">
      <div className="mb-3">
        <h2 className="text-center">Iniciar sesión</h2>
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={input.email} onChange={handleOnChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" name="password" value={input.password} onChange={handleOnChange} required />
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="remember" name="remember" checked={input.remember} onChange={handleOnChange} />
        <label className="form-check-label" htmlFor="remember">Recordarme</label>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary" disabled={loading}>Entrar</button>
    </form>
  );
};