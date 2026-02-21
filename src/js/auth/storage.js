// Storage keys
const KEYS = {
  ACCESS_TOKEN: "accessToken",
  API_KEY: "apiKey",
  USER_NAME: "userName",
  USER_EMAIL: "userEmail",
  USER_AVATAR: "userAvatar",
  USER_BIO: "userBio",
};

/**
 * Save authentication data to localStorage
 * @param {Object} data - Authentication data
 * @param {string} [data.accessToken] - Access token
 * @param {string} [data.name] - User name
 * @param {string} [data.email] - User email
 * @param {Object} [data.avatar] - Avatar object
 * @param {string} [data.avatar.url] - Avatar URL
 */
export function saveAuth(data) {
  if (data.accessToken) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, data.accessToken);
  }
  if (data.name) {
    localStorage.setItem(KEYS.USER_NAME, data.name);
  }
  if (data.email) {
    localStorage.setItem(KEYS.USER_EMAIL, data.email);
  }
  if (data.avatar?.url) {
    localStorage.setItem(KEYS.USER_AVATAR, data.avatar.url);
  }
}

export function saveApiKey(apiKey) {
  localStorage.setItem(KEYS.API_KEY, apiKey);
}

export function getToken() {
  return localStorage.getItem(KEYS.ACCESS_TOKEN);
}

export function getApiKey() {
  return localStorage.getItem(KEYS.API_KEY);
}

/**
 * Get current user data from localStorage
 * @returns {Object|null} User data object or null if not authenticated
 * @returns {string} returns.name - User name
 * @returns {string} returns.email - User email
 * @returns {string} returns.avatar - Avatar URL
 */
export function getCurrentUserData() {
  const token = getToken();
  if (!token) return null;

  return {
    name: localStorage.getItem(KEYS.USER_NAME),
    email: localStorage.getItem(KEYS.USER_EMAIL),
    avatar: localStorage.getItem(KEYS.USER_AVATAR),
  };
}

export function isAuthenticated() {
  return !!getToken();
}

export function clearAuth() {
  localStorage.removeItem(KEYS.ACCESS_TOKEN);
  localStorage.removeItem(KEYS.API_KEY);
  localStorage.removeItem(KEYS.USER_NAME);
  localStorage.removeItem(KEYS.USER_EMAIL);
  localStorage.removeItem(KEYS.USER_AVATAR);
  localStorage.removeItem(KEYS.USER_BIO);
}

export function hasApiKey() {
  return !!getApiKey();
}

export function logout() {
  clearAuth();
}
