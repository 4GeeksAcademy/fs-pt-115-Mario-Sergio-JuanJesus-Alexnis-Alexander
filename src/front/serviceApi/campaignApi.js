const API_URL = import.meta.env.VITE_BACKEND_URL;

// Crear campaña
export const createCampaign = async (campaignData) => {
  try {
    const resp = await fetch(`${API_URL}/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaignData),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.error || "Error al crear campaña");
    }

    return await resp.json();
  } catch (err) {
    console.error("❌ Error en createCampaign:", err.message);
    throw err;
  }
};

// Obtener campañas
export const getCampaigns = async () => {
  try {
    const resp = await fetch(`${API_URL}/campaigns`);
    if (!resp.ok) throw new Error("Error al obtener campañas");
    return await resp.json();
  } catch (err) {
    console.error("❌ Error en getCampaigns:", err.message);
    throw err;
  }
};

