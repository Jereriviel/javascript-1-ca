async function prepareCart() {
  showLoader();
  try {
    const products = await getProducts();
    const cart = getCart();
    const productsInCart = products.filter((product) =>
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
    const cart = getCart();
    const newCart = cart.filter((cartProductId) => cartProductId !== productId);

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

  mobileSummary.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    topSummary.innerHTML += `
    <div class="order-card__summary" data-id="${product.id}">
        <img
          class="order-summary__image"
          src="${product.image.url}"
          alt="${product.image.alt}"
        />
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
              <p class="product-card__name">${product.title}</p>
              <p><span>Size Medium</span></p>
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
    </div>
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
  }

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
