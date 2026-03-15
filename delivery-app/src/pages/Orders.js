import { fetchOrders } from '../services/api.js'
import { OrderCard } from '../components/OrderCard.js'
import { getSession } from '../context/session.js'

export async function renderOrders(status = 'pendiente') {
  const ordersGrid = document.getElementById('ordersGrid')
  const loading = document.getElementById('loading')
  const noOrders = document.getElementById('noOrders')

  // Mostrar loading
  ordersGrid.innerHTML = ''
  loading.classList.remove('hidden')
  noOrders.classList.add('hidden')

  try {
    const repartidor = getSession()
    const orders = await fetchOrders(status, repartidor.id)

    loading.classList.add('hidden')
    ordersGrid.innerHTML = ''

    if (!orders || orders.length === 0) {
      noOrders.classList.remove('hidden')
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
