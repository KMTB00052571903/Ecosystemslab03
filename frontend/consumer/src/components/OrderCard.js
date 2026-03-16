export function OrderCard(order) {
  const card = document.createElement('div')
  card.className = `order-card ${order.status}`
  card.innerHTML = `
    <div class="order-header">
      <span class="order-id">Pedido #${order.id}</span>
      <span class="order-status ${order.status}">${order.status}</span>
    </div>
    <div class="order-details">
      <p><strong>Tienda:</strong> ${order.storeName}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    </div>
  `
  return card
}
