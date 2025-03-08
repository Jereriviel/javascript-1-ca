async function getProducts() {
  showLoader();
  try {
    const result = await fetch("https://v2.api.noroff.dev/rainy-days");
    const json = await result.json();
    return json.data;
  } catch (error) {
    console.error(
      "Error while fetching data from Rainy Days API.",
      error.message
    );
  } finally {
    hideLoader();
  }
}

function addToCart(productId) {
  const cart = getCart();

  if (cart.includes(productId)) {
    window.alert("Item is already added.");
    return;
  }

  cart.push(productId);

  window.sessionStorage.setItem("cart", JSON.stringify(cart));

  window.alert("Item added to cart.");

  cartNotification();
}

function getCart() {
  const cartString = window.sessionStorage.getItem("cart") || "[]";
  const cart = JSON.parse(cartString);
  return cart;
}

function cartNotification() {
  const notification = document.getElementById("notification");
  const cart = getCart();

  if (cart.length > 0) {
    notification.classList.add("notification");
  } else {
    notification.classList.remove("notification");
  }
}

cartNotification();

function showLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "flex";
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}
