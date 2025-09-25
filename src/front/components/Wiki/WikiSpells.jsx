import React, { useEffect, useState } from "react";
import { fetchSpellsWithDetails } from "../../serviceApi/WikiAPI/WikiSpellsAPI.js";

export const WikiSpells = () => {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpells() {
      const spellsData = await fetchSpellsWithDetails();
      setSpells(spellsData);
      setLoading(false);
    }
    loadSpells();
  }, []);

  if (loading) return <p>Cargando hechizos...</p>;

  return (
    <div className="container mt-4">
      {spells.map(sp => (
        <div key={sp.index} className="card mb-3">
          <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
            <h5 className="mb-2 mb-md-0">{sp.name}</h5>
            <p className="mb-0"><strong>Nivel:</strong> {sp.level}</p>
            <p className="mb-0"><strong>Casting Time:</strong> {sp.casting_time}</p>
            <p className="mb-0"><strong>Duración:</strong> {sp.duration}</p>
            <p className="mb-0"><strong>Rango/Área:</strong> {sp.range}</p>
            <p className="mb-0"><strong>Attack/Save:</strong> {sp.attack}</p>
            <p className="mb-0"><strong>Damage/Effect:</strong> {sp.effect}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
