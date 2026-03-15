let currentStore = null

// --- Manejo de sesión de tienda ---
export function setSession(store) {
  currentStore = store
}

export function getSession() {
  return currentStore
}

export function clearSession() {
  currentStore = null
}
