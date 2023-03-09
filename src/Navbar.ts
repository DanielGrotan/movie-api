const pages = [
  { pageName: "Search", link: "/" },
  { pageName: "Favorites", link: "favorites/" },
] as const;

type PageName = (typeof pages)[number]["pageName"];

export function setupNavbar(target: HTMLElement, currentPage: PageName | null) {
  target.innerHTML = `
        <nav class="flex">
            ${pages
              .map(
                ({ pageName, link }) => `
                <a href="${link}" class="flex-1 text-center hover:bg-cyan-700 py-2 text-lg font-semibold border border-b-0 border-cyan-400
                ${pageName === currentPage ? "bg-cyan-600" : "bg-cyan-500"}
                ">${pageName}</a>
            `
              )
              .join("")}
        </nav>
    `;
}
