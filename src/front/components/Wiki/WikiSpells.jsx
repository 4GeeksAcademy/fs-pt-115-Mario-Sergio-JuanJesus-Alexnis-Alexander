import React, { useEffect, useState } from "react";
import { fetchSpellsList, fetchSpellDetails } from "../../serviceApi/WikiAPI/WikiSpellsAPI.js";

export const WikiSpells = () => {
  const [spellsList, setSpellsList] = useState([]); 
  const [detailsByIndex, setDetailsByIndex] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const SPELLS_PER_PAGE = 20;

  // cargar lista básica
  useEffect(() => {
    async function loadList() {
      const list = await fetchSpellsList();
      setSpellsList(list);
      setLoading(false);
    }
    loadList();
  }, []);

  const indexOfLastSpell = currentPage * SPELLS_PER_PAGE;
  const indexOfFirstSpell = indexOfLastSpell - SPELLS_PER_PAGE;
  const currentList = spellsList.slice(indexOfFirstSpell, indexOfLastSpell);
  const totalPages = Math.ceil(spellsList.length / SPELLS_PER_PAGE);

  
  useEffect(() => {
    async function loadDetails() {
      const missingSpells = currentList.filter(sp => !detailsByIndex[sp.index]);
      if (missingSpells.length > 0) {
        const batchDetails = await Promise.all(
          missingSpells.map(sp => fetchSpellDetails(sp.index))
        );
        const newDetails = {};
        batchDetails.forEach(d => { newDetails[d.index] = d; });
        setDetailsByIndex(prev => ({ ...prev, ...newDetails }));
      }
    }
    if (currentList.length > 0) loadDetails();
  }, [currentList]);

  const toggleExpand = index => setExpanded(prev => ({ ...prev, [index]: !prev[index] }));

  if (loading) return <p>Cargando hechizos...</p>;

  return (
    <div className="container mt-4">
      {/* Headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gap: "1rem",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderBottom: "2px solid #ccc"
      }}>
        <div>Name</div>
        <div>Level</div>
        <div>Casting Time</div>
        <div>Duration</div>
        <div>Range/Area</div>
        <div>Attack/Save</div>
        <div>Damage/Effect</div>
      </div>

      {/* Spell cards */}
      {currentList.map(sp => {
        const details = detailsByIndex[sp.index];
        return (
          <div key={sp.index} className="card mb-2">
            <div
              className="card-body"
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => toggleExpand(sp.index)}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                gap: "1rem",
              }}>
                <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{sp.name}</div>
                <div>{details?.level ?? "..."}</div>
                <div>{details?.casting_time ?? "..."}</div>
                <div>{details?.duration ?? "..."}</div>
                <div>{details?.range ?? "..."}</div>
                <div>{details?.attack ?? "..."}</div>
                <div>{details?.effect ?? "..."}</div>
              </div>

              {/* Desplegable */}
              {expanded[sp.index] && details && (
                <div style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem"
                }}>
                  <p><strong>School:</strong> {details.school}</p>
                  <p><strong>Components:</strong> {details.components}</p>
                  <p><strong>Classes:</strong> {details.classes}</p>
                  <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                    <strong>Description:</strong> {details.desc}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >← Previous</button>
        <span style={{ lineHeight: "38px", margin: "0 10px" }}>Página {currentPage} de {totalPages}</span>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >Next →</button>
      </div>
    </div>
  );
};
