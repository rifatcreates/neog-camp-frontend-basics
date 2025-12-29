import { products } from "../data/products.js";

function productInfo(product) {
  return `<article>
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <a href="product#${product.id}">Details</a>
          </article>`;
}

function Products() {
  return `<h1>Products</h1>
          ${products.map(productInfo).join("")}`;
}

export default function render() {
  document.getElementById("app").innerHTML = Products();
}
