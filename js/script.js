/* ================= PRODUCTS ================= */

const products = [
  {
    id: 1,
    name: "تيشيرت أسود كلاسيك",
    price: 450,
    category: "tshirts",
    categoryName: "تيشيرتات",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    description:
      "تيشيرت أسود بتصميم بسيط وأنيق، مناسب للإطلالات اليومية.",
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 2,
    name: "قميص أبيض أنيق",
    price: 650,
    category: "shirts",
    categoryName: "قمصان",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
    description:
      "قميص أبيض أنيق بتصميم كلاسيكي يناسب المناسبات والإطلالات الرسمية.",
    sizes: ["M", "L", "XL"]
  },

  {
    id: 3,
    name: "بنطلون أسود",
    price: 750,
    category: "pants",
    categoryName: "بناطيل",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
    description:
      "بنطلون أسود بتصميم عصري ومريح للاستخدام اليومي.",
    sizes: ["30", "32", "34", "36"]
  },

  {
    id: 4,
    name: "جاكيت أسود",
    price: 1200,
    category: "jackets",
    categoryName: "جاكيتات",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
    description:
      "جاكيت أسود أنيق لإطلالة شبابية فخمة وعصرية.",
    sizes: ["M", "L", "XL"]
  }
];


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("tirazCart")) || [];


function saveCart() {
  localStorage.setItem("tirazCart", JSON.stringify(cart));
  updateCartCount();
}


function updateCartCount() {
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const count = cart.reduce((total, item) => total + item.quantity, 0);

  countElement.textContent = count;
}


function addToCart(productId) {

  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCart();

  alert("تمت إضافة المنتج إلى السلة 🛒");
}


/* ================= PRODUCT CARD ================= */

function productCard(product) {

  return `
    <div class="product-card">

      <a href="product-details.html?id=${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </a>

      <div class="product-info">

        <span class="product-category">
          ${product.categoryName}
        </span>

        <h3>${product.name}</h3>

        <div class="product-price">
          ${product.price} جنيه
        </div>

        <div class="product-actions">

          <button
            class="btn btn-dark"
            onclick="addToCart(${product.id})">
            أضف للسلة
          </button>

          <a
            href="product-details.html?id=${product.id}"
            class="btn btn-outline">
            التفاصيل
          </a>

        </div>

      </div>

    </div>
  `;
}


/* ================= FEATURED PRODUCTS ================= */

function displayFeaturedProducts() {

  const container = document.getElementById("featured-products");

  if (!container) return;

  container.innerHTML = products
    .slice(0, 4)
    .map(productCard)
    .join("");
}


/* ================= ALL PRODUCTS ================= */

function displayAllProducts(list = products) {

  const container = document.getElementById("all-products");

  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p>مفيش منتجات في القسم ده حاليًا.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(productCard).join("");
}


function setupProductFilter() {

  const filter = document.getElementById("category-filter");

  if (!filter) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    filter.value = category;
    filterProducts(category);
  } else {
    displayAllProducts();
  }

  filter.addEventListener("change", function () {
    filterProducts(this.value);
  });
}


function filterProducts(category) {

  if (category === "all") {
    displayAllProducts(products);
    return;
  }

  const filtered = products.filter(
    product => product.category === category
  );

  displayAllProducts(filtered);
}


/* ================= PRODUCT DETAILS ================= */

function displayProductDetails() {

  const container = document.getElementById("product-details");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);

  const id = Number(params.get("id"));

  const product = products.find(item => item.id === id);

  if (!product) {

    container.innerHTML = `
      <div class="empty-cart">
        <h2>المنتج غير موجود</h2>
        <p>ممكن يكون المنتج اتحذف أو الرابط غير صحيح.</p>
        <a href="products.html" class="btn btn-dark">
          العودة للمنتجات
        </a>
      </div>
    `;

    return;
  }

  container.innerHTML = `

    <div class="product-details-image">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-details-info">

      <span class="section-tag">
        ${product.categoryName}
      </span>

      <h1>${product.name}</h1>

      <div class="price">
        ${product.price} جنيه
      </div>

      <p class="product-description">
        ${product.description}
      </p>

      <strong>اختار المقاس:</strong>

      <div class="size-options">

        ${product.sizes.map((size, index) => `
          <button
            class="${index === 0 ? "active" : ""}"
            onclick="selectSize(this)">
            ${size}
          </button>
        `).join("")}

      </div>

      <button
        class="btn btn-dark btn-full"
        onclick="addToCart(${product.id})">
        أضف إلى السلة 🛒
      </button>

    </div>
  `;

  displayRelatedProducts(product.id);
}


function selectSize(button) {

  document
    .querySelectorAll(".size-options button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");
}


function displayRelatedProducts(currentId) {

  const container = document.getElementById("related-products");

  if (!container) return;

  const current = products.find(product => product.id === currentId);

  if (!current) return;

  const related = products
    .filter(product =>
      product.category === current.category &&
      product.id !== currentId
    );

  if (related.length === 0) {

    container.innerHTML = products
      .filter(product => product.id !== currentId)
      .slice(0, 3)
      .map(productCard)
      .join("");

    return;
  }

  container.innerHTML = related.map(productCard).join("");
}


