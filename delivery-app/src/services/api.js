const BASE_URL = 'http://localhost:3000' // Ajustar para el backend

// --- Autenticación Repartidor ---
export async function loginUser(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/repartidores/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Error en login')
    return (await res.json()).repartidor
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function registerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/repartidores/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Error en registro')
    return (await res.json()).repartidor
  } catch (err) {
    console.error(err)
    return null
  }
}

// --- Pedidos ---
export async function fetchOrders(status, repartidorId) {
  try {
    const res = await fetch(`${BASE_URL}/pedidos?estado=${status}&repartidorId=${repartidorId}`)
    if (!res.ok) throw new Error('Error al obtener pedidos')
    return (await res.json()).pedidos
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function acceptOrder(orderId, repartidorId) {
  try {
    const res = await fetch(`${BASE_URL}/pedidos/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'aceptado', repartidorId })
    })
    if (!res.ok) throw new Error('Error al aceptar pedido')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
