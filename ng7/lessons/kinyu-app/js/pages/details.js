import { apiGetLendingDetails } from "../api/apiGetLendingDetails.js";
import { apiDeleteLending } from "../api/apiDeleteLending.js";

function ErroBanner(error) {
  return `<hgroup>
                <h2>Error Occured!!!</h2>
                <p>${error.message}</p>
              </hgroup>`;
}

function SuccessMessage() {
  return `<hgroup>
            <h2>Lending Successfully Deleted!!!</h2>
            <a href="/">Back to home</a>
          </hgroup>`;
}

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

function LendingDetails(lending) {
  const date = lending.when.split("T")[0];
  return `<article>
            <header>
              <h2>${lending.who}</h2>
            </header>
            <p>${lending.type}</p>
            <p>${lending.details}</p>
            <p>${date}</p>
            <footer>
              <button type="button" class="contrast" id="btn">Remove</button>
            </footer>
          </article>`;
}

async function lendingRemoveButton() {
  const id = getHash();
  const { error } = await apiDeleteLending(id);

  if (!error) {
    document.getElementById("app").innerHTML = SuccessMessage();
  } else {
    document.getElementById("app").innerHTML = ErroBanner(error);
    return;
  }
}

function handleRemoveButton() {
  const btnElement = document.getElementById("btn");
  btnElement.addEventListener("click", lendingRemoveButton);
}

export default async function render() {
  const id = getHash();

  const { data, error } = await apiGetLendingDetails(id);

  if (error) {
    document.getElementById("app").innerHTML = ErroBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = LendingDetails(data);

  handleRemoveButton();
}
