const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createCampaign = async (campaignData) => {
    try {
        const resp = await fetch(`${API_URL}/api/campaigns`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
              Authorization:`Bearer ${localStorage.getItem("token")}`
             },
            body: JSON.stringify(campaignData),
        });

      const data = await resp.json()
      console.log(data);
      
      return data 
    } catch (err) {
        console.error("❌ Error en createCampaign:", err.message);
        throw err;
    }
};

export const getCampaigns = async () => {
    try {
        const resp = await fetch(`${API_URL}/api/campaigns`,{
          method: "GET",
          headers: {
              Authorization:`Bearer ${localStorage.getItem("token")}`
             },
        });
        if (!resp.ok) throw new Error("Error al obtener campañas");
        return await resp.json();
    } catch (err) {
        console.error("❌ Error en getCampaigns:", err.message);
        throw err;
    }
};
