/* API Clientn - file for all API communication: base URL, headers, auth functions, CRUD methods */

import { getToken, getApiKey, saveAuth, saveApiKey } from '../auth/storage.js';

const BASE_URL = 'https://v2.api.noroff.dev';

// Core
async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const headers = { 'Content-Type': 'application/json' };

  const token  = getToken();
  const apiKey = getApiKey();

  if (token)  headers['Authorization']    = `Bearer ${token}`;
  if (apiKey) headers['X-Noroff-API-Key'] = apiKey;

  const config = {
    method: body ? 'POST' : 'GET',
    ...customOptions,
    headers: { ...headers, ...customOptions.headers }
  };

  if (body) config.body = JSON.stringify(body);

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (response.status === 204) return { data: null };

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'An API error occurred');
    }

    return data;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}

// CRUD
export const get  = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put  = (endpoint, body) => apiClient(endpoint, { method: 'PUT', body });
export const del  = (endpoint) => apiClient(endpoint, { method: 'DELETE' });

// Auth
export async function register(userData) {
  const result = await post('/auth/register', userData);
  return result.data;
}

export async function login(credentials) {
  const result = await post('/auth/login', credentials);
  return result.data;
}

export async function createApiKey(accessToken) {
  const result = await apiClient('/auth/create-api-key', {
    method: 'POST',
    body: { name: 'Social Media App Key' },
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return result.data.key;
}

export async function completeRegistration(userData) {
  await register(userData);

  const user = await login({
    email: userData.email,
    password: userData.password
  });

  saveAuth(user);

  const apiKey = await createApiKey(user.accessToken);
  saveApiKey(apiKey);

  return user;
}

// Posts
export async function createPost(postData) {
  const result = await post('/social/posts', postData);
  return result.data;
}