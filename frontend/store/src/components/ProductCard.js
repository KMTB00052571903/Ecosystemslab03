export function ProductCard(product, onUpdate) {
  const card = document.createElement('div')
  card.className = 'card-item'

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>Precio: $${product.price}</p>
    <p>Stock: ${product.stock}</p>
    <div class="actions">
      <button class="btn primary">Editar</button>
      <button class="btn secondary">Eliminar</button>
    </div>
  `

  // Acción: editar producto
  card.querySelector('.btn.primary').addEventListener('click', () => {
    const nuevoNombre = prompt('Nuevo nombre:', product.name)
    const nuevoPrecio = prompt('Nuevo precio:', product.price)
    const nuevoStock = prompt('Nuevo stock:', product.stock)
    if (nuevoNombre && nuevoPrecio && nuevoStock) {
      onUpdate({ ...product, name: nuevoNombre, price: nuevoPrecio, stock: nuevoStock })
    }
  })

  // Acción: eliminar producto
  card.querySelector('.btn.secondary').addEventListener('click', () => {
    if (confirm(`¿Eliminar producto ${product.name}?`)) {
      onUpdate({ ...product, deleted: true })
    }
  })

  return card
}
