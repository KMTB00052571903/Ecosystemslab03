// Elementos del DOM
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const successMsg = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// URL del backend
const API_URL = 'https://ecosystemslab03-backend.vercel.app';

/**
 * Verificar el estado del backend
 */
async function checkBackend() {
  loading.classList.remove('hidden');

  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    
    loading.classList.add('hidden');
    
    if (response.ok) {
      showSuccess('✅ Backend conectado correctamente');
    } else {
      showError('⚠️ Error al conectar con el backend');
    }
  } catch (error) {
    loading.classList.add('hidden');
    showError('❌ Backend no disponible');
  }
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccess(message) {
  successText.textContent = message;
  successMsg.classList.remove('hidden');
  setTimeout(() => successMsg.classList.add('hidden'), 3000);
}

/**
 * Mostrar mensaje de error
 */
function showError(message) {
  errorText.textContent = message;
  errorMsg.classList.remove('hidden');
  setTimeout(() => errorMsg.classList.add('hidden'), 3000);
}

/**
 * Obtener estadísticas (opcional - para mostrar datos reales)
 */
async function fetchStats() {
  try {
    // Ejemplo: contar tiendas, productos, etc.
    const [storesRes, productsRes, ordersRes] = await Promise.all([
      fetch(`${API_URL}/stores`).catch(() => ({ ok: false })),
      fetch(`${API_URL}/products`).catch(() => ({ ok: false })),
      fetch(`${API_URL}/orders`).catch(() => ({ ok: false }))
    ]);

    // Actualizar estadísticas si los elementos existen
    const storesCount = document.getElementById('storesCount');
    const productsCount = document.getElementById('productsCount');
    const ordersCount = document.getElementById('ordersCount');

    if (storesCount && storesRes.ok) {
      const stores = await storesRes.json();
      storesCount.textContent = stores.length || '0';
    }

    if (productsCount && productsRes.ok) {
      const products = await productsRes.json();
      productsCount.textContent = products.length || '0';
    }

    if (ordersCount && ordersRes.ok) {
      const orders = await ordersRes.json();
      ordersCount.textContent = orders.length || '0';
    }
  } catch (error) {
    console.log('No se pudieron cargar las estadísticas');
  }
}

/**
 * Inicialización
 */
function init() {
  // Verificar backend automáticamente
  checkBackend();
  
  // Cargar estadísticas (opcional - comentar si no se usan)
  // fetchStats();
  
  // Agregar evento al botón de verificar si existe
  const verifyBtn = document.getElementById('verifyBackendBtn');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      checkBackend();
    });
  }
  
  console.log('🚀 Página principal inicializada');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);