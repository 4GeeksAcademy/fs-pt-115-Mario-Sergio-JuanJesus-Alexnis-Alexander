const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createNewSubclasses = async (newSubclasses) => {
    try {
        const response = await fetch (`${urlApi}/api/subclasses`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newSubclasses)
        })
        const data = await response.json()
        if (!response.ok) {
            return{
                success: false,
                error: data.error || 'Error al crear Subclasses'
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

export const getSubclassesById = async (subclasses_id) => {
    try {
        const response = await fetch (`${urlApi}/api/subclasses/${subclasses_id}`, {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al obtener Subclasses'
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

export const updateSubclasses = async (subclasses_id, updateData) => {
    try {
        const response = await fetch (`${urlApi}/api/subclasses/${subclasses_id}`, {
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
                error: data.error || 'Error al actualizar la Subclasses'
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

export const deleteSubclasses = async (subclasses_id) => {
    try {
        const response = await fetch (`${urlApi}/api/subclasses/${subclasses_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al eliminar Subclasses'     
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

export const getAllSubclasses = async () => {
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