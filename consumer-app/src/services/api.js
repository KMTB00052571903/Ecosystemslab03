const API_URL = 'https://ecosystemslab03-backend.vercel.app'

// --- Autenticación ---
export async function loginUser(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Error en login')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function registerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Error en registro')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

// --- Tiendas ---
export async function fetchStores() {
  try {
    const res = await fetch(`${BASE_URL}/stores`)
    if (!res.ok) throw new Error('Error al obtener tiendas')
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

// --- Productos ---
export async function fetchProducts(storeId) {
  try {
    const res = await fetch(`${BASE_URL}/products?storeId=${storeId}`)
    if (!res.ok) throw new Error('Error al obtener productos')
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

// --- Órdenes ---
export async function fetchOrders(userId) {
  try {
    const res = await fetch(`${BASE_URL}/orders?userId=${userId}`)
    if (!res.ok) throw new Error('Error al obtener pedidos')
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function createOrder(orderData) {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    if (!res.ok) throw new Error('Error al crear pedido')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
