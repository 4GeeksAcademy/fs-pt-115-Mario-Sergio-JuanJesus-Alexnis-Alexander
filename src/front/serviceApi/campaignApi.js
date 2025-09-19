const API_URL = import.meta.env.VITE_BACKEND_URL;

// Crear campaña
export const createCampaign = async (campaignData) => {
    try {
        console.log("API_URL:", API_URL);
        console.log("Full URL:", `${API_URL}/api/campaigns`);
        const resp = await fetch(`${API_URL}/api/campaigns`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(campaignData),
        });
        console.log("Response status:", resp.status);
        console.log("Response headers:", resp.headers);
        // Obtener el texto crudo de la respuesta primero
        const responseText = await resp.text();
        console.log("Raw response:", responseText);
        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}: ${responseText}`);
        }
        // Intentar parsear como JSON
        return JSON.parse(responseText);
    } catch (err) {
        console.error(":x: Error en createCampaign:", err.message);
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

