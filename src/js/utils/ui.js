/* reusable UI helper functions */
/**
 * loading spinner and content visibility
 * @param {string} spinnerId - ID of loading spinner element
 * @param {string} contentId - ID of content element
 * @param {boolean} isLoading - Show loading if true, show content if false
 */
export function toggleLoading(spinnerId, contentId, isLoading) {
  const spinner = document.getElementById(spinnerId);
  const content = document.getElementById(contentId);

  if (!spinner || !content) return;

  if (isLoading) {
    spinner.style.display = "block";
    content.style.display = "none";
  } else {
    spinner.style.display = "none";
    content.style.display = "block";
  }
}

/**
 * Create avatar element (image or placeholder)
 * @param {string} avatarUrl - Avatar image URL
 * @param {string} name - User name (for alt text)
 * @param {string} [baseClass='avatar'] - Base CSS class name
 * @param {string} [size='default'] - Size variant (small, medium, large, default)
 * @returns {HTMLElement} Avatar element (img or div)
 */
export function createAvatar(
  avatarUrl,
  name,
  baseClass = "avatar",
  size = "default"
) {
  if (avatarUrl) {
    const img = document.createElement("img");
    img.src = avatarUrl;
    img.alt = name;
    img.className = `${baseClass} ${baseClass}-${size}`;
    return img;
  }

  const placeholder = document.createElement("div");
  placeholder.className = `${baseClass}-placeholder ${baseClass}-${size}`;
  return placeholder;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @param {string} format - 'short' | 'long' | 'full'
 * @returns {string} Formatted date
 */
export function formatDate(dateString, format = "short") {
  const options = {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    long: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    full: {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Date(dateString).toLocaleDateString(
    "en-GB",
    options[format] || options.short
  );
}

/**
 * Show confirmation dialog
 * @param {string} message - Confirmation message
 * @returns {boolean} User confirmation
 */
export function confirmAction(message) {
  return confirm(message);
}

/**
 * Show alert message
 * @param {string} message - Alert message
 */
export function showAlert(message) {
  alert(message);
}