/* ================= CART PAGE ================= */

function renderCart() {

  const container = document.getElementById("cart-items");

  if (!container) return;

  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty-cart">

        <h2>السلة فاضية 🛒</h2>

        <p>
          لسه مفيش منتجات في سلة المشتريات.
        </p>

        <a href="products.html" class="btn btn-dark">
          تصفح المنتجات
        </a>

      </div>
    `;

    updateCartSummary();
    return;
  }

  container.innerHTML = cart.map(item => {

    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <div class="cart-item">

        <img
          class="cart-item-image"
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="cart-item-info">

          <h3>${product.name}</h3>

          <div class="cart-item-price">
            ${product.price} جنيه
          </div>

        </div>

        <div class="quantity-controls">

          <button onclick="changeQuantity(${product.id}, 1)">
            +
          </button>

          <strong>${item.quantity}</strong>

          <button onclick="changeQuantity(${product.id}, -1)">
            −
          </button>

        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${product.id})">
          حذف
        </button>

      </div>
    `;

  }).join("");

  updateCartSummary();
}


function changeQuantity(productId, amount) {

  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  saveCart();
  renderCart();
}


function removeFromCart(productId) {

  cart = cart.filter(item => item.id !== productId);

  saveCart();
  renderCart();
}


function calculateCartTotal() {

  return cart.reduce((total, item) => {

    const product = products.find(p => p.id === item.id);

    if (!product) return total;

    return total + product.price * item.quantity;

  }, 0);
}


function updateCartSummary() {

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = calculateCartTotal();

  const countElement = document.getElementById("cart-items-count");
  const totalElement = document.getElementById("cart-total");
  const finalElement = document.getElementById("cart-total-final");

  if (countElement) {
    countElement.textContent = count;
  }

  if (totalElement) {
    totalElement.textContent = `${total} جنيه`;
  }

  if (finalElement) {
    finalElement.textContent = `${total} جنيه`;
  }

  const checkoutButton = document.getElementById("checkout-btn");

  if (checkoutButton) {
    checkoutButton.style.pointerEvents =
      cart.length === 0 ? "none" : "auto";

    checkoutButton.style.opacity =
      cart.length === 0 ? "0.5" : "1";
  }
}


/* ================= CHECKOUT ================= */

function renderCheckout() {

  const itemsContainer = document.getElementById("checkout-items");

  if (!itemsContainer) return;

  if (cart.length === 0) {

    itemsContainer.innerHTML = `
      <p>السلة فارغة.</p>

      <a href="products.html" class="btn btn-dark">
        العودة للمنتجات
      </a>
    `;

    const form = document.getElementById("checkout-form");

    if (form) {
      form.style.display = "none";
    }

    updateCheckoutTotal();

    return;
  }

  itemsContainer.innerHTML = cart.map(item => {

    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <div class="summary-row">
        <span>
          ${product.name} × ${item.quantity}
        </span>

        <strong>
          ${product.price * item.quantity} جنيه
        </strong>
      </div>
    `;

  }).join("");

  updateCheckoutTotal();
}


function updateCheckoutTotal() {

  const total = calculateCartTotal();

  const totalElement = document.getElementById("checkout-total");
  const finalElement = document.getElementById("checkout-final");

  if (totalElement) {
    totalElement.textContent = `${total} جنيه`;
  }

  if (finalElement) {
    finalElement.textContent = `${total} جنيه`;
  }
}


function setupCheckoutForm() {

  const form = document.getElementById("checkout-form");

  if (!form) return;

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (cart.length === 0) {
      alert("السلة فارغة.");
      return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const city = document.getElementById("customer-city").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !city || !address) {
      alert("من فضلك املأ البيانات المطلوبة.");
      return;
    }

    /*
      ملاحظة:
      الجزء ده تجريبي فقط.
      لإرسال الطلب فعليًا لمتجر، نحتاج Backend أو خدمة
      استقبال طلبات وقاعدة بيانات.
    */

    alert(
      "تم تسجيل طلبك بنجاح ✅\n\n" +
      "شكرًا لاختيارك TIRAZ."
    );

    cart = [];

    saveCart();

    window.location.href = "index.html";
  });
}


/* ================= CONTACT FORM ================= */

function setupContactForm() {

  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    alert(
      "تم إرسال رسالتك بنجاح ✅\n\n" +
      "شكرًا لتواصلك مع TIRAZ."
    );

    form.reset();
  });
}


/* ================= MOBILE MENU ================= */

function setupMobileMenu() {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {

    nav.classList.toggle("show");

  });
}


/* ================= START ================= */

document.addEventListener("DOMContentLoaded", function () {

  updateCartCount();

  displayFeaturedProducts();

  displayAllProducts();

  setupProductFilter();

  displayProductDetails();

  renderCart();

  renderCheckout();

  setupCheckoutForm();

  setupContactForm();

  setupMobileMenu();

});
