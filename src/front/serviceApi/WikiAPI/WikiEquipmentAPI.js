const API_BASE = "https://www.dnd5eapi.co/api/equipment";
const BATCH_SIZE = 8; // cantidad de items que se consultan a la vez
const DELAY_BETWEEN_BATCHES = 200; // milisegundos de espera entre lotes

// Función que espera x ms
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 👉 Función que carga todos los equipment por lotes
export async function fetchEquipmentWithDetails() {
  try {
    // 1. Obtener lista de equipment
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener la lista de equipment");
    const data = await response.json();

    const equipmentWithDetails = [];

    // 2. Recorrer equipment por lotes
    for (let i = 0; i < data.results.length; i += BATCH_SIZE) {
      const batch = data.results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (item) => {
        try {
          const detailRes = await fetch(`${API_BASE}/${item.index}`);
          if (!detailRes.ok) throw new Error(`Error en ${item.index}`);
          const details = await detailRes.json();

          // Construir cost como string legible
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
        } catch (err) {
          console.warn(`⚠️ No se pudo cargar el item ${item.index}:`, err);
          return {
            index: item.index,
            name: item.name || "",
            weight: "",
            gear_category: "",
            equipment_category: "",
            cost: "",
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      equipmentWithDetails.push(...batchResults);

      // Esperar un poco antes del siguiente lote para evitar 429
      if (i + BATCH_SIZE < data.results.length) {
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    return equipmentWithDetails;
  } catch (error) {
    console.error("❌ Error en fetchEquipmentWithDetails:", error);
    return [];
  }
}
