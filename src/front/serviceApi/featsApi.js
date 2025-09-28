const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createNewFeats = async (newFeats) => {
    try {
        const response = await fetch (`${urlApi}/api/feats`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newFeats)
        })
        const data = await response.json()
        if (!response.ok) {
            return{
                success: false,
                error: data.error || 'Error al crear Feats'
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

export const  getFeatsbyId = async (feats_id) => {
    try {
        const response = await fetch (`${urlApi}/api/feats/${feats_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al obtener Feats'
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

export const updateFeats = async (featsId, updateData) => {
    try {
        const response = await fetch (`${urlApi}/api/feats(${featsId})`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': `Bearer ${localStorage.getItem(token)}`
            },
            body: JSON.stringify(updateData)
        })
        const data = await response.json();
        if (!response.ok){
            return {
                success: false,
                error: data.error || 'Error al actualizar Feats'
            }
        }
        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {error: error.msg || 'Error de conexión'}
    }
};

export const deleteFeats = async (featsId) => {
    try {
        const response = await fetch (`${urlApi}/api/feats/${featsId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al eliminar Feats'   
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

export const getAllFeats = async () => {
    try {
        const response = await fetch(`${urlApi}/api/subclasses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
    })

    const data = await response.json()

    if (!response.ok) {
        return {
            success: false,
            error: data.error
        }
    }

    return {
        success: true,
        data: data
    }
} catch (error) {
    return {
            success: false,
            error: error.message
        }
    }
}