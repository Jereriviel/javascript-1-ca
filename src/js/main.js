async function getProducts() {
  showLoader();
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");

    if (response.ok) {
      const result = await response.json();
      return result.data;
    } else {
      const errorMessage = result.errors
        ? result.errors[0].message
        : "Error while fetching data from Rainy Days API.";
      showErrorModal(errorMessage);
      console.error("Get posts error:", errorMessage);
    }
  } catch (error) {
    console.error("Get posts error:", error);
    showErrorModal();
  } finally {
    hideLoader();
  }
}

function addToCart(productId) {
  const cart = getCart();

  if (cart.includes(productId)) {
    showAlreadyAddedMessage();
    return;
  }

  cart.push(productId);

  window.sessionStorage.setItem("cart", JSON.stringify(cart));

  showAddedMessage();

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

function showAddedMessage() {
  const createSuccess = document.getElementById("snackbar_added");

  createSuccess.className = "snackbar-show";

  setTimeout(function () {
    createSuccess.className = createSuccess.className.replace(
      "snackbar-show",
      ""
    );
  }, 1500);
}

function showAlreadyAddedMessage() {
  const createSuccess = document.getElementById("snackbar_already-added");

  createSuccess.className = "snackbar-show";

  setTimeout(function () {
    createSuccess.className = createSuccess.className.replace(
      "snackbar-show",
      ""
    );
  }, 1500);
}
