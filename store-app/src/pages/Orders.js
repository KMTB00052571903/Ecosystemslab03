import { fetchStoreOrders } from '../services/api.js'
import { OrderCard } from '../components/OrderCard.js'
import { getSession } from '../context/session.js'

export async function renderOrders() {
  const ordersGrid = document.getElementById('ordersGrid')
  const loading = document.getElementById('loading')
  const noData = document.getElementById('noData')

  // Mostrar loading
  ordersGrid.innerHTML = ''
  loading.classList.remove('hidden')
  noData.classList.add('hidden')

  try {
    const store = getSession()
    const orders = await fetchStoreOrders(store.id)

    loading.classList.add('hidden')
    ordersGrid.innerHTML = ''

    if (!orders || orders.length === 0) {
      noData.classList.remove('hidden')
      return
    }

    orders.forEach(order => {
      ordersGrid.appendChild(OrderCard(order))
    })
  } catch (err) {
    loading.classList.add('hidden')
    ordersGrid.innerHTML = '<p class="error-message">Error al cargar pedidos</p>'
  }
}
