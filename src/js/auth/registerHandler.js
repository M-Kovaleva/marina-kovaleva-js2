/* Register Form Handler. Handles registration form submission and validation. Improved version with FormData*/
import { completeRegistration } from "../api/apiClient.js";
import { navigateTo } from "../router/router.js";
import { updateAuthLink } from "../components/Nav.js";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateAvatarUrl,
  showError,
  clearAllErrors,
} from "../utils/validation.js";

/* Setup register form event listeners*/
export function setupRegisterForm() {
  const form = document.getElementById("register-form");

  if (!form) return;

  form.addEventListener("submit", handleRegisterSubmit);
}
/**
 * Handle register form submission
 * @param {Event} event - Form submit event
 */
async function handleRegisterSubmit(event) {
  event.preventDefault();

  // Get form data using FormData API
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  // Extract and clean values
  const email = formFields.email?.trim() || "";
  const password = formFields.password || "";
  const name = formFields.name?.trim() || "";
  const avatarUrl = formFields.avatarUrl?.trim() || "";
  // Get UI elements
  const submitButton = document.getElementById("register-submit");
  const loadingSpinner = document.getElementById("register-loading");
  const successMessage = document.getElementById("register-success");
  const errorMessage = document.getElementById("register-error");
  const errorText = document.getElementById("register-error-text");

  // Clear previous errors
  clearAllErrors();
  errorMessage.style.display = "none";

  // Validate fields
  const validations = [
    { field: "register-name", validator: () => validateUsername(name) },
    { field: "register-email", validator: () => validateEmail(email) },
    { field: "register-password", validator: () => validatePassword(password) },
    { field: "register-avatar", validator: () => validateAvatarUrl(avatarUrl) },
  ];

  let isValid = true;

  for (const { field, validator } of validations) {
    const result = validator();
    if (!result.valid) {
      showError(field, result.message);
      isValid = false;
    }
  }

  // Stop if validation failed
  if (!isValid) return;

  // Build user data object
  const userData = { name, email, password };

  // Add avatar if provided
  if (avatarUrl) {
    userData.avatar = {
      url: avatarUrl,
      alt: `${name}'s avatar`,
    };
  }

  // Show loading state
  submitButton.disabled = true;
  submitButton.style.display = "none";
  loadingSpinner.style.display = "block";

  try {
    // Call API
    await completeRegistration(userData);

    // Show success message
    loadingSpinner.style.display = "none";
    successMessage.style.display = "block";

    // Update auth link: Login - Logout
    updateAuthLink();

    // Redirect to login
    setTimeout(() => navigateTo("/"), 3000);
  } catch (error) {
    // Show error message
    loadingSpinner.style.display = "none";
    submitButton.style.display = "block";
    submitButton.disabled = false;

    errorText.textContent =
      error.message || "Registration failed. Please try again.";
    errorMessage.style.display = "block";
  }
}
