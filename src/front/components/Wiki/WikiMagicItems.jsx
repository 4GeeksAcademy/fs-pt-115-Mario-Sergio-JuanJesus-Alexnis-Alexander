import React, { useEffect, useState } from "react";
import { fetchMagicItemsList, fetchMagicItemDetails } from "../../serviceApi/WikiAPI/WikiMagicItemsAPI.js";
import "./WikiMagicItems.css"; // para banner y estilos generales

export const WikiMagicItems = () => {
  const [itemsList, setItemsList] = useState([]); 
  const [detailsByIndex, setDetailsByIndex] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    async function loadList() {
      const list = await fetchMagicItemsList();
      setItemsList(list);
      setLoading(false);
    }
    loadList();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentList = itemsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemsList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    async function loadDetails() {
      const missingItems = currentList.filter(item => !detailsByIndex[item.index]);
      if (missingItems.length > 0) {
        const batchDetails = await Promise.all(
          missingItems.map(item => fetchMagicItemDetails(item.index))
        );
        const newDetails = {};
        batchDetails.forEach(d => { newDetails[d.index] = d; });
        setDetailsByIndex(prev => ({ ...prev, ...newDetails }));
      }
    }
    if (currentList.length > 0) loadDetails();
  }, [currentList]);

  const toggleExpand = (index) => setExpanded(prev => ({ ...prev, [index]: !prev[index] }));

  if (loading) return <p>Cargando objetos mágicos...</p>;

  return (
    <div className="container mt-4">
      {/* Banner principal */}
      <div className="page-title text-center py-3 mb-4">
        <h1>Magic Items</h1>
      </div>

      {/* Headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 1fr",
        gap: "1rem",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderBottom: "2px solid #ccc",
        alignItems: "center"
      }}>
        <div>Name</div>
        <div>Equipment Category</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Variant</div>
      </div>

      {/* Items actuales */}
      {currentList.map(item => {
        const details = detailsByIndex[item.index];
        return (
          <div key={item.index} className="card mb-2">
            <div
              className="card-body"
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => toggleExpand(item.index)}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                gap: "1rem",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {details?.image && <img src={details.image} alt={details.name} style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "4px" }} />}
                  <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{item.name}</div>
                </div>
                <div>{details?.equipment_category || "..."}</div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {details?.variant ? "Sí" : "No"}
                </div>
              </div>

              {/* Desplegable */}
              {expanded[item.index] && details?.desc && (
                <div style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  {details.desc.map((p, idx) => <p key={idx} style={{ margin: "0 0 0.5rem 0" }}>{p}</p>)}
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
