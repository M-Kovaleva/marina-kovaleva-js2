/**
 * Theme Toggle Module
 */

const THEME_KEY = "theme";

/**
 * Initialize theme on page load
 */
export function initTheme() {
  if (
    localStorage.getItem(THEME_KEY) === "dark" ||
    (!localStorage.getItem(THEME_KEY) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  }
}

/**
 * Initialize theme toggle buttons
 */
export function initThemeToggle() {
  document
    .querySelectorAll("#theme-toggle, #theme-toggle-mobile")
    .forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      });
    });
}

/**
 * Initialize mobile menu
 */
export function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });

  // Close menu when clicking links
  mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    });
  });
}
