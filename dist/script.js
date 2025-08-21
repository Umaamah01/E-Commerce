document.addEventListener("DOMContentLoaded", function () {
    var quantity = 0;
    var PRICE = 125;
    // Helper to cast getElementById
    var $ = function (id) {
        return document.getElementById(id);
    };
    var quantityEl = $("quantity");
    var plusBtn = $("plus");
    var minusBtn = $("minus");
    var addToCartBtn = $("add-to-cart");
    var cartPopup = $("cart-popup");
    var cartContent = $("cart-content");
    var cartIcon = document.querySelector(".cart-icon");
    var cart = null;
    // Update quantity display
    function updateQuantity() {
        quantityEl.textContent = quantity.toString();
    }
    // Render cart
    function renderCart() {
        if (cart && cart.quantity > 0) {
            var total = cart.price * cart.quantity;
            cartContent.innerHTML = "\n        <div class=\"cart-item\">\n          <p>".concat(cart.name, "</p>\n          <p>$").concat(cart.price, ".00 \u00D7 ").concat(cart.quantity, " <strong>$").concat(total, ".00</strong></p>\n          <button id=\"remove\">\uD83D\uDDD1 Remove</button>\n        </div>\n      ");
            cartPopup.style.display = "block";
        }
        else {
            cartContent.innerHTML = "<p>Your cart is empty.</p>";
            cartPopup.style.display = "none"; // Hide popup if empty
        }
    }
    // Quantity buttons
    plusBtn.addEventListener("click", function () {
        quantity++;
        updateQuantity();
    });
    minusBtn.addEventListener("click", function () {
        if (quantity > 0) {
            quantity--;
            updateQuantity();
        }
    });
    // Add to Cart button
    addToCartBtn.addEventListener("click", function () {
        if (quantity > 0) {
            if (!cart) {
                cart = { name: "Fall Limited Edition Sneakers", price: PRICE, quantity: quantity };
            }
            else {
                cart.quantity += quantity;
            }
            renderCart();
            quantity = 0;
            updateQuantity();
        }
        else {
            alert("⚠️ Please select quantity first!");
        }
    });
    // Remove item using event delegation
    cartContent.addEventListener("click", function (e) {
        if (e.target.id === "remove") {
            cart = null;
            renderCart();
        }
    });
    // Toggle cart popup from icon
    cartIcon.addEventListener("click", function () {
        cartPopup.style.display =
            cartPopup.style.display === "block" ? "none" : "block";
    });
    // Initialize
    updateQuantity();
    renderCart();
});
