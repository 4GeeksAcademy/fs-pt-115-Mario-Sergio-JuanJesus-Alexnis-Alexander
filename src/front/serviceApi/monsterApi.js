export const createMonster = async (newMonster) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(`${urlApi}/api/user/monster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newMonster),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Error al crear Monstruo",
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

export const showMonster = async (monster_id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(`${urlApi}/api/user/monster/${monster_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Error al mostrar el monstruo",
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

export const updateMonster = async (updateMonster, monsterId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/monster/${monsterId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateMonster),
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

export const deleteMonster = async (monsterId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "No autenticado" };
  }
  try {
    const response = await fetch(
      `${urlApi}/api/user/monster/${monsterId}`,
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

export const getAllMonsters= async () => {
  try {
    const response = await fetch(`${urlApi}/api/user/monster`, {
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
