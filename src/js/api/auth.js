/* Authentication API Functions. Handles register, login, and API key creation */
import { 
  API_AUTH_REGISTER, 
  API_AUTH_LOGIN, 
  API_AUTH_KEY 
} from './constants.js';
import { saveAuth, saveApiKey } from '../auth/storage.js';

export async function register(userData) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (!response.ok) {
      // API returned an error
      throw new Error(result.errors?.[0]?.message || 'Registration failed');
    }

    return result.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}
/**
 * Login an existing user
 * @param {object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<object>} User data with access token
 */
export async function login(credentials) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Login failed');
    }

    return result.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
/**
 * Create API key for authenticated user
 * Must called after login/register
 * @param {string} accessToken - User's access token
 * @returns {Promise<string>} API key
 */
export async function createApiKey(accessToken) {
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ name: 'Social Media App Key' })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Failed to create API key');
    }

    return result.data.key;
  } catch (error) {
    console.error('Create API key error:', error);
    throw error;
  }
}
/**
 * Complete registration flow
 * Registers user, creates API key, and saves to localStorage
 * @param {object} userData - User registration data
 * @returns {Promise<object>} Complete user data
 */
export async function completeRegistration(userData) {
  try {
    // Step 1: Register user
    console.log('Step 1: Registering user...');
    await register(userData);
    console.log('User registered!');
    
    // Step 2: Login to get access token
    console.log('Step 2: Logging in to get token...');
    const user = await login({
      email: userData.email,
      password: userData.password
    });
    console.log('Logged in! Token received:', user.accessToken ? 'Yes' : 'No');
    
    // Step 3: Save auth data to localStorage
    console.log('Step 3: Saving auth data...');
    saveAuth(user);
    console.log('Auth data saved!');
    
    // Step 4: Create API key
    console.log('Step 4: Creating API key...');
    const apiKey = await createApiKey(user.accessToken);
    console.log('API key created:', apiKey);
    
    // Step 5: Save API key
    console.log('Step 5: Saving API key...');
    saveApiKey(apiKey);
    console.log('API key saved!');
    
    console.log('Registration complete!');
    return user;
  } catch (error) {
    console.error('Registration flow error:', error);
    throw error;
  }
}
