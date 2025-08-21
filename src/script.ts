document.addEventListener("DOMContentLoaded", () => {
  let quantity = 0;
  const PRICE = 125;

  // Helper to cast getElementById
  const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

  const quantityEl = $("quantity") as HTMLSpanElement;
  const plusBtn = $("plus") as HTMLButtonElement;
  const minusBtn = $("minus") as HTMLButtonElement;
  const addToCartBtn = $("add-to-cart") as HTMLButtonElement;
  const cartPopup = $("cart-popup") as HTMLDivElement;
  const cartContent = $("cart-content") as HTMLDivElement;
  const cartIcon = document.querySelector(".cart-icon") as HTMLImageElement;

  // Mobile nav toggle
  const toggleBtn = $("toggleBtn") as HTMLButtonElement;
  const navLinks = $("navlinks") as HTMLUListElement;
  const overlay = $("overlay") as HTMLDivElement;

  interface CartItem {
    name: string;
    price: number;
    quantity: number;
  }

  let cart: CartItem | null = null;

  // Update quantity display
  function updateQuantity() {
    quantityEl.textContent = quantity.toString();
  }

  // Render cart
  function renderCart() {
    if (cart && cart.quantity > 0) {
      const total = cart.price * cart.quantity;
      cartContent.innerHTML = `
        <div class="cart-item">
          <p>${cart.name}</p>
          <p>$${cart.price}.00 × ${cart.quantity} <strong>$${total}.00</strong></p>
          <button id="remove">🗑 Remove</button>
        </div>
      `;
      cartPopup.style.display = "block";
    } else {
      cartContent.innerHTML = `<p>Your cart is empty.</p>`;
      cartPopup.style.display = "none";
    }
  }

  // Quantity buttons
  plusBtn.addEventListener("click", () => {
    quantity++;
    updateQuantity();
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      updateQuantity();
    }
  });

  // Add to Cart button
  addToCartBtn.addEventListener("click", () => {
    if (quantity > 0) {
      if (!cart) {
        cart = { name: "Fall Limited Edition Sneakers", price: PRICE, quantity };
      } else {
        cart.quantity += quantity;
      }
      renderCart();
      quantity = 0;
      updateQuantity();
    } else {
      alert("⚠️ Please select quantity first!");
    }
  });

  // Remove item using event delegation
  cartContent.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "remove") {
      cart = null;
      renderCart();
    }
  });

  // Toggle cart popup from icon
  cartIcon.addEventListener("click", () => {
    cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
  });

  // Mobile nav toggle logic
  function openNav() {
    navLinks.classList.add("active");
    overlay.classList.add("active");
  }

  function closeNav() {
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  }

  toggleBtn.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener("click", closeNav);

  // Initialize
  updateQuantity();
  renderCart();
});
