const BASE_URL = "https://www.dnd5eapi.co/api";

export const getFeatsList = async () => {
  try {
    const res = await fetch(`${BASE_URL}/feats`);
    if (!res.ok) throw new Error("Error fetching feats list");
    const data = await res.json();
    return data.results; // array con feats básicos { index, name, url }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFeatDetails = async (indexOrUrl) => {
  try {
    const url = indexOrUrl.startsWith("http") ? indexOrUrl : `${BASE_URL}/feats/${indexOrUrl}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching feat details");
    const data = await res.json();
    return data; // objeto completo del feat
  } catch (error) {
    console.error(error);
    return null;
  }
};