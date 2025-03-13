let storedProducts = null;

async function getProducts() {
  if (storedProducts) {
    return storedProducts;
  }
  showLoader();
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");

    if (response.ok) {
      const result = await response.json();
      storedProducts = result.data;
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

async function addToCart(productId) {
  const cart = getCart();
  const products = await getProducts();
  const product = products.find((p) => p.id === productId);

  const selectedSize = document.querySelector(
    ".size-buttons input[type='radio']:checked"
  );

  if (!selectedSize) {
    showSizeMessage();
    return;
  }

  let cartItem = {
    ...product,
    size: selectedSize.value,
  };

  if (cart.find((item) => item.id === productId)) {
    showAlreadyAddedMessage();
    return;
  }

  cart.push(cartItem);

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
  const cartNumber = cart.length;

  if (cart.length > 0) {
    notification.classList.add("notification");
    notification.innerHTML = `<p>${cartNumber}</p>`;
  } else {
    notification.classList.remove("notification");
    notification.innerHTML = "";
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
  }, 2000);
}

function showAlreadyAddedMessage() {
  const createSuccess = document.getElementById("snackbar_already-added");

  createSuccess.className = "snackbar-show";

  setTimeout(function () {
    createSuccess.className = createSuccess.className.replace(
      "snackbar-show",
      ""
    );
  }, 2000);
}

function showSizeMessage() {
  const createSuccess = document.getElementById("snackbar_size");

  createSuccess.className = "snackbar-show";

  setTimeout(function () {
    createSuccess.className = createSuccess.className.replace(
      "snackbar-show",
      ""
    );
  }, 2000);
}
