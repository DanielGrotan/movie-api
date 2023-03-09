const API_KEY = "fb117798";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export type MovieData = {
  title: string;
  releaseYear: string;
  type: string;
  imdbId: string;
  posterUrl: string;
};

function extractMovieData(data: any): MovieData {
  return {
    title: data.Title,
    releaseYear:
      data.Year.slice(-1).charCodeAt(0) === 8211
        ? data.Year.slice(0, -1)
        : data.Year,
    type: data.Type,
    imdbId: data.imdbID,
    posterUrl: data.Poster,
  };
}

type MoviesFetchResult = {
  movies: MovieData[];
  totalResults: number;
};

export async function fetchMoviesByTerm(
  searchTerm: string,
  page: number
): Promise<MoviesFetchResult> {
  const url = new URL(API_URL);
  url.searchParams.set("s", searchTerm);
  url.searchParams.set("page", page.toString());

  const res = await fetch(url.href);

  if (!res.ok) {
    console.error("Failed to fetch movies by term: ${searchTerm}");
    return { movies: [], totalResults: 0 };
  }

  const data = await res.json();

  if (data.Response === "False") {
    console.error(data.Error);
    return { movies: [], totalResults: 0 };
  }

  console.log(data);

  return {
    movies: data.Search.map(extractMovieData),
    totalResults: parseInt(data.totalResults),
  };
}
