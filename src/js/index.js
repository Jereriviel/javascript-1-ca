async function prepareProducts() {
  showLoader();
  try {
    const products = await getProducts();

    displayProducts(products);
  } catch (error) {
    console.error(
      "Error while rendering data from Rainy Days API.",
      error.message
    );
  } finally {
    hideLoader();
  }
}

prepareProducts();

function displayProducts(products) {
  const productNewest = document.querySelector(".newest-collection__cards");
  productNewest.innerHTML = "";

  const newestProducts = products.slice(0, 4);

  for (let i = 0; i < newestProducts.length; i++) {
    const product = newestProducts[i];

    productNewest.innerHTML += `
      <article class="product-card">
    <figure class="product-card__image-container product-card__zoom">
    <a href="./products/product.html?id=${product.id}">
          <img
            class="product-card__image"
            src="${product.image.url}"
            alt="${product.image.alt}"
          />
          ${
            product.price !== product.discountedPrice
              ? '<div class="on-sale"><p>On sale</p></div>'
              : ""
          }
          </a>
        </figure>
        <div class="product-card__details">
            <div class="product-card__top">
              <div class="product-card__heading">
                <p class="product-card__gender">${
                  product.gender === "Male"
                    ? "Men's"
                    : product.gender === "Female"
                    ? "Women's"
                    : product.gender
                }</p>
<a href="./products/product.html?id=${product.id}">
                <p class="product-card__name">${product.title}</p>
</a>
              </div>
              <span class="material-symbols-outlined${
                product.favorite ? " filled" : ""
              }"> favorite </span>
            </div>
            <div class="product-card__bottom">
              <p class="product-card__price">$ ${product.discountedPrice}</p>
<p class="product-card__before-price">
  ${product.price !== product.discountedPrice ? `$ ${product.price}` : ""}
</p>
            </div>
          </div>
      </article>
      
      `;
  }
}

function showErrorModal(errorMessage) {
  const dialog = document.getElementById("error_modal_index");
  dialog.showModal();

  if (errorMessage) {
    document.getElementById("index_error_message").innerHTML = errorMessage;
  }
}

const closeModalX = document.getElementById("close_modal_x");
const closeModalContinue = document.getElementById("close_modal_continue");
const dialog = document.getElementById("error_modal_index");

closeModalX.addEventListener("click", () => {
  dialog.close();
});

closeModalContinue.addEventListener("click", () => {
  dialog.close();
});
