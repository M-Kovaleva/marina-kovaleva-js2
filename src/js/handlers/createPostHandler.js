/* Create Post Handler - handles post creation form */
import { createPost } from '../api/apiClient.js';
import { navigateTo } from '../router/router.js';
import { clearAllErrors } from '../utils/validation.js';

// ═══════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════

function validateTitle(title) {
  if (!title || title.trim() === '') {
    return { valid: false, message: 'Title is required' };
  }
  if (title.length > 100) {
    return { valid: false, message: 'Title must be 100 characters or less' };
  }
  return { valid: true, message: '' };
}

function validateMediaUrl(url) {
  if (!url || url.trim() === '') {
    return { valid: true, message: '' }; // Optional field
  }
  
  try {
    new URL(url);
    return { valid: true, message: '' };
  } catch {
    return { valid: false, message: 'Please enter a valid URL' };
  }
}

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId.replace('post-', '')}-error`);

  if (input) {
    input.classList.add('error');
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

// ═══════════════════════════════════════════════
// FORM SUBMISSION
// ═══════════════════════════════════════════════

async function handleCreatePostSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  // Extract and clean values
  const title = formFields.title?.trim() || '';
  const body = formFields.body?.trim() || '';
  const tagsInput = formFields.tags?.trim() || '';
  const mediaUrl = formFields.media?.trim() || '';

  // Get UI elements
  const submitButton = document.getElementById('create-post-submit');
  const loadingSpinner = document.getElementById('create-post-loading');
  const successMessage = document.getElementById('create-post-success');
  const errorMessage = document.getElementById('create-post-error');
  const errorText = document.getElementById('create-post-error-text');

  // Clear previous errors
  clearAllErrors();
  errorMessage.style.display = 'none';

  // Validate fields
  const validations = [
    { field: 'post-title', validator: () => validateTitle(title) },
    { field: 'post-media', validator: () => validateMediaUrl(mediaUrl) }
  ];

  let isValid = true;

  for (const { field, validator } of validations) {
    const result = validator();
    if (!result.valid) {
      showError(field, result.message);
      isValid = false;
    }
  }

  if (!isValid) return;

  // Parse tags (comma-separated)
  const tags = tagsInput
    ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    : [];

  // Build post data
  const postData = {
    title,
    body: body || undefined,
    tags: tags.length > 0 ? tags : undefined,
    media: mediaUrl ? { url: mediaUrl } : undefined
  };

  // Show loading state
  submitButton.disabled = true;
  submitButton.style.display = 'none';
  loadingSpinner.style.display = 'block';

  try {
    await createPost(postData);

    // Show success
    loadingSpinner.style.display = 'none';
    successMessage.style.display = 'block';

    // Redirect to feed
    setTimeout(() => navigateTo('/'), 2000);

  } catch (error) {
    // Show error
    loadingSpinner.style.display = 'none';
    submitButton.style.display = 'block';
    submitButton.disabled = false;

    console.error('Create post error:', error);
    errorText.textContent = error.message || 'Failed to create post. Please try again.';
    errorMessage.style.display = 'block';
  }
}

// ═══════════════════════════════════════════════
// SETUP (called by router)
// ═══════════════════════════════════════════════

export function setupCreatePost() {
  const form = document.getElementById('create-post-form');

  if (!form) return;

  form.addEventListener('submit', handleCreatePostSubmit);
}