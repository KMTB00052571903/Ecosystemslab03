let currentUser = null
let cart = []

export function setSession(user) {
  currentUser = user
}

export function getSession() {
  return currentUser
}

export function clearSession() {
  currentUser = null
  cart = []
}

export function addToCart(product) {
  cart.push(product)
}

export function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId)
}

export function getCart() {
  return cart
}

export function clearCart() {
  cart = []
}
