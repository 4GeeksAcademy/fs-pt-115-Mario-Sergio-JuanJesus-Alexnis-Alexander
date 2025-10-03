import React, { useEffect, useState } from "react";
import "./WikiSpecies.css";
import { fetchAllSpecies, fetchSpeciesDetails } from "../../serviceApi/WikiAPI/WikiSpeciesAPI.js";


import humanImg from "../../assets/img/pngtree-dnd-adventurer-png-image_12861468.png";
import elfImg from "../../assets/img/636287075350739045.png";
import dwarfImg from "../../assets/img/636271781394265550.png";
import halflingImg from "../../assets/img/636271789409776659.png";
import dragonbornImg from "../../assets/img/636272677995471928.png";
import gnomeImg from "../../assets/img/636272671553055253.png";
import halfelfImg from "../../assets/img/636274618102950794.png";
import halforcImg from "../../assets/img/636274570630462055.png";
import tieflingImg from "../../assets/img/266-2664125_tiefling-rogue-dnd-tiefling-rogue.png";


const speciesImages = {
  human: humanImg,
  elf: elfImg,
  dwarf: dwarfImg,
  halfling: halflingImg,
  dragonborn: dragonbornImg,
  gnome: gnomeImg,
  "half-elf": halfelfImg,
  "half-orc": halforcImg,
  tiefling: tieflingImg
};

export const WikiSpecies = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedCard, setFlippedCard] = useState(null);

  // Fondo blanco uniforme
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#fff";
    return () => { document.body.style.background = prev; };
  }, []);

  useEffect(() => {
    async function loadSpeciesWithDetails() {
      const allSpecies = await fetchAllSpecies();
      const speciesWithDetails = await Promise.all(
        allSpecies.map(async (sp) => {
          const details = await fetchSpeciesDetails(sp.index);
          return details;
        })
      );
      setSpecies(speciesWithDetails.filter(s => s !== null));
      setLoading(false);
    }
    loadSpeciesWithDetails();
  }, []);

  if (loading) return <p>Cargando especies...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {species.map(sp => {
          const imageSrc = speciesImages[sp.index];

          return (
            <div key={sp.index} className="col-md-4 mb-3">
              <div
                className={`wiki-card card border-0 my-3 position-relative${flippedCard === sp.index ? ' flipped' : ''}`}
                style={{ cursor: "pointer", width: "100%", height: "auto" }}
              >
                <div className="wiki-card-inner" style={{ width: "100%", height: "100%" }}>
                  {/* Cara frontal */}
                  <div className="wiki-card-front" onClick={() => setFlippedCard(sp.index)}>
                    {imageSrc && (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", borderRadius: "10px 10px 0 0", overflow: "hidden", padding: 0 }}>
                        <img
                          src={imageSrc}
                          alt={sp.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "10px 10px 0 0",
                            display: "block"
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* Cara trasera */}
                  <div className="wiki-card-back p-3 d-flex flex-column justify-content-between" onClick={() => setFlippedCard(null)} style={{ cursor: "pointer" }}>
                    <div>
                      <h5 className="card-title">{sp.name}</h5>
                      <p><strong>Descripción:</strong> {sp.description}</p>
                      <p><strong>Traits:</strong> {sp.traits}</p>
                    </div>
                    <div>
                      <p className="text-muted">Haz click para volver</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
