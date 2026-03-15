export function OrderCard(order) {
  const card = document.createElement('div')
  card.className = 'card-item'

  card.innerHTML = `
    <h3>Pedido #${order.id}</h3>
    <p>Cliente: ${order.customerName}</p>
    <p>Total: $${order.total}</p>
    <p>Estado: ${order.estado}</p>
    <div class="actions">
      <button class="btn primary">Marcar como preparado</button>
    </div>
  `

  // Acción: marcar pedido como preparado
  card.querySelector('.btn.primary').addEventListener('click', () => {
    alert(`Pedido #${order.id} marcado como preparado`)
    card.querySelector('p:nth-child(4)').textContent = 'Estado: preparado'
  })

  return card
}

