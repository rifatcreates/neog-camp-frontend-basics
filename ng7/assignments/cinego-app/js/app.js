import router from "./routes.js";
import movieAPIs from "./api/cinema.mock.server.js";
import themeSwitcher from "./lib/theme-switcher.js";

router.start();

movieAPIs();

function handleThemeSwitcher() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", handleThemeSwitcher);
