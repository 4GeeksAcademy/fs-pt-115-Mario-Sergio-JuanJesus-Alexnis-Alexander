const urlApi = import.meta.env.VITE_BACKEND_URL;

// Crear campaña
export const createCampaign = async (campaignData) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, error: "No autenticado" };

  try {
    const response = await fetch(`${urlApi}/api/user/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(campaignData),
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // si el backend devolvió HTML, captura texto
      const text = await response.text();
      return {
        success: false,
        error: `Respuesta no JSON (${response.status}): ${text}`,
      };
    }

    if (!response.ok) {
      return { success: false, error: data.error || "Error al crear Campaña" };
    }

    return { success: true, data, msg: data.msg };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Obtener campañas
export const getCampaigns = async () => {
  try {
    const response = await fetch(`${urlApi}/api/user/campaigns`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
export const updateCampaign = async (updateCampaign, campaignId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/campaign/${campaignId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateCampaign),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      data: data,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteCampaign = async (campaignId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/campaigns/${campaignId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};