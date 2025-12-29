import { pets } from "../data/pets.js";

function petInfo(pet) {
  return `<article>
            <h3>${pet.breed}</h3>
            <p>${pet.type}</p>
            <a href="pet#${pet.id}">Details</a>
          </article>`;
}

function Pets() {
  return `<h1>Pets</h1>
          ${pets.map(petInfo).join("")}`;
}

export default function render() {
  document.getElementById("app").innerHTML = Pets();
}
