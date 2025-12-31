import themeSwitcher from "./lib/theme-switcher.js";
import router from "./routes.js";
import lendingAPIs from "./api/lendings.mock.server.js";

router.start();

lendingAPIs();

function handleThemeSwitcher() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", handleThemeSwitcher);
