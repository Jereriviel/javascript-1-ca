async function getProduct() {
  showLoader();
  try {
    var id = new URLSearchParams(window.location.search).get("id");
    var result = await fetch(`https://v2.api.noroff.dev/rainy-days/${id}`);
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

async function prepareProduct() {
  showLoader();
  try {
    var product = await getProduct();

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
  var productSingle = document.querySelector(".product-page-details");
  var productImage = document.querySelector(".product-page-showcase");
  var breadcrumb = document.querySelector(".breadcrumb--here");
  var title = document.head.querySelector("title");
  var description = document
    .getElementsByName("Description")[0]
    .getAttribute("content");

  productSingle.innerHTML = `
<p class="order-summary__item-details">${product.gender}</p>
          <h1>${product.title}</h1>
          <p class="product-page-details__before-price">${
            product.price !== product.discountedPrice ? product.price : ""
          }</p>
          <p>${product.discountedPrice}</p>
          <span class="material-symbols-outlined${
            product.favorite ? " filled" : ""
          }"> favorite </span>
          <p>${product.description}
          </p>
          <a href="#" class="product-page-details__links">Read more</a>
          <p>Sizes: ${product.sizes}</p>
          <a href="#" class="product-page-details__links">Size Guide</a>
          <p>Color: ${product.baseColor}</p>
          <div class="included-shipping">
            <span class="material-symbols-outlined"> check </span>
            <p class="order-summary__item-details">
              Free shipping above NOK 2 500
            </p>
          </div>
          <div class="included-warranty">
            <span class="material-symbols-outlined"> check </span>
            <p class="order-summary__item-details">5 years warranty</p>
          </div>
          <button class="button__primary add-button" onclick="addToCart('${
            product.id
          }')"
            >Add to shopping bag</button
          >
          <div>
            <details>
              <summary>Specifications</summary>
              <hr />
              <h2>Material</h2>
              <ul>
                <li>
                  <span>Outer Shell:</span> 100% Nylon Ripstop with Gore-Tex
                  Technology
                </li>
                <li>
                  <span>Lining:</span> 100% Polyester Mesh for enhanced
                  breathability
                </li>
              </ul>
              <h2>Features</h2>
              <ul>
                <li>
                  <span>Waterproof:</span>
                  Advanced Gore-Tex membrane ensures complete waterproof
                  protection, keeping you dry in the wettest conditions.
                </li>
                <li>
                  <span> Windproof:</span>
                  Windproof construction shields you from harsh winds, providing
                  ultimate comfort.
                </li>
                <li>
                  <span>Breathable:</span> Gore-Tex fabric allows moisture vapor
                  to escape, keeping you comfortable and dry from the inside
                  out.
                </li>
                <li>
                  <span>Lightweight:</span> Ultra-light design for easy packing
                  and minimal weight without compromising on protection.
                </li>
                <li>
                  <span>Durability:</span> Reinforced stitching and
                  abrasion-resistant fabric for extended wear and tear
                  resistance.
                </li>
              </ul>
              <h2>Design</h2>
              <ul>
                <li>
                  <span>Fit:</span> Tailored fit designed specifically for
                  women, offering a flattering silhouette while allowing for
                  layering.
                </li>
                <li>
                  <span>Hood:</span> Adjustable, helmet-compatible hood with a
                  reinforced brim for enhanced visibility and protection.
                </li>
                <li>
                  <span>Zippers:</span> Waterproof YKK zippers throughout,
                  including a full-length front zipper with a storm flap.
                </li>
                <li>
                  <span>Pockets:</span> Two zippered hand pockets and one
                  zippered chest pocket, all with waterproof seals.
                </li>
                <li>
                  <span>Cuffs:</span> Adjustable Velcro cuffs to keep out wind
                  and rain.
                </li>
                <li>
                  <span>Hem:</span> Adjustable drawcord hem for a secure,
                  customizable fit.
                </li>
              </ul>
              <h2>Additional Details</h2>
              <ul>
                <li>
                  <span>Seam Sealed:</span> Fully taped seams to prevent water
                  from seeping in.
                </li>
                <li>
                  <span>Ventilation:</span> Pit zips for rapid ventilation and
                  temperature control.
                </li>
                <li><span>Weight:</span> Approximately 350 grams (12.3 oz)</li>
                <li>
                  <span>Packability:</span> Packs down small into an included
                  stuff sack for easy storage and transport.
                </li>
              </ul>
              <h2>Care Instructions</h2>
              <ul>
                <li>Machine wash warm, tumble dry low.</li>
                <li>Do not use fabric softeners or bleach.</li>
              </ul>
              <p>
                Experience the perfect blend of lightweight comfort, durable
                protection, and stylish design with the Skylar Gore-Tex Jacket,
                crafted to keep you performing at your best, no matter the
                weather.
              </p>
            </details>
          </div>
          </div>
      `;

  productImage.innerHTML = `
      
      <img
            class="product-page-showcase__image"
            src="${product.image.url}"
            alt="${product.image.alt}"
          />
      `;

  breadcrumb.textContent = product.title;

  title.textContent = product.title;

  description.textContent = product.description;
}
