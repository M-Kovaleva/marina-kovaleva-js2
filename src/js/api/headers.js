export function getHeaders(includeContentType = true) {
  const headers = {};

  // Get stored credentials
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  // Add Authorization header if token exists
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Add API Key header if exists
  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey;
  }

  // Add Content-Type for JSON requests
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

export function getCurrentUser() {
  const userName = localStorage.getItem('userName');
  return userName;
}