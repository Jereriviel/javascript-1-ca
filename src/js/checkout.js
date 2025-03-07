async function prepareCart() {
  showLoader();
  try {
    var products = await getProducts();
    var cart = getCart();
    var productsInCart = products.filter((product) =>
      cart.includes(product.id)
    );

    displayProducts(productsInCart);
    displayTotal();
  } catch (error) {
    console.error("Error while rendering cart.", error.message);
  } finally {
    hideLoader();
  }
}

prepareCart();

async function removeFromCart(productId) {
  try {
    var cart = getCart();
    var newCart = cart.filter((cartProductId) => cartProductId !== productId);

    window.sessionStorage.setItem("cart", JSON.stringify(newCart));

    var cartElement = document.querySelector(
      `.top-summary [data-id="${productId}"]`
    );

    cartElement.remove();
    cartNotification();

    displayTotal();
  } catch (error) {
    console.error("Error while removing data from cart.", error.message);
  }
}

function displayProducts(products) {
  var topSummary = document.querySelector(".top-summary");

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    topSummary.innerHTML += `
<div class="order-card" data-id="${product.id}">
  <img
    class="order-summary__image"
    src="${product.image.url}"
    alt="${product.image.alt}"
  />
  <div class="product-card">
    <div class="p-text-trash">
      <div class="p-text">
        <p>${
          product.gender === "Male"
            ? "Men's"
            : product.gender === "Female"
            ? "Women's"
            : product.gender
        }</p>
        <p class="product-card__name">${product.title}</p>
        <p>
          <span>Size Medium</span>
        </p>
      </div>
      <div class="p-trash" onclick="removeFromCart('${product.id}')">
        <span class="material-symbols-outlined"> delete </span>
      </div>
    </div>
    <div class="p-number-price">
      <div class="p-price">
        <p class="order-summary__item-price">${product.discountedPrice}</p>
      </div>
    </div>
  </div>
</div>
      `;
  }
}

function displayTotal(products) {
  var itemTotalElement = document.querySelector(".order-summary__item-total");

  var priceElements = [
    ...document.querySelectorAll(".order-summary__item-price"),
  ];

  var total = priceElements.reduce((acc, product) => {
    return acc + Number(product.textContent);
  }, 0);

  itemTotalElement.textContent = total.toFixed(2);
}

function checkoutEmptyCart() {
  var checkoutButton = document.querySelector("#checkout-button");

  checkoutButton.addEventListener("click", clearCart);
}

checkoutEmptyCart();

function clearCart() {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  cartNotification();
}
