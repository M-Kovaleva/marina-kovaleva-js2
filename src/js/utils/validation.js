/*Validate email format (should be @stud.noroff.no)*/
export function validateEmail(email) {
  if (!email) {
    return { valid: false, message: "Email is required" };
  }
  // Should be @stud.noroff.no email
  const pattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!pattern.test(email)) {
    return {
      valid: false,
      message: "Email must be a valid @stud.noroff.no address",
    };
  }
  return { valid: true, message: "" };
}

/*Validate username format (letters, numbers, underscores only)*/
export function validateUsername(username) {
  if (!username) {
    return { valid: false, message: "Username is required" };
  }
  // Only letters, numbers, and underscores
  const pattern = /^[a-zA-Z0-9_]+$/;
  if (!pattern.test(username)) {
    return {
      valid: false,
      message: "Username can only contain letters, numbers, and underscores",
    };
  }
  return { valid: true, message: "" };
}

/*Validate password (minimum 8 characters)*/
export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  return { valid: true, message: "" };
}

/* Validate avatar URL */
export function validateAvatarUrl(url) {
  // Empty is OK
  if (!url || url.trim() === "") {
    return { valid: true, message: "" };
  }

  // Check if it's a valid URL
  try {
    const urlObj = new URL(url);

    // Must be http or https
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return {
        valid: false,
        message: "URL must start with http:// or https://",
      };
    }

    // Check if URL ends with image extension
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const hasImageExt = imageExtensions.some((ext) =>
      url.toLowerCase().endsWith(ext),
    );

    if (!hasImageExt) {
      return {
        valid: false,
        message:
          "URL must be a direct link to an image (jpg, png, gif, webp, svg)",
      };
    }

    return { valid: true, message: "" };
  } catch {
    return { valid: false, message: "Please enter a valid URL" };
  }
}

/* Show error message for a field */
export function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(
    `${fieldId.replace("register-", "")}-error`,
  );

  if (input) {
    input.classList.add("error");
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

/* Clear error message for a field*/
export function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(
    `${fieldId.replace("register-", "")}-error`,
  );

  if (input) {
    input.classList.remove("error");
  }

  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

/*Clear all error messages*/
export function clearAllErrors() {
  const errorElements = document.querySelectorAll(".form-error");
  const inputElements = document.querySelectorAll(
    "input.error, textarea.error",
  );

  errorElements.forEach((el) => {
    el.textContent = "";
    el.classList.remove("show");
  });

  inputElements.forEach((el) => {
    el.classList.remove("error");
  });
}

/**
 * Run multiple field validations
 * @param {Array} validations - Array of validation objects
 * @param {string} validations[].field - Field ID
 * @param {Function} validations[].validator - Validator function returning {valid, message}
 * @returns {boolean} True if all validations pass
 */
export function validateFields(validations) {
  let isValid = true;

  for (const { field, validator } of validations) {
    const result = validator();
    if (!result.valid) {
      showError(field, result.message);
      isValid = false;
    }
  }

  return isValid;
}
