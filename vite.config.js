import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "movie-details": resolve(__dirname, "movie-details/index.html"),
        favorites: resolve(__dirname, "favorites/index.html"),
      },
    },
  },
});
