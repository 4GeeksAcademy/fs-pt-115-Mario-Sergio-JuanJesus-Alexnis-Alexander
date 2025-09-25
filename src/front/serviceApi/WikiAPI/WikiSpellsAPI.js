const API_BASE = "https://www.dnd5eapi.co/api/spells";

// 👉 Función que carga todos los spells con sus detalles básicos
export async function fetchSpellsWithDetails() {
  try {
    // 1. Obtener lista de hechizos
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener la lista de hechizos");
    const data = await response.json();

    // 2. Obtener detalles de cada hechizo
    const spellsWithDetails = await Promise.all(
      data.results.map(async (sp) => {
        try {
          const detailRes = await fetch(`${API_BASE}/${sp.index}`);
          if (!detailRes.ok) throw new Error(`Error en ${sp.index}`);
          const details = await detailRes.json();

          // 3. Devolver solo lo que necesitas en la carta
          return {
            index: details.index,
            name: details.name,
            level: details.level,
            casting_time: details.casting_time,
            duration: details.duration,
            range: details.range,
            attack: details.attack_type || "N/A",
            effect: details.damage?.damage_type?.name || details.dc?.dc_type?.name || "N/A",
          };
        } catch (err) {
          console.error(`❌ Error en hechizo ${sp.index}`, err);
          return null;
        }
      })
    );

    return spellsWithDetails.filter(s => s !== null);
  } catch (error) {
    console.error("❌ Error en fetchSpellsWithDetails:", error);
    return [];
  }
}
