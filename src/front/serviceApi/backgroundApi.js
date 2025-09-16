const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createNewBackground = async (newBackground) => {
    try {
        const response = await fetch (`${urlApi}/api/background`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newBackground)
        })
        const data = await response.json()
        if (!response.ok) {
            return{
                success: false,
                error: data.error || 'Error al crear Background'
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

export const getBackgroundById = async (background_id) => {
    try {
        const response = await fetch (`${urlApi}/api/background/${background_id}`, {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al obtener el Background'
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

export const updateBackground = async (background_id, updateData) => {
    try {
        const response = await fetch (`${urlApi}/api/background/${background_id}`, {
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
                error: data.error || 'Error al actualizar el Background'
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

export const deleteBackground = async (background_id) => {
    try {
        const response = await fetch (`${urlApi}/api/background/${background_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al eliminar Background'     
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