const API_BASE = "https://www.dnd5eapi.co/api/magic-items";
const IMAGE_BASE = "https://www.dnd5eapi.co"; // raíz para las imágenes
const BATCH_SIZE = 8;
const DELAY_BETWEEN_BATCHES = 200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMagicItemsWithDetails() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener lista de magic items");
    const data = await response.json();

    const itemsWithDetails = [];

    for (let i = 0; i < data.results.length; i += BATCH_SIZE) {
      const batch = data.results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (item) => {
        try {
          const detailRes = await fetch(`${API_BASE}/${item.index}`);
          if (!detailRes.ok) throw new Error(`Error en ${item.index}`);
          const details = await detailRes.json();

          return {
            index: details.index,
            name: details.name || "",
            equipment_category: details.equipment_category?.name || "",
            variant: details.variant ?? false,
            desc: details.desc || [],
            // Convertir ruta relativa de la imagen en URL absoluta
            image: details.image ? `${IMAGE_BASE}${details.image}` : "",
          };
        } catch (err) {
          console.warn(`⚠️ No se pudo cargar ${item.index}:`, err);
          return {
            index: item.index,
            name: item.name || "",
            equipment_category: "",
            variant: false,
            desc: [],
            image: "",
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      itemsWithDetails.push(...batchResults);

      if (i + BATCH_SIZE < data.results.length) {
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    return itemsWithDetails;
  } catch (error) {
    console.error("❌ Error en fetchMagicItemsWithDetails:", error);
    return [];
  }
}
