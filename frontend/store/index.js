import { loginStore, registerStore, fetchProducts, fetchStoreOrders } from './src/services/api.js'
import { setSession, clearSession, getSession } from './src/context/session.js'
import { renderProducts } from './src/pages/Products.js'
import { renderOrders } from './src/pages/Orders.js'

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection')
  const mainSection = document.getElementById('mainSection')
  const storeName = document.getElementById('storeName')

  // --- Login ---
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('loginUsername').value
    const password = document.getElementById('loginPassword').value
    const store = await loginStore(username, password)
    if (store) {
      setSession(store)
      loginSection.classList.add('hidden')
      mainSection.classList.remove('hidden')
      storeName.textContent = store.nombre || store.username
      renderProducts()
    }
  })

  // --- Registro ---
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('registerUsername').value
    const password = document.getElementById('registerPassword').value
    const nombre = document.getElementById('registerStoreName').value
    const direccion = document.getElementById('registerAddress').value
    const store = await registerStore({ username, password, nombre, direccion })
    if (store) {
      setSession(store)
      loginSection.classList.add('hidden')
      mainSection.classList.remove('hidden')
      storeName.textContent = store.nombre || store.username
      renderProducts()
    }
  })

  // --- Logout ---
  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession()
    mainSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
  })

  // --- Tabs ---
  document.getElementById('productsTab').addEventListener('click', () => {
    document.getElementById('productsGrid').classList.remove('hidden')
    document.getElementById('ordersGrid').classList.add('hidden')
    renderProducts()
  })

  document.getElementById('ordersTab').addEventListener('click', () => {
    document.getElementById('ordersGrid').classList.remove('hidden')
    document.getElementById('productsGrid').classList.add('hidden')
    renderOrders()
  })
})
