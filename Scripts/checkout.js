import { products, formatCurrency } from './products.js';
import'../data/backend-practice.js';


const summaryContainer = document.getElementById('summary-items');
const summaryTotalEl = document.getElementById('summary-total');
const checkoutForm = document.getElementById('checkout-form');

// --- Helpers ---
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

function clearCart() {
  localStorage.removeItem('cart');
}

// --- Delivery ---
let deliveryCostCents = 0;

function getCartTotalCents() {
  const cart = getCart();
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = products.find(p => p.id === id);
    return prod ? sum + prod.priceCents * qty : sum;
  }, 0);
}

function updateDeliveryCost() {
  const selected = document.querySelector('input[name="delivery"]:checked');
  deliveryCostCents = selected ? Math.round(parseFloat(selected.value) * 100) : 0;

  const totalCents = getCartTotalCents() + deliveryCostCents;
  summaryTotalEl.textContent = formatCurrency(totalCents);
}

// --- Summary UI ---
function renderSummary() {
  const cart = getCart();
  let html = '';
  Object.entries(cart).forEach(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const subtotal = quantity * product.priceCents;
    html += `<p>${product.name} x ${quantity} — ${formatCurrency(subtotal)}</p>`;
  });
  summaryContainer.innerHTML = html;
}

// --- Form Submit ---
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !address) {
    alert('Please fill out all required fields.');
    return;
  }

  const deliveryLabel = document.querySelector('input[name="delivery"]:checked')?.parentElement?.innerText.trim() || '';
  const cart = getCart();
  const totalCents = getCartTotalCents() + deliveryCostCents;

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push({
    cart,
    delivery: deliveryLabel,
    total: totalCents / 100
  });

  localStorage.setItem('orders', JSON.stringify(orders));
  sessionStorage.setItem('lastOrder', JSON.stringify({
    cart,
    delivery: deliveryLabel,
    total: totalCents / 100
  }));

  alert('✅ Order placed successfully!');
  clearCart();
  window.location.href = 'orders.html';
});

// --- Init ---
renderSummary();
updateDeliveryCost();
document.getElementById('delivery-options').addEventListener('change', updateDeliveryCost);
