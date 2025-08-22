// scripts/seller.js

const form = document.getElementById('seller-form');
const preview = document.getElementById('image-preview');
const pendingList = document.getElementById('pending-products-list');
const publishedList = document.getElementById('seller-products-list');

// --- Helper storage functions ---
const getPending = () => JSON.parse(localStorage.getItem('pendingProducts')) || [];
const savePending = (arr) => localStorage.setItem('pendingProducts', JSON.stringify(arr));
const getPublished = () => JSON.parse(localStorage.getItem('sellerProducts')) || [];
const savePublished = (arr) => localStorage.setItem('sellerProducts', JSON.stringify(arr));

// --- Image upload preview ---
const input = document.getElementById('product-image-input');
input.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// --- Render products ---
function renderList(list, container, isPending = false) {
  container.innerHTML = '';
  list.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('seller-product');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <p><strong>${p.name}</strong></p>
      <p>$${parseFloat(p.price).toFixed(2)}</p>
      <p>${p.description || ''}</p>
      ${isPending ? `
        <div class="action-buttons">
          <button class="approve" data-index="${index}">Approve</button>
          <button class="reject" data-index="${index}">Reject</button>
        </div>` : ''}
    `;
    container.appendChild(div);
  });
}

// --- Approve / Reject ---
pendingList.addEventListener('click', e => {
  const idx = e.target.dataset.index;
  if (e.target.classList.contains('approve')) {
    const arr = getPending();
    const item = arr.splice(idx, 1)[0];
    savePending(arr);
    const pub = getPublished();
    pub.push(item);
    savePublished(pub);
  } else if (e.target.classList.contains('reject')) {
    const arr = getPending();
    arr.splice(idx, 1);
    savePending(arr);
  }
  refreshLists();
});

// --- Form submission ---
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const price = document.getElementById('product-price').value;
  const description = document.getElementById('product-description').value.trim();
  const image = preview.src;

  if (!name || !price || !image) {
    alert('Please fill required fields.');
    return;
  }

  const pending = getPending();
  pending.push({ name, price, description, image });
  savePending(pending);

  console.log('Product submitted:', { name, price, description, image });

  form.reset();
  preview.src = '';
  preview.style.display = 'none';

  refreshLists();
});

// --- Refresh ---
function refreshLists() {
  renderList(getPending(), pendingList, true);
  renderList(getPublished(), publishedList, false);
}

// --- Init ---
refreshLists();
