/* Login/Logout link in navbar */
import { isAuthenticated, clearAuth } from "../auth/storage.js";
import { navigateTo } from "../router/router.js";

/* Initialize authentication link in navbar */
export function initAuthLink() {
  updateAuthLink(); // Call immediately upon initialization
}

/* Update auth link based on authentication status */
export function updateAuthLink() {
  const authLink = document.getElementById("auth-link");
  if (!authLink) return;

  const authenticated = isAuthenticated();

  if (authenticated) {
    // User is logged in - show Logout
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.setAttribute("title", "Logout");
    authLink.removeAttribute("data-link");

    // Remove old listeners by cloning
    const newAuthLink = authLink.cloneNode(true);
    authLink.replaceWith(newAuthLink);

    // Add logout handler
    document
      .getElementById("auth-link")
      .addEventListener("click", handleLogout);
  } else {
    // User is not logged in - show Login
    authLink.textContent = "Login";
    authLink.href = "/login";
    authLink.setAttribute("title", "Login");
    authLink.setAttribute("data-link", "");

    // Remove old listeners by cloning
    const newAuthLink = authLink.cloneNode(true);
    authLink.replaceWith(newAuthLink);
  }
}

/* Handle logout click */
function handleLogout(e) {
  e.preventDefault();
  clearAuth();
  updateAuthLink();
  navigateTo("/login");
}
