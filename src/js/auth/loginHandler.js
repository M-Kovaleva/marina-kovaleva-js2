/* Login form handler. Handles login form submission and validation */
import { login, createApiKey } from "../api/apiClient.js";
import { saveAuth, saveApiKey } from "./storage.js";
import { navigateTo } from "../router/router.js";
import { updateAuthLink } from "../components/Nav.js";
import {
  validateEmail,
  validatePassword,
  validateFields,
  clearAllErrors,
} from "../utils/validation.js";

/* Setup login form event listeners */
export function setupLoginForm() {
  const form = document.getElementById("login-form");

  if (!form) return;

  form.addEventListener("submit", handleLoginSubmit);
}

/* Handle login form submission */
async function handleLoginSubmit(event) {
  event.preventDefault();

  // Get form data using FormData API
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  // Extract and clean values
  const email = formFields.email?.trim() || "";
  const password = formFields.password || "";

  // Get UI elements
  const submitButton = document.getElementById("login-submit");
  const loadingSpinner = document.getElementById("login-loading");
  const errorMessage = document.getElementById("login-error");
  const errorText = document.getElementById("login-error-text");

  // Clear previous errors
  clearAllErrors();
  errorMessage.style.display = "none";

  // Validate fields
  const isValid = validateFields([
    { field: "login-email", validator: () => validateEmail(email) },
    { field: "login-password", validator: () => validatePassword(password) },
  ]);

  if (!isValid) {
    return;
  }

  // Stop if validation failed
  if (!isValid) return;

  // Build credentials object
  const credentials = { email, password };

  // Show loading state
  submitButton.disabled = true;
  submitButton.style.display = "none";
  loadingSpinner.style.display = "block";

  try {
    // Login
    const user = await login(credentials);

    // Save auth data
    saveAuth(user);

    // Create API key (if doesn't exist)
    const apiKey = await createApiKey(user.accessToken);

    // Save API key
    saveApiKey(apiKey);

    // Update auth link: Login - Logout
    updateAuthLink();

    // Redirect to home
    navigateTo("/");
  } catch (error) {
    // Show error message
    loadingSpinner.style.display = "none";
    submitButton.style.display = "block";
    submitButton.disabled = false;

    console.error("Login error:", error);
    errorText.textContent = error.message || "Login failed. Please try again.";
    errorMessage.style.display = "block";
  }
}
