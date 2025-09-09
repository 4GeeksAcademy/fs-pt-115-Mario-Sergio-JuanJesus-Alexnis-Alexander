import { data } from "@remix-run/router";

const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createMagicItem = async (newMagicItem) => {

    try {
        const response = await fetch(`${urlApi}/api/user/magics-items`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newMagicItem)
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al crear Item Magico'
            }
        }

        return {
        success: true,
        data: data,
        msg: data.msg
    }

    } catch (error) {
        return {
            success: false, 
            error: error.message }
    }
}

export const showMagicItem = async (itemId) => {
    try {
        const response = await fetch(`${urlApi}/user/magics-items/${itemId}`, {
            method: 'GET',
            headers: {
                'Autorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Error al mostrar el articulo magico'
            }
        }

        return {
            success: true,
            data: data,
            msg: data.msg
        }

    } catch (error) {
        return {
            success: false, 
            error: error.message }
    }
}

export const updateMagicItem = async (updateItem, itemId) => {
    try {
        const response = await fetch(`${urlApi}/user/magics-items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Autorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updateItem)
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
        data: data,
        msg: data.msg
    }

    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const deleteMagicItem = async (itemId) => {

    try {
        const response = await fetch(`${urlApi}/user/magics-items/${itemId}`, {
        method: 'DELETE',
        headers: {
                'Autorization': `Bearer ${localStorage.getItem('token')}`
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
        msg: data.msg
    }

    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
    
}

export const showAllMMagicItems = async () => {
    try {
        const response = await fetch(`${urlApi}/user/magics-items`, {
            method: 'GET',
            headers: {
                'Autorization': `Bearer ${localStorage.getItem('token')}`
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