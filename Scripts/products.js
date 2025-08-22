// scripts/products.js

// --- Built-in Sudanese products ---
const sudaneseProducts = [
  {
    id: '1',
    name: 'Sudanese products',
    image: 'images/products/product18.jpg',
    priceCents: 2499,
    rating: { stars: 4.5, count: 120 },
    category: 'Sudanese products'
  },
  {
    id: '2',
    name: 'Sudanese products',
    image: 'images/products/product17.jpg',
    priceCents: 1299,
    rating: { stars: 4.0, count: 60 },
    category: 'Sudanese products'
  },
  {
    id: '3',
    name: 'Sudanese products',
    image: 'images/products/product3.jpg',
    priceCents: 3499,
    rating: { stars: 4.5, count: 200 },
    category: 'Sudanese products'
  },
  {
    id: '4',
    name: 'Sudanese products',
    image: 'images/products/product19.jpg',
    priceCents: 4999,
    rating: { stars: 4.5, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '5',
    name: 'Sudanese products',
    image: 'images/products/product5.jpg',
    priceCents: 2499,
    rating: { stars: 4.5, count: 120 },
    category: 'Sudanese products'
  },
  {
    id: '6',
    name: 'Sudanese products',
    image: 'images/products/product6.jpg',
    priceCents: 1299,
    rating: { stars: 4.0, count: 60 },
    category: 'Sudanese products'
  },
  {
    id: '7',
    name: 'Sudanese products',
    image: 'images/products/product7.jpg',
    priceCents: 3499,
    rating: { stars: 4.5, count: 200 },
    category: 'Sudanese products'
  },
  {
    id: '8',
    name: 'Sudanese products',
    image: 'images/products/product8.jpg',
    priceCents: 4999,
    rating: { stars: 4, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '9',
    name: 'Sudanese products',
    image: 'images/products/product9.jpg',
    priceCents: 3499,
    rating: { stars: 5, count: 200 },
    category: 'Sudanese products'
  },
  {
    id: '10',
    name: 'Sudanese products',
    image: 'images/products/product10.jpg',
    priceCents: 4999,
    rating: { stars: 4, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '11',
    name: 'Sudanese products',
    image: 'images/products/product11.jpg',
    priceCents: 4999,
    rating: { stars: 5, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '12',
    name: 'Sudanese products',
    image: 'images/products/product12.jpg',
    priceCents: 4999,
    rating: { stars: 5, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '13',
    name: 'Sudanese products',
    image: 'images/products/product13.jpg',
    priceCents: 4999,
    rating: { stars: 4, count: 100 },
    category: 'Sudanese products'
  },
  {
    id: '14',
    name: 'Sudanese products',
    image: 'images/products/product15.jpg',
    priceCents: 4999,
    rating: { stars: 5, count: 100 },
    category: 'Sudanese products'
  }
];

// --- Seller products from localStorage ---
function getSellerProducts() {
  const sellerProducts = JSON.parse(localStorage.getItem('sellerProducts')) || [];
  return sellerProducts.map((p, index) => ({
    id: `seller-${index}`,
    name: p.name,
    image: p.image || 'images/default1.png',
    priceCents: parseFloat(p.price) * 100,
    rating: { stars: 5, count: 1 },
    category: p.category || 'Seller Product'
  }));
}

// --- Combine all products ---
export const products = [...sudaneseProducts, ...getSellerProducts()];

// --- Utility: Format price ---
export function formatCurrency(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

// --- Utility: Star rating using image ---
export function getStarsHtml(rating) {
  const ratingKey = Math.round(rating * 10); // e.g. 4.5 → 45
  return `<img src="images/ratings/rating-${ratingKey}.png" alt="${rating} stars" class="rating-stars" width="100" />`;
}
