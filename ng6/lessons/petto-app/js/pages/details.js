import { pets } from "../data/pets.js";

function ErrorBanner() {
  return `<hgroup>
              <h1>Pet Id Not Found!!!</h1>
              <p>Pet id not found in db. Please go back home.</p>
            </hgroup>`;
}

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

function vaccineList(vaccine) {
  return `<li>${vaccine}</li>`;
}

function PetDetails(pet) {
  return `<article>
            <hgroup>
              <h1>${pet.breed}</h1>
              <p>${pet.type}</p>
            </hgroup>
            <p>${pet.details}</p>
            <footer>
              <h3>Vaccines</h3>
              <ul>${pet.vaccines.map(vaccineList).join("")}</ul>
              <a href="/">Back</a>
            </footer>
          </article>`;
}

export default function render() {
  const petId = getHash();

  function isIdMatched(pet) {
    return pet.id === petId;
  }

  const pet = pets.find(isIdMatched);

  if (!pet) {
    document.getElementById("app").innerHTML = ErrorBanner();
    return;
  }

  document.getElementById("app").innerHTML = PetDetails(pet);
}
