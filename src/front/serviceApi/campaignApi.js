const urlApi = import.meta.env.VITE_BACKEND_URL;

// Crear campaña
export const createCampaign = async (campaignData) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, error: "No autenticado" };

  try {
    const response = await fetch(`${urlApi}/api/user/campaigns`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(campaignData)
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // si el backend devolvió HTML, captura texto
      const text = await response.text();
      return { success: false, error: `Respuesta no JSON (${response.status}): ${text}` };
    }

    if (!response.ok) {
      return { success: false, error: data.error || 'Error al crear Campaña' };
    }

    return { success: true, data, msg: data.msg };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Obtener campañas
export const getCampaigns = async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await fetch(`${urlApi}/api/user/campaigns`, { 
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data?.error || "Error al obtener campañas");
    return data;
  } catch (err) {
    console.error("❌ getCampaigns:", err.message);
    throw err;
  }
};
