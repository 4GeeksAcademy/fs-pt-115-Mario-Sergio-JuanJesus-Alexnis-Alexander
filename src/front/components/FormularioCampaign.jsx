import { useState } from "react";
//import { createCampaign } from "../serviceApi/campaignApi";

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
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h3>Crear Campaña</h3>

      <div className="mb-2">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-2">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Mundo / Escenario</label>
        <input
          type="text"
          name="setting"
          value={formData.setting}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Nivel inicial</label>
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Número de jugadores</label>
        <input
          type="number"
          name="players"
          value={formData.players}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Crear
      </button>
    </form>
  );
};

export default FormularioCampaign;
