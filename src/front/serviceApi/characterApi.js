export const getClasses = async (dispatch) => {
  const url = `https://www.dnd5eapi.co/api/2014/classes`;
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      console.error("Error al recibir de la API:", response.status, data);
      dispatch({ type: "set_classes", payload: [] });
      return {
        success: false,
        error: data?.error || `Error ${response.status} al consultar ${url}`,
      };
    }

    const classes = Array.isArray(data?.results) ? data.results : [];
    dispatch({ type: "set_classes", payload: classes });

    return { success: true, data: classes };
  } catch (err) {
    console.error("Fallo de red:", err);
    dispatch({ type: "set_classes", payload: [] });
    return { success: false, error: "No se pudo conectar con la API externa." };
  }
};
export const getRaces = async (dispatch) => {
  const url = `https://www.dnd5eapi.co/api/2014/races`;
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      console.error("Error al recibir de la API:", response.status, data);
      dispatch({ type: "set_races", payload: [] });
      return {
        success: false,
        error: data?.error || `Error ${response.status} al consultar ${url}`,
      };
    }

    const races = Array.isArray(data?.results) ? data.results : [];
    dispatch({ type: "set_races", payload: races });

    return { success: true, data: races };
  } catch (err) {
    console.error("Fallo de red:", err);
    dispatch({ type: "set_races", payload: [] });
    return { success: false, error: "No se pudo conectar con la API externa." };
  }
};
export const getBackgrounds = async (dispatch) => {
  const url = `https://www.dnd5eapi.co/api/2014/backgrounds`;
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      console.error("Error al recibir de la API:", response.status, data);
      dispatch({ type: "set_backgrounds", payload: [] });
      return {
        success: false,
        error: data?.error || `Error ${response.status} al consultar ${url}`,
      };
    }

    const backgrounds = Array.isArray(data?.results) ? data.results : [];
    dispatch({ type: "set_backgrounds", payload: backgrounds });

    return { success: true, data: backgrounds };
  } catch (err) {
    console.error("Fallo de red:", err);
    dispatch({ type: "set_backgrounds", payload: [] });
    return { success: false, error: "No se pudo conectar con la API externa." };
  }
};