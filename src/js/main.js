async function getProducts() {
  showLoader();
  try {
    var result = await fetch("https://v2.api.noroff.dev/rainy-days");
    var json = await result.json();
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
  var cart = getCart();

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
  var cartString = window.sessionStorage.getItem("cart") || "[]";
  var cart = JSON.parse(cartString);
  return cart;
}

function cartNotification() {
  var notification = document.getElementById("notification");
  var cart = getCart();

  if (cart.length > 0) {
    notification.classList.add("notification");
  } else {
    notification.classList.remove("notification");
  }
}

cartNotification();

function showLoader() {
  var loader = document.querySelector(".loader");
  loader.style.display = "flex";
}

function hideLoader() {
  var loader = document.querySelector(".loader");
  loader.style.display = "none";
}
