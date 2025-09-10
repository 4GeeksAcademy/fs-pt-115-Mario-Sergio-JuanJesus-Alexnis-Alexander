const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createNewSpell =  async (newSpell) => {
    try {
        const response = await fetch (`${urlApi}/api/user/spell`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newSpell)
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al crear Hechizo'
            }
        }
        return {
            success: true,
            data: data,
            token: data.token
        }
    } catch (error) {
        return {error: error.msg}
    }
};

export const getSpellById = async (spellId) => {
    try {
        const response = await fetch (`${urlApi}/api/user/spell/${spellId}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al obtener los Hechizos'
            }
        }
        return{
            success: true,
            data: data
        }
    } catch (error) {
        return {error: error.msg || 'Error de conexión'}
    }
};


export const updateSpell = async (spellId, updateData ) => {
    try {
        const response = await fetch (`${urlApi}/api/user/spell/${spellId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': `Bearer ${localStorage.getItem(token)}`
            },
            body: JSON.stringify(updateData)
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al actualizar el Hechizo'
            }
        }
        return {
            succes: true,
            data: data
        }
    } catch (error) {
        return { error: error.msg || 'Error de conexión' }
    }
}

export const deleteSpell = async (spellId) => {
    try {
        const response = await fetch (`${urlApi}/spell/${spellId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al eliminar el Hechizo'
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {error: error.msg} || 'Error de conexión'
    }
}
