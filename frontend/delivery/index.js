import { loginUser, registerUser, fetchOrders, acceptOrder } from './src/services/api.js'
import { setSession, clearSession, getSession } from './src/context/session.js'
import { renderOrders } from './src/pages/Orders.js'

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection')
  const mainSection = document.getElementById('mainSection')
  const userName = document.getElementById('userName')

  // --- Login ---
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('loginUsername').value
    const password = document.getElementById('loginPassword').value
    const user = await loginUser(username, password)
    if (user) {
      setSession(user)
      loginSection.classList.add('hidden')
      mainSection.classList.remove('hidden')
      userName.textContent = user.nombre || user.username
      renderOrders('pendiente')
    }
  })

  // --- Registro ---
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('registerUsername').value
    const password = document.getElementById('registerPassword').value
    const nombre = document.getElementById('registerName').value
    const telefono = document.getElementById('registerPhone').value
    const user = await registerUser({ username, password, nombre, telefono })
    if (user) {
      setSession(user)
      loginSection.classList.add('hidden')
      mainSection.classList.remove('hidden')
      userName.textContent = user.nombre || user.username
      renderOrders('pendiente')
    }
  })

  // --- Logout ---
  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession()
    mainSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
  })

  // --- Tabs de pedidos ---
  document.getElementById('pendingTab').addEventListener('click', () => renderOrders('pendiente'))
  document.getElementById('acceptedTab').addEventListener('click', () => renderOrders('aceptado'))
})
