const API_BASE = "https://www.dnd5eapi.co/api/monsters";
const IMAGE_BASE = "https://www.dnd5eapi.co"; // raíz para las imágenes
const BATCH_SIZE = 8;
const DELAY_BETWEEN_BATCHES = 200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMonstersWithDetails() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener lista de monsters");
    const data = await response.json();

    const monstersWithDetails = [];

    for (let i = 0; i < data.results.length; i += BATCH_SIZE) {
      const batch = data.results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (monster) => {
        try {
          const detailRes = await fetch(`${API_BASE}/${monster.index}`);
          if (!detailRes.ok) throw new Error(`Error en ${monster.index}`);
          const details = await detailRes.json();

          return {
            ...details, // traemos todos los campos del monster
            // Convertir ruta relativa de la imagen en URL absoluta
            image: details.image ? `${IMAGE_BASE}${details.image}` : "",
          };
        } catch (err) {
          console.warn(`⚠️ No se pudo cargar ${monster.index}:`, err);
          return {
            index: monster.index,
            name: monster.name || "",
            type: "",
            size: "",
            alignment: "",
            image: "",
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      monstersWithDetails.push(...batchResults);

      if (i + BATCH_SIZE < data.results.length) {
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    return monstersWithDetails;
  } catch (error) {
    console.error("❌ Error en fetchMonstersWithDetails:", error);
    return [];
  }
}
