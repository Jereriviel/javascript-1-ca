async function getProduct() {
  showLoader();
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${id}`);

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

async function prepareProduct() {
  showLoader();
  try {
    const product = await getProduct();

    displayProduct(product);
  } catch (error) {
    console.error(
      "Error while rendering data from Rainy Days API.",
      error.message
    );
  } finally {
    hideLoader();
  }
}

prepareProduct();

function displayProduct(product) {
  const productSingle = document.querySelector(".product-page-details");
  const productImage = document.querySelector(".product-page-showcase");
  const breadcrumb = document.querySelector(".breadcrumb--here");
  const title = document.head.querySelector("title");
  const description = document
    .getElementsByName("Description")[0]
    .getAttribute("content");

  productSingle.innerHTML = `
<div class="product-page__top">
  <p class="order-summary__item-details"> ${
    product.gender === "Male"
      ? "Men's"
      : product.gender === "Female"
      ? "Women's"
      : product.gender
  }</p>
  <div class="product-page__heading">
    <h1>${product.title}</h1>
    <span class="material-symbols-outlined${
      product.favorite ? " filled" : ""
    } product-page__heart">
      favorite
    </span>
  </div>
  <div class="product-page__price">
    <p>$ ${product.discountedPrice}</p>
    <p class="product-page-details__before-price">${
      product.price !== product.discountedPrice ? `$ ${product.price}` : ""
    }</p>
  </div>
</div>
<div class="product-page__description">
  <p>${product.description}</p>
  <a href="#" class="product-page-details__links">Read more</a>
</div>
<div class="product-page__sizes">
<p>Choose size:</p>
<div class="size-buttons">
${product.sizes
  .map(
    (
      size
    ) => `<div class="label-input"><input type="radio" id="${size}" name="size" value="${size}"/>
<label for="${size}">${size}</label></div>`
  )
  .join("")}
  </div>
  <a href="#" class="product-page-details__links">Size Guide</a>
</div>
<div class="product-page__colors">
<p>Color:</p>
  <p class="button__secondary">${product.baseColor}</p>
</div>
<div class="product-page__list">
  <div class="included-shipping">
    <span class="material-symbols-outlined"> check </span>
    <p class="order-summary__item-details">Free shipping above $ 200</p>
  </div>
  <div class="included-warranty">
    <span class="material-symbols-outlined"> check </span>
    <p class="order-summary__item-details">5 years warranty</p>
  </div>
</div>

<button class="button__primary add-button" onclick="addToCart('${
    product.id
  }')">Add to shopping bag</button>
<div>
  <details>
    <summary>Specifications</summary>
    <hr />
    <h2>Material</h2>
    <ul>
      <li>
        <span>Outer Shell:</span> 100% Nylon Ripstop with Gore-Tex Technology
      </li>
      <li>
        <span>Lining:</span> 100% Polyester Mesh for enhanced breathability
      </li>
    </ul>
    <h2>Features</h2>
    <ul>
      <li>
        <span>Waterproof:</span>
        Advanced Gore-Tex membrane ensures complete waterproof protection,
        keeping you dry in the wettest conditions.
      </li>
      <li>
        <span> Windproof:</span>
        Windproof construction shields you from harsh winds, providing ultimate
        comfort.
      </li>
      <li>
        <span>Breathable:</span> Gore-Tex fabric allows moisture vapor to
        escape, keeping you comfortable and dry from the inside out.
      </li>
      <li>
        <span>Lightweight:</span> Ultra-light design for easy packing and
        minimal weight without compromising on protection.
      </li>
      <li>
        <span>Durability:</span> Reinforced stitching and abrasion-resistant
        fabric for extended wear and tear resistance.
      </li>
    </ul>
    <h2>Design</h2>
    <ul>
      <li>
        <span>Fit:</span> Tailored fit designed specifically for women, offering
        a flattering silhouette while allowing for layering.
      </li>
      <li>
        <span>Hood:</span> Adjustable, helmet-compatible hood with a reinforced
        brim for enhanced visibility and protection.
      </li>
      <li>
        <span>Zippers:</span> Waterproof YKK zippers throughout, including a
        full-length front zipper with a storm flap.
      </li>
      <li>
        <span>Pockets:</span> Two zippered hand pockets and one zippered chest
        pocket, all with waterproof seals.
      </li>
      <li>
        <span>Cuffs:</span> Adjustable Velcro cuffs to keep out wind and rain.
      </li>
      <li>
        <span>Hem:</span> Adjustable drawcord hem for a secure, customizable
        fit.
      </li>
    </ul>
    <h2>Additional Details</h2>
    <ul>
      <li>
        <span>Seam Sealed:</span> Fully taped seams to prevent water from
        seeping in.
      </li>
      <li>
        <span>Ventilation:</span> Pit zips for rapid ventilation and temperature
        control.
      </li>
      <li><span>Weight:</span> Approximately 350 grams (12.3 oz)</li>
      <li>
        <span>Packability:</span> Packs down small into an included stuff sack
        for easy storage and transport.
      </li>
    </ul>
    <h2>Care Instructions</h2>
    <ul>
      <li>Machine wash warm, tumble dry low.</li>
      <li>Do not use fabric softeners or bleach.</li>
    </ul>
    <p>
      Experience the perfect blend of lightweight comfort, durable protection,
      and stylish design with the Skylar Gore-Tex Jacket, crafted to keep you
      performing at your best, no matter the weather.
    </p>
  </details>
</div>
      `;

  productImage.innerHTML = `
<figure class="product-page-showcase__image">
<div class="showcase__image-sale">  ${
    product.price !== product.discountedPrice
      ? '<div class="on-sale"><p>On sale</p></div>'
      : ""
  }<div>
  <img src="${product.image.url}" alt="${product.image.alt}" />

</figure>
      `;

  breadcrumb.textContent = product.title;

  title.textContent = product.title;

  description.textContent = product.description;
}

function showErrorModal(errorMessage) {
  const dialog = document.getElementById("error_modal_product");
  dialog.showModal();

  if (errorMessage) {
    document.getElementById("product_error_message").innerHTML = errorMessage;
  }
}

const closeModalX = document.getElementById("close_modal_x");
const closeModalContinue = document.getElementById("close_modal_continue");
const dialog = document.getElementById("error_modal_product");

closeModalX.addEventListener("click", () => {
  dialog.close();
});

closeModalContinue.addEventListener("click", () => {
  dialog.close();
});
