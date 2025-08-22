// scripts/orderSummary.js

import { products, formatCurrency } from './products.js';

const orderListEl = document.getElementById('order-summary-list');
const orderTotalEl = document.getElementById('order-total');

function getPreviousCart() {
  return JSON.parse(sessionStorage.getItem('lastOrder')) || {};
}

function renderOrderSummary() {
  const cart = getPreviousCart();
  let total = 0;
  let html = '';

  Object.entries(cart).forEach(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const subtotal = quantity * product.priceCents;
    total += subtotal;

    html += `
      <p>${product.name} x ${quantity} — ${formatCurrency(subtotal)}</p>
    `;
  });

  orderListEl.innerHTML = html;
  orderTotalEl.textContent = formatCurrency(total);
}

renderOrderSummary();
