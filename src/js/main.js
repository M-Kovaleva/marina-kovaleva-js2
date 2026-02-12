import { router, navigateTo } from './router/router.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized!');

  // Handle all navigation link clicks using event delegation
  document.body.addEventListener('click', (e) => {
    // Check if clicked element is a link with data-link attribute
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', router);

  // Load initial page
  router();
});