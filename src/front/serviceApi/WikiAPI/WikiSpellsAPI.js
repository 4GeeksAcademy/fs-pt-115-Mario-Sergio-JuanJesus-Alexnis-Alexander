const API_BASE = "https://www.dnd5eapi.co/api/spells";
const BATCH_SIZE = 8; 
const DELAY_BETWEEN_BATCHES = 200; 

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchSpellsWithDetails() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener la lista de hechizos");
    const data = await response.json();

    const spellsWithDetails = [];

    for (let i = 0; i < data.results.length; i += BATCH_SIZE) {
      const batch = data.results.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (sp) => {
        try {
          const detailRes = await fetch(`${API_BASE}/${sp.index}`);
          if (!detailRes.ok) throw new Error(`Error en ${sp.index}`);
          const details = await detailRes.json();

          let attackOrSave = "";
          if (details.attack_type) attackOrSave = details.attack_type;
          else if (details.dc?.dc_type?.name) attackOrSave = details.dc.dc_type.name.toUpperCase();

          return {
            index: details.index,
            name: details.name || "",
            level: details.level ?? "",
            casting_time: details.casting_time || "",
            duration: details.duration || "",
            range: details.range || "",
            attack: attackOrSave,
            effect: details.damage?.damage_type?.name || "",
            // NUEVOS CAMPOS
            school: details.school?.name || "",
            components: details.components?.join(", ") || "",
            classes: details.classes?.map(c => c.name).join(", ") || "",
            desc: details.desc?.join(" ") || "", // descripcion completa
          };
        } catch (err) {
          console.warn(`⚠️ No se pudo cargar el hechizo ${sp.index}:`, err);
          return {
            index: sp.index,
            name: sp.name || "",
            level: "",
            casting_time: "",
            duration: "",
            range: "",
            attack: "",
            effect: "",
            school: "",
            components: "",
            classes: "",
            desc: "",
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      spellsWithDetails.push(...batchResults);

      if (i + BATCH_SIZE < data.results.length) {
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    return spellsWithDetails;
  } catch (error) {
    console.error("❌ Error en fetchSpellsWithDetails:", error);
    return [];
  }
}
