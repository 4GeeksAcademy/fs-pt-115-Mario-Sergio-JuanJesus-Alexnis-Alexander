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
        token: data.token
    }

    } catch (error) {
        return {
            success: false, 
            error: error.message }
    }
}

export const showMagicItem = async () => {
    try {
        const response = await fetch(`${urlApi}/user/magics-items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Autorizathion': `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await response.json()

        

    } catch (error) {
        
    }
}