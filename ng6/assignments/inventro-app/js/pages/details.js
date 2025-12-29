import { products } from "../data/products.js";

function ErrorBanner() {
  return `<hgroup>
              <h2>Product Id Not Found.</h2>
              <p>your product id not found in db, go back home.</p>
            </hgroup>`;
}

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

function featureList(feature) {
  return `<li>${feature}</li>`;
}

function ProductDetails(product) {
  return `<article>
            <hgroup>
              <h1>${product.name}</h1>
              <p>${product.category}</p>
            </hgroup>
            <footer>
              <h3>Features</h3>
              <ul>
                ${product.features.map(featureList).join("")}
              </ul>
              <a href="/">Back</a>
            </footer>
          </article>`;
}

export default function render() {
  const productId = getHash();

  function isProductFound(product) {
    return productId === product.id;
  }

  const product = products.find(isProductFound);

  if (!product) {
    document.getElementById("app").innerHTML = ErrorBanner();
    return;
  }

  document.getElementById("app").innerHTML = ProductDetails(product);
}
