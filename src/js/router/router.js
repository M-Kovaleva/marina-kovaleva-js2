import Home from '../views/Home.js';
import Login from '../views/Login.js';
import Register from '../views/Register.js';
import Post from '../views/Post.js';
import Profile from '../views/Profile.js';
import NotFound from '../views/NotFound.js';
import { setupRegisterForm } from '../auth/registerHandler.js';
import { setupLoginForm } from '../auth/loginHandler.js'; 
import { setupFeed } from '../handlers/feedHandler.js'
import { setupSearch } from '../handlers/searchHandler.js';
import { setupPost } from '../handlers/postHandler.js';
import { isAuthenticated } from '../auth/storage.js'; // Imported authorization check

const PROTECTED = ['/', '/post/:id', '/profile/:name'];  // Protected routes

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  // Define all application routes
  const routes = [
    { path: '/', view: Home },
    { path: '/login', view: Login },
    { path: '/register', view: Register },
    { path: '/post/:id', view: Post },
    { path: '/profile/:name', view: Profile }
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  // Find the first matching route
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // If no match found, show 404 page
  if (!match) {
    match = {
      route: { path: location.pathname, view: NotFound },
      result: [location.pathname]
    };
  }

  // Authorization check
  if (PROTECTED.includes(match.route.path) && !isAuthenticated()) {
    navigateTo('/login');
    return;  // Stop execution
  }

  // Extract params if the route has any
  const params = getParams(match);

  // Pass params to the view constructor
  const view = new match.route.view(params);
  const app = document.querySelector('#app');
  app.innerHTML = await view.getHtml();

  // Initialize form after render
  // Initialize handlers
  if (match.route.path === '/') {
    setupFeed();    // Feed: posts + pagination
    setupSearch();  // Search: search form + logic
  }if (match.route.path === '/post/:id')
    setupPost(params.id); 
  if (match.route.path === '/register') 
  setupRegisterForm();
  if (match.route.path === '/login')  
  setupLoginForm();
  
};