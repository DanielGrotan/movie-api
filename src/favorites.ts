import "./index.css";
import { setupNavbar } from "./Navbar";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <header id="primary-header"></header>
`;

setupNavbar(document.querySelector("#primary-header")!, "Favorites");
