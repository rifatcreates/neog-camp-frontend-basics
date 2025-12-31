import { apiGetMovieDetails } from "../api/apiGetCinemaDetails.js";
import { apiDeleteMovie } from "../api/apiDeleteCinema.js";

function ErrorBanner(error) {
  return `<hgroup>
              <h2>Error Occured!!!</h2>
              <p>${error.message}</p>
            </hgroup>`;
}

function SuccessBanner() {
  return `<hgroup>
              <h2>Movie Deleted Successfully!</h2>
              <a href="/">Back to home</a>
            </hgroup>`;
}

function MovieDetails(movie) {
  return `<article>
            <header>
              <h3>${movie.title}</h3>
            </header>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Date Watched:</strong> ${movie.dateWatched}</p>
            <p><strong>Review:</strong> ${movie.review}</p>
            <footer>
              <button type="button" class="secondary outline" id="btn">Remove</button>
            </footer>
          </article>`;
}

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

function removeButton() {
  const btnElement = document.getElementById("btn");
  btnElement.addEventListener("click", handleRemoveButton);
}

async function handleRemoveButton() {
  const id = getHash();
  const { error } = await apiDeleteMovie(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = SuccessBanner();
}

export default async function render() {
  const id = getHash();

  const { error, data } = await apiGetMovieDetails(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = MovieDetails(data);

  removeButton();
}
