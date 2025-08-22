// scripts/jiblik.js

import { products, formatCurrency, getStarsHtml } from './products.js';

const productGrid = document.querySelector('.js-products-grid');

function renderProducts(productList) {
  productGrid.innerHTML = productList.map(product => `
    <div class="product-card">
      <a href="product-detail.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image" />
      </a>
      <h3>${product.name}</h3>

      <p class="rating-container">
        ${getStarsHtml(product.rating.stars)}
        <span class="rating-count">(${product.rating.count})</span>
      </p>

      <p class="price">${formatCurrency(product.priceCents)}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    </div>
  `).join('');
}

window.addToCart = function(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[productId] = (cart[productId] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartQuantity();
};

function updateCartQuantity() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const quantity = Object.values(cart).reduce((sum, q) => sum + q, 0);
  document.querySelector('.js-cart-quantity').textContent = quantity;
}

window.handleSearch = function() {
  const keyword = document.getElementById('search-input').value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
};

renderProducts(products);
updateCartQuantity();
