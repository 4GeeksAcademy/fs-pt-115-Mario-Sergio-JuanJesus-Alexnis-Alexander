import { useState, useEffect } from "react";
import { getCampaigns, createCampaign } from "../../serviceApi/campaignApi";

const ShowCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
    }
  };
console.log(campaigns);


  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4">Mis Campañas</h2>
      <ul className="list-group">
        {campaigns.map((c) => (
          <li key={c.id} className="list-group-item bg-dark text-light border-danger mb-2">
            <strong>{c.name}</strong> - {c.setting} - Nivel: {c.level} - Jugadores: {c.players}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCampaign;
