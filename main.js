// ─── GALLERY SWITCHER ───
function changeImg(el, src) {
  document.querySelectorAll('.gallery-thumbs img').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('main-img');
  main.style.opacity = '0';
  main.style.transform = 'scale(1.04)';
  setTimeout(() => {
    main.src = src;
    main.style.transition = 'opacity .4s, transform .4s';
    main.style.opacity = '1';
    main.style.transform = 'scale(1)';
  }, 200);
}

// ─── QUANTITY ───
let qty = 150;
let pricePerPerson = 130;
let selectedPaquete = '80–150 personas';

function changeQty(delta) {
  qty = Math.max(80, qty + delta);
  document.getElementById('qty-display').textContent = qty;
  document.getElementById('qty-price-note').textContent =
    `≈ ${qty * 3}–${qty * 4} bebidas en total`;
}

function updatePrice() {
  document.getElementById('displayed-price').textContent =
    `$${pricePerPerson}.00 MXN`;
}

// ─── TIER SELECTOR ───
function selectTier(el, priceLabel, tierName) {
  document.querySelectorAll('.tier').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  selectedPaquete = tierName;
  pricePerPerson = tierName.includes('+150') ? 90 : 130;
  updatePrice();
}


function getCart() {
  return JSON.parse(localStorage.getItem('elite_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('elite_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const count = getCart().length;
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function addToCart() {
  const cart = getCart()
  saveCart();
  ;

  // Si ya existe el mismo producto+paquete, actualiza personas
  const existing = cart.find(i => i.nombre === 'Coffee Bar' && i.paquete === selectedPaquete);
  if (existing) {
    existing.personas = qty;
  } else {
    cart.push({
      nombre: 'Coffee Bar',
      paquete: selectedPaquete,
      precio: pricePerPerson,
      personas: qty
    });
  }

  saveCart(cart);
  updateCartBadge();
  showToast('¡Agregado al carrito! ☕');

  // Redirigir al carrito después de un momento
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1500);
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── SCROLL FADE-IN ───
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── NAV SHRINK ON SCROLL ───
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.padding =
    window.scrollY > 60 ? '.8rem 4rem' : '1.2rem 4rem';
});

// ─── INIT ───
updateCartBadge();
