import React, { useEffect, useState } from "react";
import { fetchMagicItemsWithDetails } from "../../serviceApi/WikiAPI/WikiMagicItemsAPI.js";

export const WikiMagicItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    async function loadItems() {
      const itemsData = await fetchMagicItemsWithDetails();
      setItems(itemsData);
      setLoading(false);
    }
    loadItems();
  }, []);

  if (loading) return <p>Cargando objetos mágicos...</p>;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="container mt-4">
      {/* Headers fijos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1fr",
          gap: "1rem",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ccc",
        }}
      >
        <div>Name</div>
        <div>Equipment Category</div>
        <div>Variant</div>
      </div>

      {/* Magic Item cards con desplegable */}
      {currentItems.map((item) => (
        <div key={item.index} className="card mb-2">
          <div
            className="card-body"
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            onClick={() => toggleExpand(item.index)}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {/* Columna Name con imagen */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      borderRadius: "4px",
                    }}
                  />
                )}
                <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{item.name || ""}</div>
              </div>

              {/* Equipment Category */}
              <div>{item.equipment_category || ""}</div>

              {/* Variant */}
              <div style={{ textAlign: "center" }}>{item.variant ? "Sí" : "No"}</div>
            </div>

            {/* Desplegable */}
            {expanded[item.index] && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {item.desc?.map((paragraph, idx) => (
                  <p key={idx} style={{ margin: "0 0 0.5rem 0" }}>{paragraph}</p>
                ))}
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
