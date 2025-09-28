const API_BASE = "https://www.dnd5eapi.co/api/monsters";
const IMAGE_BASE = "https://www.dnd5eapi.co"; // raíz para las imágenes

// lista básica de monsters
export async function fetchMonstersList() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener la lista de monsters");
    const data = await response.json();
    return data.results.map(monster => ({ index: monster.index, name: monster.name }));
  } catch (error) {
    console.error("❌ Error en fetchMonstersList:", error);
    return [];
  }
}

// detalles de un monster individual
export async function fetchMonsterDetails(index) {
  try {
    const res = await fetch(`${API_BASE}/${index}`);
    if (!res.ok) throw new Error(`Error en ${index}`);
    const details = await res.json();

    return {
      ...details,
      image: details.image ? `${IMAGE_BASE}${details.image}` : "",
    };
  } catch (err) {
    console.warn(`⚠️ No se pudo cargar el monster ${index}:`, err);
    return {
      index,
      name: "",
      type: "",
      size: "",
      alignment: "",
      image: "",
    };
  }
}
