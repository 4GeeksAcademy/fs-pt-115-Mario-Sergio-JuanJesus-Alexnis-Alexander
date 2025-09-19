import { useState } from "react";
import { createCampaign } from "../serviceApi/campaignApi";

const FormularioCampaign = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    setting: "",
    level: "",
    players: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCampaign(formData);
      alert("Campaña creada con éxito: " + result.name);
      setFormData({
        name: "",
        description: "",
        setting: "",
        level: "",
        players: "",
      });
    } catch (err) {
      alert("Error al crear campaña");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 bg-dark text-light">
        <div className="card-header bg-danger text-center">
          <h2 className="fw-bold text-uppercase m-0">⚔️ Crear Campaña ⚔️</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label fw-bold text-danger">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control bg-dark text-light border-danger"
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label fw-bold text-danger">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control bg-dark text-light border-danger"
                rows="3"
              />
            </div>

            {/* Escenario */}
            <div className="mb-3">
              <label className="form-label fw-bold text-danger">
                Mundo / Escenario
              </label>
              <input
                type="text"
                name="setting"
                value={formData.setting}
                onChange={handleChange}
                className="form-control bg-dark text-light border-danger"
              />
            </div>

            {/* Nivel inicial */}
            <div className="mb-3">
              <label className="form-label fw-bold text-danger">
                Nivel inicial
              </label>
              <input
                type="number"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="form-control bg-dark text-light border-danger"
              />
            </div>

            {/* Número de jugadores */}
            <div className="mb-4">
              <label className="form-label fw-bold text-danger">
                Número de jugadores
              </label>
              <input
                type="number"
                name="players"
                value={formData.players}
                onChange={handleChange}
                className="form-control bg-dark text-light border-danger"
              />
            </div>

            {/* Botón */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-danger btn-lg px-5 fw-bold"
              >
                🐉 Crear Campaña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCampaign;
