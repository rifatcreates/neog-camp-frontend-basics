import { apiAddLending } from "../api/apiAddLending.js";
import { apiGetLendings } from "../api/apiGetLendings.js";

async function newId() {
  const { data } = await apiGetLendings();
  const id = data.length + 1;
  return id;
}

function AddNewLending() {
  return `<h2>What did you lend recently?</h2>
          <form id="form">
            <input type="text" placeholder="Who" id="who" />
            <select id="type">
              <option value="" selected disabled>What</option>
              <option value="Book">Book</option>
              <option value="Money">Money</option>
              <option value="Tool">Tool</option>
              <option value="Other">Other</option>
            </select>
            <input type="datetime-local" id="when" />
            <input type="text" placeholder="Additional Details" id="details" />
            <button type="submit" id="btn">Add Lending</button>
          </form>
          <div id="result"></div>`;
}

async function newLending(event) {
  event.preventDefault();

  const form = document.getElementById("form");
  const resultElement = document.getElementById("result");

  const payload = {
    id: await newId(),
    who: document.getElementById("who").value,
    type: document.getElementById("type").value,
    details: document.getElementById("details").value,
    when: document.getElementById("when").value,
    action: "View",
  };

  const { error } = await apiAddLending(payload);

  if (!error) {
    resultElement.innerText = `A New Lending Successfully Added!`;
    resultElement.style.color = "green";
    form.reset();
  } else {
    resultElement.innerText = `Error Occured!!!`;
    resultElement.style.color = "red";
    return;
  }
}

export default function render() {
  document.getElementById("app").innerHTML = AddNewLending();

  const formElement = document.getElementById("form");
  formElement.addEventListener("submit", newLending);
}
