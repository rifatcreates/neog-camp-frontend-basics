import { apiGetCinema } from "../api/apiGetCinema.js";

function ErrorBanner(error) {
  return `<hgroup>
            <h2>Error Movie Loading</h2>
            <p>${error.message}</p>
          </hgroup>`;
}

function movieHtml(movie) {
  return `<tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.genre}</td>
            <td><a href="details#${movie.id}">View</a></td>
          </tr>`;
}

function MovieList(movies) {
  const displayMovies = movies.map(movieHtml).join("");
  return `<h3>Movie Watchlist</h3>
          <hr/>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Director</th>
                <th>Genre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${displayMovies}
            </tbody>
          </table>`;
}

export default async function render() {
  const { error, data } = await apiGetCinema();

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = MovieList(data);
}
