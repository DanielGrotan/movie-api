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
        <section id="movie-results" class="mt-8 space-y-6"></section>
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

let movieResults;
let currentPage = 1;

function renderMovies(moviesByType: Map<string, MovieData[]>) {
  movieResultsSection.innerHTML = "";

  moviesByType.forEach((movies, type) => {
    const typeSection = document.createElement("section");
    typeSection.className = "px-8";
    movieResultsSection.appendChild(typeSection);

    const typeLine = document.createElement("hr");
    typeLine.className = "h-2 my-7";
    typeSection.appendChild(typeLine);

    const typeHeader = document.createElement("h2");
    typeHeader.innerHTML = type;
    typeHeader.className = "text-4xl";
    typeSection.appendChild(typeHeader);

    const typeContent = document.createElement("div");
    typeContent.className =
      "flex overflow-x-scroll scrollbar scrollbar-thumb-slate-600 scrollbar-track-transparent scrollbar-thumb-rounded-md scrollbar-h-3 gap-20 mt-4";

    typeContent.addEventListener("wheel", (e) => {
      e.preventDefault();

      typeContent.scrollBy({
        left: e.deltaY < 0 ? -60 : 60,
      });
    });

    typeSection.appendChild(typeContent);

    movies.forEach((movie) => {
      const movieArticle = document.createElement("article");
      movieArticle.className = "flex flex-col items-center w-[400px] shrink-0";
      typeContent.appendChild(movieArticle);

      const movieHeader = document.createElement("h3");
      movieHeader.innerHTML = `${movie.title} (${movie.releaseYear})`;
      movieHeader.className = "my-auto text-center text-xl";
      movieArticle.appendChild(movieHeader);

      const moviePosterImage = document.createElement("img");
      moviePosterImage.src = movie.posterUrl;
      moviePosterImage.className = "mt-4 mb-6 w-full rounded-2xl";
      movieArticle.appendChild(moviePosterImage);
    });
  });
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

    movieResults = new Map<string, MovieData[]>();

    for (const movie of movies) {
      if (movieResults.has(movie.type)) {
        movieResults.get(movie.type)?.push(movie);
      } else {
        movieResults.set(movie.type, [movie]);
      }
    }

    renderMovies(movieResults);
  });
}

setupSearchForm(document.querySelector<HTMLFormElement>("#search-form")!);
