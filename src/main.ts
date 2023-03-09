import { fetchMoviesByTerm, MovieData } from "./apiHandler";
import "./index.css";
import { setupNavbar } from "./Navbar";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <header id="primary-header"></header>
    <main class="px-6 py-5">
        <h1 class="mt-4 text-4xl text-center md:text-left">Search for movies by a term</h1>
        <form id="search-form" class="mt-4 flex items-center gap-1 ml-2">
            <input id="search-term" placeholder="Enter a search term" class="text-black px-3 py-2 rounded-md" />
            <button type="submit" class="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md">Search</button>
        </form>
        <section id="movie-results"></section>
        <section id="pagination"></section>
    </main>
`;

setupNavbar(document.querySelector("#primary-header")!, "Search");

const searchTermInput = document.querySelector(
  "#search-term"
) as HTMLInputElement;
const movieResultsSection = document.querySelector(
  "#movie-results"
) as HTMLElement;
const paginationSection = document.querySelector("#pagination") as HTMLElement;

let movieResults = [];
let currentPage = 1;

function renderMovies(movies: MovieData[]) {
  movieResultsSection.innerHTML = `
        ${movies
          .map(
            (movie) => `
            <h2>${movie.title} (${movie.releaseYear})</h2>
            <span>Type: <span class="capitalize">${movie.type}</span></span>
            <img src="${movie.posterUrl}" class="w-[300px] h-[500px]">
        `
          )
          .join("")}
    `;
}

function setupSearchForm(element: HTMLFormElement) {
  element.addEventListener("submit", async (e) => {
    e.preventDefault();

    currentPage = 1;

    const searchTerm = searchTermInput.value;
    const { movies, totalResults } = await fetchMoviesByTerm(
      searchTerm,
      currentPage
    );

    movieResults = movies.sort((a, b) =>
      a.type < b.type ? 1 : a.type === b.type ? 0 : -1
    );

    renderMovies(movieResults);
  });
}

setupSearchForm(document.querySelector<HTMLFormElement>("#search-form")!);
