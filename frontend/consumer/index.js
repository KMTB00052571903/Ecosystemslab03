import { loginUser, registerUser } from './services/api.js'
import { renderStores } from './pages/Stores.js'
import { renderOrders } from './pages/Orders.js'
import { clearSession, setSession } from './context/session.js'

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection')
  const mainSection = document.getElementById('mainSection')
  const userDisplay = document.getElementById('userDisplay')

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
      userDisplay.textContent = user.username
      renderStores()
    }
  })

  // --- Registro ---
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('registerUsername').value
    const password = document.getElementById('registerPassword').value
    const email = document.getElementById('registerEmail').value

    const user = await registerUser({ username, password, email })
    if (user) {
      setSession(user)
      loginSection.classList.add('hidden')
      mainSection.classList.remove('hidden')
      userDisplay.textContent = user.username
      renderStores()
    }
  })

  // --- Logout ---
  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession()
    mainSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
  })

  // --- Navegación Tabs ---
  document.getElementById('storesTab').addEventListener('click', () => {
    renderStores()
    toggleTab('storesSection')
  })

  document.getElementById('ordersTab').addEventListener('click', () => {
    renderOrders()
    toggleTab('myOrdersSection')
  })
})

// --- Utilidad para cambiar secciones ---
function toggleTab(sectionId) {
  document.querySelectorAll('.content').forEach(sec => sec.classList.add('hidden'))
  document.getElementById(sectionId).classList.remove('hidden')

  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'))
  if (sectionId === 'storesSection') document.getElementById('storesTab').classList.add('active')
  if (sectionId === 'myOrdersSection') document.getElementById('ordersTab').classList.add('active')
}
