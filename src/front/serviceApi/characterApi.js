const urlApi = import.meta.env.VITE_BACKEND_URL;
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

export const createCharacter = async (newCharacter) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(`${urlApi}/api/user/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCharacter),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Error al crear Personaje",
      };
    }

    return {
      success: true,
      data: data,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const showCharacter = async (char_id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(`${urlApi}/api/user/characters/${char_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Error al mostrar el personaje",
      };
    }

    return {
      success: true,
      data: data,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateCharacter = async (updateCharacter, characterId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/characters/${characterId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateCharacter),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      data: data,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteCharacter = async (characterId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/characters/${characterId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      msg: data.msg,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getAllCharacters = async () => {
  try {
    const response = await fetch(`${urlApi}/api/user/characters`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    

    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
