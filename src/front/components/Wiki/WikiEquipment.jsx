import React, { useEffect, useState } from "react";
import { fetchEquipmentWithDetails } from "../../serviceApi/WikiAPI/WikiEquipmentAPI.js";

export const WikiEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const EQUIPMENT_PER_PAGE = 20;

  useEffect(() => {
    async function loadEquipment() {
      const equipmentData = await fetchEquipmentWithDetails();
      setEquipment(equipmentData);
      setLoading(false);
    }
    loadEquipment();
  }, []);

  if (loading) return <p>Cargando equipo...</p>;

  // índices para paginación
  const indexOfLastItem = currentPage * EQUIPMENT_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - EQUIPMENT_PER_PAGE;
  const currentEquipment = equipment.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(equipment.length / EQUIPMENT_PER_PAGE);

  return (
    <div className="container mt-4">
      {/* Headers fijos */}
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

      {/* Equipment cards paginadas */}
      {currentEquipment.map((eq) => (
        <div key={eq.index} className="card mb-2">
          <div className="card-body" style={{ padding: "0.5rem 1rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 2fr 2fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{eq.name || ""}</div>
              <div>{eq.weight ? `${eq.weight} lb` : ""}</div>
              <div>{eq.gear_category || ""}</div>
              <div>{eq.equipment_category || ""}</div>
              <div>{eq.cost ? `${eq.cost} ` : ""}</div>
            </div>
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
