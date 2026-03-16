import { fetchProducts, updateProduct, deleteProduct } from '../services/api.js'
import { ProductCard } from '../components/ProductCard.js'
import { getSession } from '../context/session.js'

export async function renderProducts() {
  const productsGrid = document.getElementById('productsGrid')
  const loading = document.getElementById('loading')
  const noData = document.getElementById('noData')

  // Mostrar loading
  productsGrid.innerHTML = ''
  loading.classList.remove('hidden')
  noData.classList.add('hidden')

  try {
    const store = getSession()
    const products = await fetchProducts(store.id)

    loading.classList.add('hidden')
    productsGrid.innerHTML = ''

    if (!products || products.length === 0) {
      noData.classList.remove('hidden')
      return
    }

    products.forEach(product => {
      const card = ProductCard(product, async (updated) => {
        if (updated.deleted) {
          await deleteProduct(product.id)
        } else {
          await updateProduct(updated)
        }
        renderProducts() // refrescar lista
      })
      productsGrid.appendChild(card)
    })
  } catch (err) {
    loading.classList.add('hidden')
    productsGrid.innerHTML = '<p class="error-message">Error al cargar productos</p>'
  }
}
