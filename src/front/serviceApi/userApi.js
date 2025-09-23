const urlApi = import.meta.env.VITE_BACKEND_URL;

export const signUp = async (newUser) => {
    try {
        const response = await fetch(`${urlApi}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    const data = await response.json()
    if (!response.ok) {
        return {
            success: false,
            error: data.msg || data.message || 'Error desconocido' 
        }
    }
    return {
        success: true,
        user: data.user,
        token: data.token
    }

    } catch (error) {
         return { error: error.msg }
    }
    
}

export const userLogin = async (loginUser) => {
    
    try {
        const response = await fetch(`${urlApi}/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    })
    const data = await response.json()
    if (!response.ok) {
        return {
            success: false,
            error: error.msg || data.error || 'Error desconocido'
        }
    }
    
    return data

    } catch (error) {
         return { error: error.msg,
            success: false
          }
    }
    
}

export const uploadImg = async (file, token) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
        const response = await fetch(`${urlApi}/api/user/upload-img`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const data = await response.json()
    if (!response.ok) {
        return {
            success: false,
            error: error.msg || data.error || 'Error desconocido'
        }
    }
    
    return data

    } catch (error) {
         return { error: error.msg,
            success: false
          }
    }
    
}