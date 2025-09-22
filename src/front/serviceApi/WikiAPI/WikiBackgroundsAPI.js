const BASE_URL = "https://www.dnd5eapi.co/api/backgrounds";

export const getBackgroundsList = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data.results; // lista con { index, name, url }
  } catch (err) {
    console.error("Error fetching backgrounds list:", err);
    return [];
  }
};

// Función para obtener detalles completos del background
export const getBackgroundDetails = async (index) => {
  try {
    const res = await fetch(`${BASE_URL}/${index}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    // Aquí hacemos llamadas adicionales para feats, equipment o ability scores si existen
    let feat = null;
    let ability_scores = [];
    let equipment = [];

    // Ejemplo: si background tiene un feature con un feat (Magic Initiate, etc.)
    if (data.starting_proficiencies) {
      // Se puede mapear proficiencies
      const skills = data.starting_proficiencies.map(p => ({ name: p.name }));
      data.skill_proficiencies = skills;
    }

    if (data.starting_equipment) {
      equipment = data.starting_equipment.map(e => ({ name: e.equipment.name }));
    }

    // Si quieres traer feats específicos, tendrías que hacer fetch de cada URL
    if (data.feature) {
      feat = data.feature.name;
    }

    // Ability scores: algunos backgrounds no tienen, pero podemos simularlo o extraerlo
    if (data.language_options) {
      ability_scores = ["Intelligence", "Wisdom", "Charisma"]; // ejemplo fijo
    }

    return {
      ...data,
      feat,
      ability_scores,
      equipment,
      skill_proficiencies: data.skill_proficiencies || [],
      tool_proficiencies: data.starting_proficiencies?.filter(p => p.name.includes("Tool")) || [],
      feature: data.feature || null
    };
  } catch (err) {
    console.error(`Error fetching background ${index}:`, err);
    return null;
  }
};
