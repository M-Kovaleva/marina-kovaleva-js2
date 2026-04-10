/* Login/Logout link in navbar */
import { isAuthenticated, clearAuth } from "../auth/storage.js";
import { navigateTo } from "../router/router.js";

/* Initialize authentication link in navbar */
export function initAuthLink() {
  updateAuthLink();
}

/* Close mobile menu */
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}

/* Update auth link based on authentication status */
export function updateAuthLink() {
  const authLink = document.getElementById("auth-link");
  const authLinkMobile = document.getElementById("auth-link-mobile");

  const authenticated = isAuthenticated();

  // Update desktop link
  if (authLink) {
    updateSingleAuthLink(authLink, authenticated, false);
  }

  // Update mobile link
  if (authLinkMobile) {
    updateSingleAuthLink(authLinkMobile, authenticated, true);
  }
}

/* Update a single auth link element */
function updateSingleAuthLink(link, authenticated, isMobile) {
  if (authenticated) {
    // User is logged in - show Logout
    link.textContent = "Logout";
    link.href = "#";
    link.setAttribute("title", "Logout");
    link.removeAttribute("data-link");

    // Remove old listeners by cloning
    const newLink = link.cloneNode(true);
    link.replaceWith(newLink);

    // Add logout handler
    document
      .getElementById(newLink.id)
      .addEventListener("click", (e) => handleLogout(e, isMobile));
  } else {
    // User is not logged in - show Login
    link.textContent = "Login";
    link.href = "/login";
    link.setAttribute("title", "Login");
    link.setAttribute("data-link", "");

    // Remove old listeners by cloning
    const newLink = link.cloneNode(true);
    link.replaceWith(newLink);

    // Add click handler for mobile to close menu
    if (isMobile) {
      document
        .getElementById(newLink.id)
        .addEventListener("click", closeMobileMenu);
    }
  }
}

/* Handle logout click */
function handleLogout(e, isMobile) {
  e.preventDefault();
  
  if (isMobile) {
    closeMobileMenu();
  }
  
  clearAuth();
  updateAuthLink();
  navigateTo("/login");
}