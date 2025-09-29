const BASE_URL = "https://www.dnd5eapi.co/api/2014/";


export async function fetchAllSpecies() {
  try {
    const res = await fetch(`${BASE_URL}races/`);
    if (!res.ok) throw new Error("Error al obtener las especies");
    const data = await res.json();
    return data.results; 
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function fetchSpeciesDetails(speciesIndex) {
  try {
    const res = await fetch(`${BASE_URL}races/${speciesIndex}`);
    if (!res.ok) throw new Error("Error al obtener detalles de la especie");
    const data = await res.json();

    let traitsText = "None";
    if (data.traits && data.traits.length > 0) {
      traitsText = data.traits.map((t) => t.name).join(", ");
    }

    return {
      index: data.index,
      name: data.name,
      description: data.alignment, 
      traits: traitsText,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
