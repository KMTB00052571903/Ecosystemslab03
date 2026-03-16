let currentUser = null

// --- Manejo de sesión ---
export function setSession(user) {
  currentUser = user
}

export function getSession() {
  return currentUser
}

export function clearSession() {
  currentUser = null
}
