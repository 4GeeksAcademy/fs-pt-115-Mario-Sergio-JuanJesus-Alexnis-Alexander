const API_BASE = "https://www.dnd5eapi.co/api/equipment";

// 1. Devuelve solo la lista básica
export async function fetchEquipmentList() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Error al obtener lista de equipment");
  const data = await response.json();
  return data.results; // [{index, name, url}, ...]
}

// 2. Devuelve detalles de un item por index
export async function fetchEquipmentDetails(index) {
  const response = await fetch(`${API_BASE}/${index}`);
  if (!response.ok) throw new Error(`Error al obtener detalles de ${index}`);
  const details = await response.json();

  // construir cost
  let cost = "";
  if (details.cost?.quantity && details.cost?.unit) {
    cost = `${details.cost.quantity} ${details.cost.unit}`;
  }

  return {
    index: details.index,
    name: details.name || "",
    weight: details.weight ?? "",
    gear_category: details.gear_category?.name || "",
    equipment_category: details.equipment_category?.name || "",
    cost: cost,
  };
}
