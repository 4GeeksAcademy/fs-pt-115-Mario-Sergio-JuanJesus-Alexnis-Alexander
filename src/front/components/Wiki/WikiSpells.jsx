import React, { useEffect, useState } from "react";
import { fetchSpellsWithDetails } from "../../serviceApi/WikiAPI/WikiSpellsAPI.js";

export const WikiSpells = () => {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({}); // para control de desplegables
  const SPELLS_PER_PAGE = 20;

  useEffect(() => {
    async function loadSpells() {
      const spellsData = await fetchSpellsWithDetails();
      setSpells(spellsData);
      setLoading(false);
    }
    loadSpells();
  }, []);

  if (loading) return <p>Cargando hechizos...</p>;

  const indexOfLastSpell = currentPage * SPELLS_PER_PAGE;
  const indexOfFirstSpell = indexOfLastSpell - SPELLS_PER_PAGE;
  const currentSpells = spells.slice(indexOfFirstSpell, indexOfLastSpell);
  const totalPages = Math.ceil(spells.length / SPELLS_PER_PAGE);

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="container mt-4">
      {/* Headers fijos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "1rem",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ccc",
        }}
      >
        <div>Name</div>
        <div>Level</div>
        <div>Casting Time</div>
        <div>Duration</div>
        <div>Range/Area</div>
        <div>Attack/Save</div>
        <div>Damage/Effect</div>
      </div>

      {/* Spell cards paginadas con desplegable */}
      {currentSpells.map((sp) => (
        <div key={sp.index} className="card mb-2">
          <div
            className="card-body"
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            onClick={() => toggleExpand(sp.index)}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{sp.name || ""}</div>
              <div>{sp.level || ""}</div>
              <div>{sp.casting_time || ""}</div>
              <div>{sp.duration || ""}</div>
              <div>{sp.range || ""}</div>
              <div>{sp.attack || ""}</div>
              <div>{sp.effect || ""}</div>
            </div>

            {/* Desplegable */}
            {expanded[sp.index] && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff", // fondo blanco
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <p><strong>School:</strong> {sp.school}</p>
                <p><strong>Components:</strong> {sp.components}</p>
                <p><strong>Classes:</strong> {sp.classes}</p>
                <div
                  style={{
                    maxHeight: "100px",
                    overflowY: "auto",
                  }}
                >
                  <strong>Description:</strong> {sp.desc}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span style={{ lineHeight: "38px", margin: "0 10px" }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next → 
        </button>
      </div>
    </div>
  );
};
