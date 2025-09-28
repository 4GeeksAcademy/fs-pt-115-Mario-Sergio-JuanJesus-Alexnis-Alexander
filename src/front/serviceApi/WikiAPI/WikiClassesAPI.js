const BASE_URL = "https://www.dnd5eapi.co/api/2014";

export const getClassesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/classes`);
    if (!response.ok) throw new Error("Error al obtener la lista de clases");
    const data = await response.json();
    return data.results; // [{ index, name, url }]
  } catch (error) {
    console.error("getClassesList error:", error);
    return [];
  }
};

export const getClassDetails = async (classUrl) => {
  try {
    const fullUrl = classUrl.startsWith("/api/2014") ? `https://www.dnd5eapi.co${classUrl}`
      : classUrl.startsWith("/classes") ? `${BASE_URL}${classUrl}`
      : `${BASE_URL}/classes/${classUrl}`;

    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Error al obtener detalles de la clase (${fullUrl})`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getClassDetails error:", error);
    return null;
  }
};

export const getClassLevels = async (classIndex) => {
  try {
    const response = await fetch(`${BASE_URL}/classes/${classIndex}/levels`);
    if (!response.ok) throw new Error(`Error al obtener niveles de ${classIndex}`);
    const data = await response.json();

    
    return data.map(lvl => ({
      level: lvl.level,
      prof_bonus: lvl.prof_bonus,
      features: lvl.features ?? [],
      rage_count: lvl.class_specific?.rage_count ?? null,
      rage_damage: lvl.class_specific?.rage_damage_bonus ?? null,
      weapon_mastery: lvl.class_specific?.weapon_mastery ?? null,
    }));
  } catch (error) {
    console.error("getClassLevels error:", error);
    return [];
  }
};
