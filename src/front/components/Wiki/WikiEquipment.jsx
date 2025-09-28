import React, { useEffect, useState } from "react";
import { fetchEquipmentList, fetchEquipmentDetails } from "../../serviceApi/WikiAPI/WikiEquipmentAPI.js";

export const WikiEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]); // lista básica
  const [detailsByIndex, setDetailsByIndex] = useState({}); // caché de detalles
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const EQUIPMENT_PER_PAGE = 20;

  // cargar la lista básica al inicio
  useEffect(() => {
    async function loadList() {
      const list = await fetchEquipmentList();
      setEquipmentList(list);
      setLoading(false);
    }
    loadList();
  }, []);

  // índices de la paginación
  const indexOfLastItem = currentPage * EQUIPMENT_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - EQUIPMENT_PER_PAGE;
  const currentList = equipmentList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(equipmentList.length / EQUIPMENT_PER_PAGE);

  // cargar detalles de los visibles (en paralelo y de golpe)
  useEffect(() => {
    async function loadDetails() {
      const missing = currentList.filter((item) => !detailsByIndex[item.index]);

      if (missing.length > 0) {
        const results = await Promise.all(
          missing.map(async (item) => {
            const details = await fetchEquipmentDetails(item.index);
            return [item.index, details];
          })
        );

        const newDetails = results.reduce((acc, [index, details]) => {
          acc[index] = details;
          return acc;
        }, {});

        setDetailsByIndex((prev) => ({ ...prev, ...newDetails }));
      }
    }

    if (currentList.length > 0) {
      loadDetails();
    }
  }, [currentList]);

  if (loading) return <p>Cargando lista de equipo...</p>;

  return (
    <div className="container mt-4">
      {/* Headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 2fr 2fr 1fr",
          gap: "1rem",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ccc",
        }}
      >
        <div>Name</div>
        <div>Weight</div>
        <div>Gear Category</div>
        <div>Equipment Category</div>
        <div>Cost</div>
      </div>

      {/* Items actuales */}
      {currentList.map((item) => {
        const details = detailsByIndex[item.index];
        return (
          <div key={item.index} className="card mb-2">
            <div className="card-body" style={{ padding: "0.5rem 1rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 2fr 2fr 1fr",
                  gap: "1rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
                  {item.name}
                </div>
                <div>
                  {details
                    ? `${details.weight || ""} ${details.weight ? "lb" : ""}`
                    : "..."}
                </div>
                <div>{details ? details.gear_category : "..."}</div>
                <div>{details ? details.equipment_category : "..."}</div>
                <div>{details ? details.cost : "..."}</div>
              </div>
            </div>
          </div>
        );
      })}

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
