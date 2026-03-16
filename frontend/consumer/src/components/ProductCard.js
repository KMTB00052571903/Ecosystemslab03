import { addToCart } from '../context/session.js'

export function ProductCard(product) {
  const card = document.createElement('div')
  card.className = 'product-card'
  card.innerHTML = `
    <img src="${product.image || 'placeholder.png'}" class="product-image" />
    <div class="product-content">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description || ''}</p>
      <div class="product-footer">
        <span class="product-price">$${product.price}</span>
        <button class="btn-add-to-cart">Agregar</button>
      </div>
    </div>
  `
  card.querySelector('.btn-add-to-cart').addEventListener('click', () => {
    addToCart(product)
    alert(`${product.name} agregado al carrito`)
  })
  return card
}
