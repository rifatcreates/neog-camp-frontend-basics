import { apiAddCinema } from "../api/apiAddCinema.js";
import { apiGetCinema } from "../api/apiGetCinema.js";

async function newId() {
  const { data } = await apiGetCinema();
  return data.length + 1;
}

function AddMovieForm() {
  return `<h2>What movie did you watch recently?</h2>
          <form id="add-form">
            <input type="text" placeholder="Title" id="title" />
            <input type="text" placeholder="Director" id="director" />
            <select id="genre">
              <option value="" selected disabled>Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Documentary">Documentary</option>
              <option value="Other">Other</option>
            </select>
            <input type="date" id="dateWatched" />
            <textarea placeholder="Your Review" id="review"></textarea>
            <button type="submit" id="btn">Add Movie</button>
          </form>
          <div id="result"></div>`;
}

async function handleAddMovieForm(event) {
  event.preventDefault();
  const formElement = document.getElementById("add-form");
  const resultElement = document.getElementById("result");

  const payload = {
    id: await newId(),
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    genre: document.getElementById("genre").value,
    dateWatched: document.getElementById("dateWatched").value,
    review: document.getElementById("review").value,
  };

  const { error } = await apiAddCinema(payload);

  if (!error) {
    resultElement.innerText = "A New Movie Successfully Added!";
    resultElement.style.color = "green";
    formElement.reset();
  } else {
    resultElement.innerText = "Error Occured!!!";
    resultElement.style.color = "red";
    return;
  }
}

export default function render() {
  document.getElementById("app").innerHTML = AddMovieForm();

  const formElement = document.getElementById("add-form");
  formElement.addEventListener("submit", handleAddMovieForm);
}
