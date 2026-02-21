/* Login form handler. Handles login form submission and validation */
import { login, createApiKey } from "../api/apiClient.js";
import { saveAuth, saveApiKey } from "./storage.js";
import { navigateTo } from "../router/router.js";
import { updateAuthLink } from "../components/Nav.js";
import {
  validateEmail,
  validatePassword,
  clearAllErrors,
} from "../utils/validation.js";

/* Show error for login form field */
function showLoginError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(
    `${fieldId.replace("login-", "")}-error`,
  );

  if (input) {
    input.classList.add("error");
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

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
  const validations = [
    { field: "login-email", validator: () => validateEmail(email) },
    { field: "login-password", validator: () => validatePassword(password) },
  ];

  let isValid = true;

  for (const { field, validator } of validations) {
    const result = validator();
    if (!result.valid) {
      showLoginError(field, result.message);
      isValid = false;
    }
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
    // Step 1: Login
    const user = await login(credentials);

    // Step 2: Save auth data
    saveAuth(user);

    // Step 3: Create API key (if doesn't exist)
    const apiKey = await createApiKey(user.accessToken);

    // Step 4: Save API key
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
