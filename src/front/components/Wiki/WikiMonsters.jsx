import React, { useEffect, useState } from "react";
import { fetchMonstersWithDetails } from "../../serviceApi/WikiAPI/WikiMonstersAPI.js";

export const WikiMonsters = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const MONSTERS_PER_PAGE = 20;

  useEffect(() => {
    async function loadMonsters() {
      const monstersData = await fetchMonstersWithDetails();
      setMonsters(monstersData);
      setLoading(false);
    }
    loadMonsters();
  }, []);

  if (loading) return <p>Cargando monstruos...</p>;

  const indexOfLastItem = currentPage * MONSTERS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - MONSTERS_PER_PAGE;
  const currentMonsters = monsters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(monsters.length / MONSTERS_PER_PAGE);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Filtrar keys no deseadas recursivamente
  const filterObject = (obj) => {
    const ignoredKeys = ["index", "image", "url", "updated", "updated_at", "forms", "reactions"];
    if (Array.isArray(obj)) {
      return obj.map(filterObject).filter(v => v !== null);
    } else if (typeof obj === "object" && obj !== null) {
      const result = {};
      Object.entries(obj).forEach(([k, v]) => {
        if (!ignoredKeys.includes(k)) {
          const filtered = filterObject(v);
          if (filtered !== null && filtered !== undefined) result[k] = filtered;
        }
      });
      return Object.keys(result).length ? result : null;
    } else {
      return obj;
    }
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((v, i) => (
        <div key={i} style={{ marginLeft: "1rem" }}>
          - {renderValue(v)}
        </div>
      ));
    } else if (typeof value === "object" && value !== null) {
      return Object.entries(value).map(([k, v]) => (
        <div key={k} style={{ marginLeft: "1rem" }}>
          <strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {renderValue(v)}
        </div>
      ));
    } else {
      return <span>{value}</span>;
    }
  };

  const renderMonsterDetails = (monster) => {
    const filteredMonster = filterObject(monster);
    return Object.entries(filteredMonster || {}).map(([key, value]) => (
      <div key={key} style={{ marginBottom: "0.25rem" }}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {renderValue(value)}
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      {/* Headers fijos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1fr 1fr",
          gap: "1rem",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ccc",
        }}
      >
        <div>Name</div>
        <div>Type</div>
        <div>Size</div>
        <div>Alignment</div>
      </div>

      {/* Monster cards con desplegable */}
      {currentMonsters.map((monster) => (
        <div key={monster.index} className="card mb-2">
          <div
            className="card-body"
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            onClick={() => toggleExpand(monster.index)}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 1fr",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {/* Columna Name con imagen */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {monster.image && (
                  <img
                    src={monster.image}
                    alt={monster.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                      borderRadius: "4px",
                    }}
                  />
                )}
                <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{monster.name || ""}</div>
              </div>

              {/* Type */}
              <div>{monster.type || ""}</div>

              {/* Size */}
              <div>{monster.size || ""}</div>

              {/* Alignment */}
              <div>{monster.alignment || ""}</div>
            </div>

            {/* Desplegable */}
            {expanded[monster.index] && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {renderMonsterDetails(monster)}
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

