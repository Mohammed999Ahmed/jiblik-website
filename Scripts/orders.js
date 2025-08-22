import { formatCurrency, products } from './products.js';

const ordersContainer = document.getElementById('orders-container');
const orders = JSON.parse(localStorage.getItem('orders')) || [];

function renderOrders() {
  ordersContainer.innerHTML = '';

  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');

    let itemsHTML = '';
    let total = 0;

    // ✅ Safe check for malformed or missing cart
    if (order.cart && typeof order.cart === 'object') {
      Object.entries(order.cart).forEach(([productId, qty]) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const subtotal = qty * product.priceCents;
        total += subtotal;
        itemsHTML += `<li>${product.name} x ${qty} — ${formatCurrency(subtotal)}</li>`;
      });
    } else {
      itemsHTML += `<li><em>Cart data missing</em></li>`;
    }

    // Use saved total if provided
    if (order.total) {
      total = order.total * 100;
    }

    const deliveryHTML = order.delivery
      ? `<p><strong>Delivery:</strong> ${order.delivery}</p>`
      : '';

    orderDiv.innerHTML = `
      <h3>Order #${index + 1}</h3>
      <ul>${itemsHTML}</ul>
      ${deliveryHTML}
      <p><strong>Total:</strong> ${formatCurrency(total)}</p>
      <button class="cancel-button" data-index="${index}">Cancel / Refund</button>
      <hr/>
    `;

    ordersContainer.appendChild(orderDiv);
  });
}

function handleCancel(index) {
  if (confirm('Are you sure you want to cancel this order?')) {
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
  }
}

ordersContainer.addEventListener('click', event => {
  if (event.target.classList.contains('cancel-button')) {
    const index = parseInt(event.target.dataset.index);
    handleCancel(index);
  }
});

renderOrders();
