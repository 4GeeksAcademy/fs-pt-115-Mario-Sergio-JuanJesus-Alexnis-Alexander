const API_BASE = "https://www.dnd5eapi.co/api/magic-items";
const IMAGE_BASE = "https://www.dnd5eapi.co"; 

export async function fetchMagicItemsList() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener lista de magic items");
    const data = await response.json();
    // Solo devolver index y name
    return data.results.map(item => ({ index: item.index, name: item.name }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMagicItemDetails(index) {
  try {
    const response = await fetch(`${API_BASE}/${index}`);
    if (!response.ok) throw new Error(`Error en ${index}`);
    const details = await response.json();
    return {
      index: details.index,
      name: details.name || "",
      equipment_category: details.equipment_category?.name || "",
      variant: details.variant ?? false,
      desc: details.desc || [],
      image: details.image ? `${IMAGE_BASE}${details.image}` : "",
    };
  } catch (error) {
    console.warn(`No se pudo cargar ${index}:`, error);
    return { index, name: "", equipment_category: "", variant: false, desc: [], image: "" };
  }
}
