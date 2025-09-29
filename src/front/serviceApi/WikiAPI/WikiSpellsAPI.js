const API_BASE = "https://www.dnd5eapi.co/api/spells";

// lista básica de hechizos
export async function fetchSpellsList() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Error al obtener la lista de hechizos");
    const data = await response.json();
    return data.results.map(sp => ({ index: sp.index, name: sp.name }));
  } catch (error) {
    console.error("❌ Error en fetchSpellsList:", error);
    return [];
  }
}

// detalles de un hechizo individual
export async function fetchSpellDetails(index) {
  try {
    const res = await fetch(`${API_BASE}/${index}`);
    if (!res.ok) throw new Error(`Error en ${index}`);
    const details = await res.json();

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
      school: details.school?.name || "",
      components: details.components?.join(", ") || "",
      classes: details.classes?.map(c => c.name).join(", ") || "",
      desc: details.desc?.join(" ") || "",
    };
  } catch (err) {
    console.warn(`⚠️ No se pudo cargar el hechizo ${index}:`, err);
    return {
      index,
      name: "",
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
}
