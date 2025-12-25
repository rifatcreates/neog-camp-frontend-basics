const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

function handleThemeToggler(event) {
  if (event.target.checked) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

function initialTheme() {
  const preferDark = window.matchMedia("prefers-color-scheme: dark").matches;

  if (preferDark) {
    themeToggle.checked = true;
    setTheme("dark");
  } else {
    themeToggle.checked = false;
    setTheme("light");
  }
}

function setInitialTheme() {
  initialTheme();

  themeToggle.addEventListener("change", handleThemeToggler);
}

document.addEventListener("DOMContentLoaded", setInitialTheme);
