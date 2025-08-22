function updateCartQuantity() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const quantity = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const el = document.querySelector('.js-cart-quantity');
  if (el) el.textContent = quantity;
}

updateCartQuantity();
