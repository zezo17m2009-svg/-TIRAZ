// ===============================
// TIRAZ - PRODUCTS
// ===============================

const products = [
  {
    id: 1,
    name: "تيشيرت أسود كلاسيك",
    price: 450,
    category: "tshirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "قميص أبيض أنيق",
    price: 650,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "بنطلون أسود",
    price: 750,
    category: "pants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "جاكيت أسود",
    price: 1200,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
  }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("tirazCart")) || [];

function saveCart() {
  localStorage.setItem("tirazCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = count;
  }
}

function addToCart(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();

  alert("تمت إضافة المنتج إلى السلة 🛒");
}


// ===============================
// FEATURED PRODUCTS
// ===============================

function displayFeaturedProducts() {

  const container = document.getElementById("featured-products");

  if (!container) return;

  container.innerHTML = products.map(product => {

    return `
      <article class="product-card">

        <a href="product-details.html?id=${product.id}">
          <div
            class="product-image"
            style="background-image:url('${product.image}')">
          </div>
        </a>

        <div class="product-info">

          <h3>${product.name}</h3>

          <div class="price">
            ${product.price} ج.م
          </div>

          <button
            class="add-cart"
            onclick="addToCart(${product.id})">

            إضافة إلى السلة

          </button>

        </div>

      </article>
    `;

  }).join("");
}


// ===============================
// MOBILE MENU
// ===============================

const menuButton = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuButton) {

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

}


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    alert("تم إرسال رسالتك بنجاح ✅");

    contactForm.reset();

  });

}


// ===============================
// START
// ===============================

displayFeaturedProducts();
updateCartCount();
