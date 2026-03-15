const BASE_URL = 'http://localhost:3000' // Ajustar para el backend

// --- Autenticación Tienda ---
export async function loginStore(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/tiendas/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Error en login')
    return (await res.json()).tienda
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function registerStore(data) {
  try {
    const res = await fetch(`${BASE_URL}/tiendas/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Error en registro')
    return (await res.json()).tienda
  } catch (err) {
    console.error(err)
    return null
  }
}

// --- Productos ---
export async function fetchProducts(storeId) {
  try {
    const res = await fetch(`${BASE_URL}/productos?storeId=${storeId}`)
    if (!res.ok) throw new Error('Error al obtener productos')
    return (await res.json()).productos
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function updateProduct(product) {
  try {
    const res = await fetch(`${BASE_URL}/productos/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    if (!res.ok) throw new Error('Error al actualizar producto')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/productos/${productId}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar producto')
    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

// --- Pedidos de la tienda ---
export async function fetchStoreOrders(storeId) {
  try {
    const res = await fetch(`${BASE_URL}/pedidos?storeId=${storeId}`)
    if (!res.ok) throw new Error('Error al obtener pedidos')
    return (await res.json()).pedidos
  } catch (err) {
    console.error(err)
    return []
  }
}
