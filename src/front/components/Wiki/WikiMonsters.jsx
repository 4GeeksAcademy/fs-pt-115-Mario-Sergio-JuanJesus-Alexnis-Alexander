import React, { useEffect, useState } from "react";
import {
  fetchMonstersList,
  fetchMonsterDetails,
} from "../../serviceApi/WikiAPI/WikiMonstersAPI.js";
import "./WikiMonsters.css"; // estilos flip y banner

export const WikiMonsters = () => {
  const [monstersList, setMonstersList] = useState([]);
  const [detailsByIndex, setDetailsByIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const MONSTERS_PER_PAGE = 12;

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
  const currentList = monstersList.slice(
    indexOfFirstMonster,
    indexOfLastMonster
  );
  const totalPages = Math.ceil(monstersList.length / MONSTERS_PER_PAGE);

  useEffect(() => {
    async function loadDetails() {
      const missing = currentList.filter(
        (mon) => !detailsByIndex[mon.index]
      );
      if (missing.length > 0) {
        const batch = await Promise.all(
          missing.map((mon) => fetchMonsterDetails(mon.index))
        );
        const newDetails = {};
        batch.forEach((d) => {
          newDetails[d.index] = d;
        });
        setDetailsByIndex((prev) => ({ ...prev, ...newDetails }));
      }
    }
    if (currentList.length > 0) loadDetails();
  }, [currentList]);

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      const filteredArray = value.filter(
        (v) =>
          v != null &&
          (!Array.isArray(v) || v.length > 0) &&
          (typeof v !== "object" || Object.keys(v).length > 0)
      );
      if (filteredArray.length === 0) return null;

      if (typeof filteredArray[0] === "object") {
        return (
          <ul className="mb-1">
            {filteredArray.map((v, idx) => (
              <li key={idx}>
                {Object.entries(v)
                  .filter(([k, val]) => !["url", "index", "updated_at"].includes(k) && val != null)
                  .map(([k, val]) => (
                    <span key={k}>
                      <strong>{k}:</strong> {val?.name ?? val?.toString()}{" "}
                    </span>
                  ))}
              </li>
            ))}
          </ul>
        );
      }

      return filteredArray.join(", ");
    }

    if (value && typeof value === "object") {
      const filteredObj = Object.entries(value).filter(
        ([k, v]) =>
          !["url", "index", "updated_at"].includes(k) &&
          (v != null && (typeof v !== "object" || Object.keys(v).length > 0))
      );
      if (filteredObj.length === 0) return null;

      return (
        <div style={{ marginLeft: "10px" }}>
          {filteredObj.map(([k, v]) => (
            <div key={k}>
              <strong>{k}:</strong> {renderValue(v)}
            </div>
          ))}
        </div>
      );
    }

    return value !== null && value !== undefined ? value.toString() : null;
  };

  

  // VISTA EXPANDED
  if (expanded) {
    const details = detailsByIndex[expanded];
    return (
      <div className="container mt-4">
        <div className="card p-3">
          <h3>{details?.name}</h3>
          {details?.image && (
            <img
              src={details.image}
              alt={details.name}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />
          )}
          <div>
            {Object.entries(details)
              .filter(([k, v]) => !["url", "index", "updated_at", "image"].includes(k) && v != null)
              .map(([k, v]) => {
                const rendered = renderValue(v);
                if (!rendered) return null;
                return (
                  <div key={k}>
                    <strong>{k}:</strong> {rendered}
                  </div>
                );
              })}
          </div>
          <div className="d-flex justify-content-start mt-2">
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setExpanded(null)}
            >
              Back to Monsters
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VISTA GRID
  return (
    <div className="container mt-4">
      <div className="row">
        {currentList.map((mon) => {
          const details = detailsByIndex[mon.index];
          return (
            <div key={mon.index} className="col-md-4 mb-4">
              <div
                className={`wiki-card card border-0 position-relative${
                  flippedCard === mon.index ? " flipped" : ""
                }`}
                style={{ width: "100%", height: "350px", cursor: "pointer" }}
              >
                <div className="wiki-card-inner" style={{ width: "100%", height: "100%" }}>
                  {/* Cara frontal */}
                  <div
                    className="wiki-card-front d-flex flex-column justify-content-center align-items-center"
                    onClick={() => setFlippedCard(mon.index)}
                    style={{ position: "relative" }}
                  >
                    {details?.image ? (
                      <img
                        src={details.image}
                        alt={mon.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#ccc"
                      }}>
                        {mon.name}
                      </div>
                    )}
                    <div className="titleBtn" style={{
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "1rem"
                    }}>
                      {mon.name}
                    </div>
                  </div>

                  {/* Cara trasera */}
                  <div
                    className="wiki-card-back p-3 d-flex flex-column justify-content-between"
                    onClick={() => setFlippedCard(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <h5 className="card-title">{mon.name}</h5>
                      <p>Type: {details?.type ?? "..."}</p>
                      <p>Size: {details?.size ?? "..."}</p>
                      <p>Alignment: {details?.alignment ?? "..."}</p>
                      <p>HP: {details?.hit_points ?? "..."}</p>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(mon.index);
                        }}
                      >
                        See details
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(null);
                        }}
                      >
                        Go back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
