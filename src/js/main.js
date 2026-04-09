import { router, navigateTo } from "./router/router.js";
import { initAuthLink, updateAuthLink } from "./components/Nav.js";
import { initTheme, initThemeToggle, initMobileMenu } from "./utils/theme.js";

// Initialize theme immediately (before DOM ready to prevent flash)
initTheme();

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize auth link
  initAuthLink();

  // Initialize theme toggle buttons
  initThemeToggle();

  // Initialize mobile menu
  initMobileMenu();

  // Handle all navigation link clicks using event delegation
  document.body.addEventListener("click", (e) => {
    // Check if clicked element is a link with data-link attribute
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", router);

  // Load initial page
  router();
});

// Export for use in handlers
export { updateAuthLink };
