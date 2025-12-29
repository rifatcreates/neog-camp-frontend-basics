import router from "./routes.js";
import themeSwitcher from "./lib/theme-switcher.js";

router.start();

function handleThemeSwitcher() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", handleThemeSwitcher);
