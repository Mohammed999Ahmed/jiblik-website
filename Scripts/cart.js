// scripts/cart.js

import { products, formatCurrency } from './products.js';

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  let total = 0;
  let html = '';

  Object.keys(cart).forEach(productId => {
    const quantity = cart[productId];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const subtotal = quantity * product.priceCents;
    total += subtotal;

    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Quantity: 
          <button onclick="changeQuantity('${productId}', -1)">-</button>
          ${quantity}
          <button onclick="changeQuantity('${productId}', 1)">+</button>
        </p>
        <p>${formatCurrency(subtotal)}</p>
        <button onclick="removeItem('${productId}')">Remove</button>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = html;
  cartTotalEl.textContent = formatCurrency(total);
}

window.changeQuantity = function(productId, change) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + change;
  if (cart[productId] <= 0) {
    delete cart[productId];
  }
  saveCart(cart);
  renderCart();
};

window.removeItem = function(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  renderCart();
};

renderCart();
