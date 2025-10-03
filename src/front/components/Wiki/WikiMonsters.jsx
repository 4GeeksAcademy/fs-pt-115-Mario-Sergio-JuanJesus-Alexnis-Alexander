import React, { useEffect, useState } from "react";
import { fetchMonstersList, fetchMonsterDetails } from "../../serviceApi/WikiAPI/WikiMonstersAPI.js";

export const WikiMonsters = () => {
  const [monstersList, setMonstersList] = useState([]); 
  const [detailsByIndex, setDetailsByIndex] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const MONSTERS_PER_PAGE = 20;


  useEffect(() => {
    async function loadList() {
      const list = await fetchMonstersList();
      setMonstersList(list);
      setLoading(false);
    }
    loadList();
  }, []);

  const indexOfLastMonster = currentPage * MONSTERS_PER_PAGE;
  const indexOfFirstMonster = indexOfLastMonster - MONSTERS_PER_PAGE;
  const currentList = monstersList.slice(indexOfFirstMonster, indexOfLastMonster);
  const totalPages = Math.ceil(monstersList.length / MONSTERS_PER_PAGE);

  // cargar detalles solo de los visibles (elimina goteo)
  useEffect(() => {
    async function loadDetails() {
      const missingMonsters = currentList.filter(mon => !detailsByIndex[mon.index]);
      if (missingMonsters.length > 0) {
        const batchDetails = await Promise.all(
          missingMonsters.map(mon => fetchMonsterDetails(mon.index))
        );
        const newDetails = {};
        batchDetails.forEach(d => { newDetails[d.index] = d; });
        setDetailsByIndex(prev => ({ ...prev, ...newDetails }));
      }
    }
    if (currentList.length > 0) loadDetails();
  }, [currentList]);

  const toggleExpand = index => setExpanded(prev => ({ ...prev, [index]: !prev[index] }));

  if (loading) return <p>Loading monsters...</p>;

  return (
    <div className="container mt-4">
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "1rem",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderBottom: "2px solid #ccc"
      }}>
        <div>Name</div>
        <div>Type</div>
        <div>Size</div>
        <div>Alignment</div>
      </div>

      {/* Monster cards */}
      {currentList.map(mon => {
        const details = detailsByIndex[mon.index];
        return (
          <div key={mon.index} className="card mb-2">
            <div
              className="card-body"
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => toggleExpand(mon.index)}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: "1rem",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {details?.image && (
                    <img src={details.image} alt={details.name} style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "4px" }} />
                  )}
                  <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{mon.name}</div>
                </div>
                <div>{details?.type ?? "..."}</div>
                <div>{details?.size ?? "..."}</div>
                <div>{details?.alignment ?? "..."}</div>
              </div>

              {/* Desplegable */}
              {expanded[mon.index] && details && (
                <div style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  {/* Puedes agregar más campos aquí si quieres */}
                  <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(details, null, 2)}</pre>
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
