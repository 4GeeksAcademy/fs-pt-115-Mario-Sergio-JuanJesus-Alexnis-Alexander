const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createNewSpecie = async (newSpecie) => {
    try {
        const response = await fetch (`${urlApi}/api/specie`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newSpecie)
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al crear Specie'
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

export const getSpecieById = async (specieId) => {
    try {
        const response = await fetch (`${urlApi}/api/specie/${specieId}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al obtener las Species'
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

export const updateSpecie = async (specieId, updateData) => {
    try{
        const response = await fetch (`${urlApi}/api/specie/${specieId}`, {
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
                error: data.error || 'Error al actualizar Specie'
            }
        }
        return {
            succes: true,
            data: data
        }
    } catch (error) {
        return {error: error.msg || 'Error de conexión'}
    }
};

export const deleteSpecie = async (specieId) => {
    try {
        const response = await fetch (`${urlApi}/api/specie/${specieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al eliminar Specie'                
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