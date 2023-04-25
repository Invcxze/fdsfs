
let host = 'http://127.0.0.1:8000/19/api-cart/'
let headers = {
    'Content-Type': 'application/json'
}

export const login = async (UserData) => {
    const response = await fetch(
        `${host}/auth/login`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(UserData)
        }
        )
    return response.json()
}

export const signup = async (UserData) => {
    const response = await fetch(
        `${host}/auth/signup`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(UserData)
        })
    return response.json()
}

export const getProducts = async () => {
    const response = await fetch(
        `${host}/products`,
        {
            method: "GET",
            headers
        }
    )
    return response.json()
}

export const addToCart = async (productId, token) => {
    const response = await fetch(
        `${host}/cart/${productId}`,
        {
            method: "POST",
            headers: {...headers, 'Authorization': `Bearer ${token}`},
        }
    )
    return response.json()
}

export const getCart = async (token) => {
    const response = await fetch(
        `${host}/cart`,
        {
            method: 'GET',
            headers: { ...headers, 'Authorization': `Bearer ${token}`}

        }
    )

    return response.json()
}

export const deleteFromCart = async (token, id) => {
    const response = await fetch(
        `${host}/cart/${id}`,
        {
            method: 'DELETE',
            headers: { ...headers, 'Authorization': `Bearer ${token}`},
        }
    )
    return response.json()
}

export const createOrder = async (token) => {
    const response = await fetch(
        `${host}/order`,
        {
            method: 'POST',
            headers: { ...headers, 'Authorization': `Bearer ${token}`},
        }
    )
    return response.json()
}

export const getOrders = async (token) => {
    const response = await fetch(
        `${host}/order`,
        {
            method: 'GET',
            headers: { ...headers, 'Authorization': `Bearer ${token}`},
        }
    )
    return response.json()
}

export const logout = async (token) => {
    const response = await fetch(
        `${host}/logout`,
        {
            method: 'GET',
            headers: { ...headers, 'Authorization': `Bearer ${token}`},
        }
    )
    return response.json()
}