function prepareCart() {
  showLoader();
  try {
    const cart = getCart();
    displayProducts(cart);
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
    const cart = getCart();
    const newCart = cart.filter((cartProduct) => cartProduct.id !== productId);

    window.sessionStorage.setItem("cart", JSON.stringify(newCart));

    const cartElement = document.querySelector(
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
  const topSummary = document.querySelector(".top-summary");
  const mobileSummary = document.querySelector(
    ".order-summary__total-mobile .mobile-price"
  );

  products.forEach((product) => {
    topSummary.innerHTML += `
      <article class="order-card__summary" data-id="${product.id}">
        <figure class="order-summary__figure">
          <a href="../products/product.html?id=${product.id}">
            <img
              class="order-summary__image"
              src="${product.image.url}"
              alt="${product.image.alt}"
            />
          </a>
        </figure>
        <div class="product-card__summary">
          <div class="product-card__top-trash">
            <div class="p-text">
              <p>${
                product.gender === "Male"
                  ? "Men's"
                  : product.gender === "Female"
                  ? "Women's"
                  : product.gender
              }</p>
              <a href="../products/product.html?id=${product.id}">
                <p class="product-card__name">${product.title}</p>
              </a>
              <p><span>Size: ${
                product.size ? product.size : "Not selected"
              }</span></p> <!-- Fix here -->
            </div>
            <div class="p-trash" onclick="removeFromCart('${product.id}')">
              <span class="material-symbols-outlined"> delete </span>
            </div>
          </div>
          <div class="p-number-price">
            <p class="valuta">$</p>
            <div class="p-price">
              <p class="order-summary__item-price">${product.discountedPrice.toFixed(
                2
              )}</p>
            </div>
          </div>
        </div>
      </article>
    `;

    mobileSummary.innerHTML += `
      <div class="product-item">
      <div class="product-item__header">
      <p>${
        product.gender === "Male"
          ? "Men's"
          : product.gender === "Female"
          ? "Women's"
          : product.gender
      }</p>
        <p class="product-card__name">${product.title}</p>
        </div>
        <div class="valuta-and-price">
        <p class="valuta">$</p>
        <p class="order-summary__item-price">${product.discountedPrice.toFixed(
          2
        )}</p>
        </div>
        </div>
    `;
  });

  displayTotal();
}

function displayTotal() {
  const itemTotalElement = document.querySelector(".order-summary__item-total");
  const mobileTotalElement = document.querySelector(
    ".order-summary__total-mobile .order-summary__item-total"
  );

  const priceElements = [
    ...document.querySelectorAll(".top-summary .order-summary__item-price"),
  ];

  const total = priceElements.reduce(
    (acc, product) => acc + Number(product.textContent),
    0
  );

  itemTotalElement.textContent = total.toFixed(2);
  mobileTotalElement.textContent = total.toFixed(2);
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
