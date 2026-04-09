/* Create Post Handler */
import { createPost, get, put } from "../api/apiClient.js";
import { validateFields, clearAllErrors } from "../utils/validation.js";
import { navigateTo } from "../router/router.js";
import { toggleLoading, showAlert } from "../utils/ui.js";

/* Constants */
const MAX_TITLE_LENGTH = 100;
const REDIRECT_DELAY = 2000;

let currentPostId = null;

/* Validation */
function validateTitle(title) {
  if (!title || title.trim() === "") {
    return { valid: false, message: "Title is required" };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return {
      valid: false,
      message: `Title must be ${MAX_TITLE_LENGTH} characters or less`,
    };
  }
  return { valid: true, message: "" };
}

function validateMediaUrl(url) {
  if (!url || url.trim() === "") {
    return { valid: true, message: "" };
  }

  try {
    new URL(url);
    return { valid: true, message: "" };
  } catch {
    return { valid: false, message: "Please enter a valid URL" };
  }
}

/* DOM creation - form fields */
/* Create form group: label, input, help, error */
function createFormGroup(config) {
  const group = document.createElement("div");
  group.className = "form-group";

  // Label
  const label = document.createElement("label");
  label.htmlFor = config.id;
  label.textContent = config.label;
  group.append(label);

  // Input
  let input;
  if (config.type === "textarea") {
    input = document.createElement("textarea");
    input.rows = config.rows || 8;
  } else {
    input = document.createElement("input");
    input.type = config.type || "text";
    if (config.maxlength) input.maxLength = config.maxlength;
  }

  input.id = config.id;
  input.name = config.name;
  input.placeholder = config.placeholder || "";
  if (config.required) input.required = true;

  group.append(input);

  // Help text
  if (config.helpText) {
    const help = document.createElement("small");
    help.className = "form-help";
    help.textContent = config.helpText;
    group.append(help);
  }

  // Error span
  const error = document.createElement("span");
  error.className = "form-error";
  error.id = `${config.id.replace("post-", "")}-error`;
  group.append(error);

  return group;
}

/* Create title field */
function createTitleField() {
  return createFormGroup({
    id: "post-title",
    name: "title",
    label: "Title *",
    type: "text",
    required: true,
    placeholder: "Enter post title",
    maxlength: MAX_TITLE_LENGTH,
    helpText: `Required • Max ${MAX_TITLE_LENGTH} characters`,
  });
}

/* Create body field */
function createBodyField() {
  return createFormGroup({
    id: "post-body",
    name: "body",
    label: "Content",
    type: "textarea",
    placeholder: "What's on your mind?",
    rows: 8,
    helpText: "Optional",
  });
}

/* Create tags field */
function createTagsField() {
  return createFormGroup({
    id: "post-tags",
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "javascript, react, tutorial (comma-separated)",
    helpText: "Optional • Separate tags with commas",
  });
}

/* Create media URL field */
function createMediaField() {
  return createFormGroup({
    id: "post-media",
    name: "media",
    label: "Image URL",
    type: "url",
    placeholder: "https://example.com/image.jpg",
    helpText: "Optional • Enter a valid image URL",
  });
}

/* Create submit button */
function createSubmitButton() {
  const button = document.createElement("button");
  button.type = "submit";
  button.className = "btn-primary";
  button.id = "create-post-submit";
  button.textContent = "Create Post";
  return button;
}

/* DOM creation - success message */
function createSuccessMessage() {
  const container = document.createElement("div");
  container.className = "success-message";
  container.id = "create-post-success";
  container.style.display = "none";

  const text1 = document.createElement("p");
  text1.textContent = "✅ Post created successfully!";

  container.append(text1);
  return container;
}

/* DOM creation - error message */
function createErrorMessage() {
  const container = document.createElement("div");
  container.className = "error-message";
  container.id = "create-post-error";
  container.style.display = "none";

  const text = document.createElement("p");
  text.id = "create-post-error-text";

  container.append(text);
  return container;
}

/* DOM building - complete form */
function buildForm() {
  const form = document.getElementById("create-post-form");
  if (!form) return;

  // Clear form
  form.innerHTML = "";

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

/**
 * Load post data for editing
 * @param {string} postId
 * @returns {Promise<void>}
 */
async function loadPostForEdit(postId) {
  toggleLoading("create-post-loading", "post-detail", true);

  try {
    const result = await get(`/social/posts/${postId}`);
    const post = result.data;

    // Fill form with post data
    document.getElementById("post-title").value = post.title || "";
    document.getElementById("post-body").value = post.body || "";
    document.getElementById("post-tags").value = post.tags?.join(", ") || "";
    document.getElementById("post-media").value = post.media?.url || "";

    // Change page title
    const pageTitle = document.querySelector(".post-title");
    if (pageTitle) {
      pageTitle.textContent = "Edit Post";
    }

    toggleLoading("create-post-loading", "post-detail", false);
  } catch (error) {
    console.error("Failed to load post:", error);
    toggleLoading("create-post-loading", "post-detail", false);
    showAlert("Failed to load post for editing");
    navigateTo("/");
  }
}

/* Form submission */
async function handleCreatePostSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);

  // Extract and clean values
  const title = formFields.title?.trim() || "";
  const body = formFields.body?.trim() || "";
  const tagsInput = formFields.tags?.trim() || "";
  const mediaUrl = formFields.media?.trim() || "";

  // Get UI elements
  const submitButton = document.getElementById("create-post-submit");
  const successMessage = document.getElementById("create-post-success");
  const errorMessage = document.getElementById("create-post-error");
  const errorText = document.getElementById("create-post-error-text");

  // Clear previous errors
  clearAllErrors();
  errorMessage.style.display = "none";

  const isValid = validateFields([
    { field: "post-title", validator: () => validateTitle(title) },
    { field: "post-media", validator: () => validateMediaUrl(mediaUrl) },
  ]);

  if (!isValid) {
    return;
  }

  // tags
  const tags = tagsInput
    ? tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    : [];

  // Build post data
  const postData = {
    title,
    body: body || undefined,
    tags: tags.length > 0 ? tags : undefined,
    media: mediaUrl ? { url: mediaUrl } : undefined,
  };

  toggleLoading("create-post-loading", "post-detail", true);
  submitButton.disabled = true;

  try {
    // Edit or Create
    if (currentPostId) {
      // Edit - PUT
      await put(`/social/posts/${currentPostId}`, postData);
    } else {
      // Create - POST
      await createPost(postData);
    }

    toggleLoading("create-post-loading", "post-detail", false);
    successMessage.style.display = "block";
    submitButton.style.display = "none";

    setTimeout(() => navigateTo("/"), REDIRECT_DELAY);
  } catch (error) {
    toggleLoading("create-post-loading", "post-detail", false);
    submitButton.disabled = false;

    console.error("Create post error:", error);
    errorText.textContent =
      error.message || "Failed to create post. Please try again.";
    errorMessage.style.display = "block";
  }
}

/**
 * Setup create/edit post page - called by router
 * @returns {Promise<void>}
 */
export async function setupCreatePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  currentPostId = postId;
  const isEdit = !!postId;

  // Build form
  buildForm(isEdit);

  //If Edit mode, load post data
  if (isEdit) {
    await loadPostForEdit(postId);
  }

  // Attach submit handler
  const form = document.getElementById("create-post-form");
  if (!form) return;

  form.addEventListener("submit", handleCreatePostSubmit);
}
