const urlApi = import.meta.env.VITE_BACKEND_URL;

export const signUp = async (newUser) => {
    try {
        const response = await fetch(`${urlApi}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json'
        },
        body: JSON.stringify(newUser)
    })
    const data = await response.json()
    if (!response.ok) {
        return {
            success: false,
            error: 'Error desconocido' || error.msg
        }
    }
    return {
        success: true,
        data: data,
        token: data.token
    }

    } catch (error) {
         return { error: error.msg }
    }
    
}