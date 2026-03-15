import { acceptOrder } from '../services/api.js'
import { getSession } from '../context/session.js'

export function OrderCard(order) {
  const card = document.createElement('div')
  card.className = `order-card ${order.estado}`

  card.innerHTML = `
    <div class="order-header">
      <span class="order-id">Pedido #${order.id}</span>
      <span class="order-status ${order.estado}">${order.estado}</span>
    </div>
    <div class="order-details">
      <div class="order-store">
        <i class="ri-store-2-line store-icon"></i>
        <span class="store-name">${order.storeName}</span>
      </div>
      <div class="order-customer">
        <h4>Cliente</h4>
        <div class="customer-info">
          <div class="customer-name"><i class="ri-user-line"></i> ${order.customerName}</div>
          <div class="customer-phone"><i class="ri-phone-line"></i> ${order.customerPhone}</div>
          <div class="customer-address"><i class="ri-map-pin-line"></i> ${order.customerAddress}</div>
        </div>
      </div>
      <div class="order-products">
        <h4>Productos</h4>
        ${order.products.map(p => `
          <div class="product-item">
            <span class="product-name">${p.name}</span>
            <span class="product-quantity">x${p.quantity}</span>
          </div>
        `).join('')}
      </div>
      <div class="order-meta">
        <span class="order-total">Total: $${order.total}</span>
        <span class="order-time">${new Date(order.createdAt).toLocaleString()}</span>
      </div>
    </div>
    <div class="order-actions">
      <button class="btn-accept" ${order.estado === 'aceptado' ? 'disabled' : ''}>Aceptar</button>
      <button class="btn-view-details">Ver Detalles</button>
    </div>
  `

  // Acción: aceptar pedido
  card.querySelector('.btn-accept').addEventListener('click', async () => {
    const repartidor = getSession()
    await acceptOrder(order.id, repartidor.id)
    alert(`Pedido #${order.id} aceptado`)
    card.querySelector('.order-status').textContent = 'aceptado'
    card.querySelector('.order-status').classList.remove('pendiente')
    card.querySelector('.order-status').classList.add('aceptado')
    card.querySelector('.btn-accept').disabled = true
  })

  // Acción: ver detalles
  card.querySelector('.btn-view-details').addEventListener('click', () => {
    alert(`Detalles del pedido #${order.id}\nCliente: ${order.customerName}\nTotal: $${order.total}`)
  })

  return card
}
