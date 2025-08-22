// scripts/product-detail.js

import { products, formatCurrency, getStarsHtml } from './products.js';

const container = document.getElementById('product-detail-container');

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProductDetail(product) {
  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h1>${product.name}</h1>
        <p>${getStarsHtml(product.rating.stars)} (${product.rating.count})</p>
        <p class="price">${formatCurrency(product.priceCents)}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut arcu eu justo gravida.</p>
        <button onclick="addToCart('${product.id}')">Add to Cart</button>
      </div>
    </div>
  `;
}

window.addToCart = function(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[productId] = (cart[productId] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Added to cart!");
};

const productId = getProductIdFromURL();
const product = getProductById(productId);

if (product) {
  renderProductDetail(product);
} else {
  container.innerHTML = "<p>Product not found.</p>";
}
