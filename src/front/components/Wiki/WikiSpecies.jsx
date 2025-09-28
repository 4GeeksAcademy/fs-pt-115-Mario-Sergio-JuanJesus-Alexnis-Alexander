import React, { useEffect, useState } from "react";
import { fetchAllSpecies, fetchSpeciesDetails } from "../../serviceApi/WikiAPI/WikiSpeciesAPI.js";

// Importa imágenes
import humanImg from "../../assets/img/pngtree-dnd-adventurer-png-image_12861468.png";
import elfImg from "../../assets/img/636287075350739045.png";
import dwarfImg from "../../assets/img/636271781394265550.png";
import halflingImg from "../../assets/img/636271789409776659.png";
import dragonbornImg from "../../assets/img/636272677995471928.png";
import gnomeImg from "../../assets/img/636272671553055253.png";
import halfelfImg from "../../assets/img/636274618102950794.png";
import halforcImg from "../../assets/img/636274570630462055.png";
import tieflingImg from "../../assets/img/266-2664125_tiefling-rogue-dnd-tiefling-rogue.png";

// Claves exactas según index de la API
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
                className="card h-100 position-relative"
                style={{ cursor: "pointer" }}
              >
                
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={sp.name}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: "50%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.5,
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Contenido del texto */}
                <div className="card-body position-relative" style={{ zIndex: 2 }}>
                  <h5 className="card-title">{sp.name}</h5>
                  <p><strong>Descripción:</strong> {sp.description}</p>
                  <p><strong>Traits:</strong> {sp.traits}</p>
                  <p className="text-muted">Haz click para ver detalles</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
