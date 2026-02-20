/* Login/Logout link in navbar */
import { isAuthenticated, clearAuth } from '../auth/storage.js';
import { navigateTo } from '../router/router.js';

/**
 * Initialize authentication link in navbar
 * Shows Login or Logout based on authentication state
 * @param {string} authLinkId - ID of the auth link element
 */
export function initAuthLink(authLinkId = 'auth-link') {
  const authLink = document.getElementById(authLinkId);
  if (!authLink) return;

  /**
   * Logs out user by removing all authentication info
   * @param {Event} e - The click event
   */
  function logout(e) {
    e.preventDefault();
    
    // Remove all auth data
    clearAuth();
    
    // Update link back to Login
    updateAuthLink();
    
    // Redirect to login page
    navigateTo('/login');
  }

  /* Updates the authentication link */
  function updateAuthLink() {
    const authenticated = isAuthenticated();
    
    if (authenticated) {
      // User is logged in - show Logout
      authLink.textContent = 'Logout';
      authLink.href = '#';
      authLink.setAttribute('title', 'Logout');
      authLink.removeAttribute('data-link');
      authLink.addEventListener('click', logout);
    } else {
      // User is not logged in - show Login
      authLink.textContent = 'Login';
      authLink.href = '/login';
      authLink.setAttribute('title', 'Login');
      authLink.setAttribute('data-link', '');
      
      // Remove logout listener if exists
      const newAuthLink = authLink.cloneNode(true);
      authLink.replaceWith(newAuthLink);
    }
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', updateAuthLink);
}

/* Update auth link */
export function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;
  
  const authenticated = isAuthenticated();
  
  if (authenticated) {
    // Show Logout
    authLink.textContent = 'Logout';
    authLink.href = '#';
    authLink.setAttribute('title', 'Logout');
    authLink.removeAttribute('data-link');
    
    // Replace to remove old listeners
    const newAuthLink = authLink.cloneNode(true);
    authLink.replaceWith(newAuthLink);
    
    // Add logout handler
    document.getElementById('auth-link').addEventListener('click', (e) => {
      e.preventDefault();
      clearAuth();
      updateAuthLink();
      navigateTo('/login');
    });
  } else {
    // Show Login
    authLink.textContent = 'Login';
    authLink.href = '/login';
    authLink.setAttribute('title', 'Login');
    authLink.setAttribute('data-link', '');
    
    // Replace to remove old listeners
    const newAuthLink = authLink.cloneNode(true);
    authLink.replaceWith(newAuthLink);
  }
}