/* Create Post Handler */
import { createPost } from '../api/apiClient.js';
import { clearAllErrors } from '../utils/validation.js';

/* Validation */
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
    return { valid: true, message: '' }; //user may not add an image
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

/* DOM creation - form fields */
/* Create form group: label, input, help, error */
function createFormGroup(config) {
  const group = document.createElement('div');
  group.className = 'form-group';

  // Label
  const label = document.createElement('label');
  label.htmlFor = config.id;
  label.textContent = config.label;
  group.append(label);

  // Input
  let input;
  if (config.type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = config.rows || 8;
  } else {
    input = document.createElement('input');
    input.type = config.type || 'text';
    if (config.maxlength) input.maxLength = config.maxlength;
  }
  
  input.id = config.id;
  input.name = config.name;
  input.placeholder = config.placeholder || '';
  if (config.required) input.required = true;
  
  group.append(input);

  // Help text
  if (config.helpText) {
    const help = document.createElement('small');
    help.className = 'form-help';
    help.textContent = config.helpText;
    group.append(help);
  }

  // Error span
  const error = document.createElement('span');
  error.className = 'form-error';
  error.id = `${config.id.replace('post-', '')}-error`;
  group.append(error);

  return group;
}

/* Create title field */
function createTitleField() {
  return createFormGroup({
    id: 'post-title',
    name: 'title',
    label: 'Title *',
    type: 'text',
    required: true,
    placeholder: 'Enter post title',
    maxlength: 100,
    helpText: 'Required • Max 100 characters'
  });
}

/* Create body field */
function createBodyField() {
  return createFormGroup({
    id: 'post-body',
    name: 'body',
    label: 'Content',
    type: 'textarea',
    placeholder: "What's on your mind?",
    rows: 8,
    helpText: 'Optional'
  });
}

/* Create tags field */
function createTagsField() {
  return createFormGroup({
    id: 'post-tags',
    name: 'tags',
    label: 'Tags',
    type: 'text',
    placeholder: 'javascript, react, tutorial (comma-separated)',
    helpText: 'Optional • Separate tags with commas'
  });
}

/* Create media URL field */
function createMediaField() {
  return createFormGroup({
    id: 'post-media',
    name: 'media',
    label: 'Image URL',
    type: 'url',
    placeholder: 'https://example.com/image.jpg',
    helpText: 'Optional • Enter a valid image URL'
  });
}

/* Create submit button */
function createSubmitButton() {
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn-primary';
  button.id = 'create-post-submit';
  button.textContent = 'Create Post';
  return button;
}

/* DOM creation - success message */
function createSuccessMessage() {
  const container = document.createElement('div');
  container.className = 'success-message';
  container.id = 'create-post-success';
  container.style.display = 'none';

  const text1 = document.createElement('p');
  text1.textContent = '✅ Post created successfully!';

  container.append(text1);
  return container;
}

/* DOM creation - error message */
function createErrorMessage() {
  const container = document.createElement('div');
  container.className = 'error-message';
  container.id = 'create-post-error';
  container.style.display = 'none';

  const text = document.createElement('p');
  text.id = 'create-post-error-text';

  container.append(text);
  return container;
}

/* DOM building - complete form */
function buildForm() {
  const form = document.getElementById('create-post-form');
  if (!form) return;

  // Clear form
  form.innerHTML = '';

  // Create and append all fields
  const titleField = createTitleField();
  const bodyField = createBodyField();
  const tagsField = createTagsField();
  const mediaField = createMediaField();
  const submitButton = createSubmitButton();
  const successMessage = createSuccessMessage();
  const errorMessage = createErrorMessage();

  form.append(
    titleField,
    bodyField,
    tagsField,
    mediaField,
    submitButton,
    successMessage,
    errorMessage
  );
}

/* DOM - loading spinner */

function showLoading(isLoading) {
  const spinner = document.getElementById('create-post-loading');
  const formCard = document.querySelector('.post-detail');

  if (!spinner || !formCard) return;

  if (isLoading) {
    spinner.style.display = 'block';
    formCard.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    formCard.style.display = 'block';
  }
}

/* Form submission */
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

  // tags 
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

  // Show loading 
  showLoading(true);
  submitButton.disabled = true;

  try {
    await createPost(postData);

    showLoading(false);
    successMessage.style.display = 'block';
    submitButton.style.display = 'none';

    setTimeout(() => navigateTo('/'), 2000);

  } catch (error) {
    showLoading(false);
    submitButton.disabled = false;

    console.error('Create post error:', error);
    errorText.textContent = error.message || 'Failed to create post. Please try again.';
    errorMessage.style.display = 'block';
  }
}

/* Setup called by router */
export function setupCreatePost() {
  // Build form with createElement
  buildForm();

  // Attach submit handler
  const form = document.getElementById('create-post-form');
  if (!form) return;

  form.addEventListener('submit', handleCreatePostSubmit);
}