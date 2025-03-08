async function prepareProducts(gender) {
  showLoader();
  try {
    const products = await getProducts();

    displayProducts(gender ? filterProducts(products, gender) : products);
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
  const productList = document.querySelector(".product-list");

  productList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    productList.innerHTML += `
    <article class="product-card">
    <figure class="product-card__image-container">
    <a href="./products/product.html?id=${product.id}">
          <img
            class="product-card__image"
            src="${product.image.url}"
            alt="${product.image.alt}"
          />
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
              <p class="product-card__before-price">${
                product.price !== product.discountedPrice ? product.price : ""
              }</p>
            </div>
          </div>
      </article>
    
    `;
  }
}

function filterProducts(products, gender) {
  const filteredProducts = products.filter(
    (product) => product.gender === gender
  );

  return filteredProducts;
}

const genderFilter = document.querySelector("#gender");

genderFilter.addEventListener("change", (ev) =>
  prepareProducts(ev.target.value)
);
