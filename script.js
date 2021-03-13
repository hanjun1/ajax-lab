const API_KEY = "44a0a086";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

let movies;

let formContainerEl = document.getElementById("form-container");
let resultContainerEl = document.getElementById("result-container");
let searchButton = document.querySelector("#form-container button");
let movieInputEl = document.querySelector("#form-container input");

searchButton.addEventListener("click", findMovie);
document.addEventListener("click", viewPlot);

async function findMovie() {
  let movieURL = BASE_URL + "t=" + movieInputEl.value;
  movies = await fetch(movieURL).then((res) => res.json());
  let html;
  if (movies.Response === "False") {
    html = `No movies match the title of: ${movieInputEl.value}`;
  } else {
    html = `<p>Movie: ${movies.Title}</p><p>Year: ${movies.Year}</p><p>Actors: ${movies.Actors}</p><button id="plot">View Plot</button>`;
  }
  resultContainerEl.innerHTML = html;
}

async function viewPlot(e) {
  if (e.target.id != "plot") return;
  resultContainerEl.children[resultContainerEl.children.length - 1].remove();
  resultContainerEl.innerHTML += `<p>Plot: ${movies.Plot}</p>`;
}
