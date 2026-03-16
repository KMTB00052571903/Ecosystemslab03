import { renderProducts } from '../pages/Products.js'

export function StoreCard(store) {
  const card = document.createElement('div')
  card.className = 'store-card'
  card.innerHTML = `
    <div class="store-header">
      <i class="ri-store-2-line store-icon"></i>
      <div>
        <h3 class="store-name">${store.name}</h3>
        <p class="store-category">${store.category}</p>
      </div>
    </div>
    <p class="store-description">${store.description || 'Sin descripción'}</p>
    <div class="store-meta">
      <span class="store-delivery">🚚 ${store.deliveryTime || '30 min'}</span>
      <span class="store-rating">⭐ ${store.rating || '4.5'}</span>
    </div>
  `
  card.addEventListener('click', () => {
    document.getElementById('storesSection').classList.add('hidden')
    document.getElementById('storeProductsSection').classList.remove('hidden')
    renderProducts(store.id, store.name)
  })
  return card
}
