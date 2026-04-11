import { describe, it, expect, beforeEach } from "@jest/globals";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateAvatarUrl,
  showError,
  clearError,
  clearAllErrors,
  validateFields,
} from "../utils/validation.js";

describe("validateEmail", () => {
  it("should return valid: true for correct @stud.noroff.no email", () => {
    const result = validateEmail("test.user@stud.noroff.no");

    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: false for non-stud.noroff.no email", () => {
    const result = validateEmail("test@gmail.com");

    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Email must be a valid @stud.noroff.no address"
    );
  });

  it("should return valid: false for empty email", () => {
    const result = validateEmail("");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Email is required");
  });

  it("should return valid: false for email without @", () => {
    const result = validateEmail("testuser.com");

    expect(result.valid).toBe(false);
  });

  it("should return valid: false for email without domain", () => {
    const result = validateEmail("test@");

    expect(result.valid).toBe(false);
  });
});

describe("validateUsername", () => {
  it("should return valid: true for valid username", () => {
    const result = validateUsername("john_doe_123");

    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: false for username with special characters", () => {
    const result = validateUsername("john@doe");

    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Username can only contain letters, numbers, and underscores"
    );
  });

  it("should return valid: false for username with spaces", () => {
    const result = validateUsername("john doe");

    expect(result.valid).toBe(false);
  });

  it("should return valid: false for empty username", () => {
    const result = validateUsername("");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Username is required");
  });

  it("should accept username with only letters", () => {
    const result = validateUsername("johndoe");
    expect(result.valid).toBe(true);
  });

  it("should accept username with only numbers", () => {
    const result = validateUsername("123456");
    expect(result.valid).toBe(true);
  });

  it("should accept username with underscores", () => {
    const result = validateUsername("john_doe_123");
    expect(result.valid).toBe(true);
  });
});

describe("validatePassword", () => {
  it("should return valid: true for password with 8+ characters", () => {
    const result = validatePassword("password123");

    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: false for password with less than 8 characters", () => {
    const result = validatePassword("pass123");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password must be at least 8 characters");
  });

  it("should return valid: false for empty password", () => {
    const result = validatePassword("");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password is required");
  });

  it("should accept password with exactly 8 characters", () => {
    const result = validatePassword("12345678");
    expect(result.valid).toBe(true);
  });

  it("should accept very long passwords", () => {
    const result = validatePassword("a".repeat(100));
    expect(result.valid).toBe(true);
  });
});

describe("validateAvatarUrl", () => {
  it("should return valid: true for empty URL", () => {
    const result = validateAvatarUrl("");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: true for whitespace-only URL", () => {
    const result = validateAvatarUrl("   ");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: true for valid HTTPS image URL with .jpg", () => {
    const result = validateAvatarUrl("https://example.com/avatar.jpg");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: true for valid HTTP image URL with .png", () => {
    const result = validateAvatarUrl("http://example.com/photo.png");
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: true for image URL with .jpeg extension", () => {
    const result = validateAvatarUrl("https://site.com/image.jpeg");
    expect(result.valid).toBe(true);
  });

  it("should return valid: true for image URL with .gif extension", () => {
    const result = validateAvatarUrl("https://site.com/animated.gif");
    expect(result.valid).toBe(true);
  });

  it("should return valid: true for image URL with .webp extension", () => {
    const result = validateAvatarUrl("https://site.com/modern.webp");
    expect(result.valid).toBe(true);
  });

  it("should return valid: true for image URL with .svg extension", () => {
    const result = validateAvatarUrl("https://site.com/icon.svg");
    expect(result.valid).toBe(true);
  });

  it("should accept uppercase image extensions", () => {
    const result = validateAvatarUrl("https://example.com/photo.PNG");
    expect(result.valid).toBe(true);
  });

  it("should accept mixed case extensions", () => {
    const result = validateAvatarUrl("https://example.com/image.JpG");
    expect(result.valid).toBe(true);
  });

  it("should return valid: false for URL without image extension", () => {
    const result = validateAvatarUrl("https://example.com/page");
    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "URL must be a direct link to an image (jpg, png, gif, webp, svg)"
    );
  });

  it("should return valid: false for URL with non-image extension", () => {
    const result = validateAvatarUrl("https://example.com/document.pdf");
    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "URL must be a direct link to an image (jpg, png, gif, webp, svg)"
    );
  });

  it("should return valid: false for URL without protocol", () => {
    const result = validateAvatarUrl("example.com/image.jpg");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Please enter a valid URL");
  });

  it("should return valid: false for FTP protocol", () => {
    const result = validateAvatarUrl("ftp://example.com/image.jpg");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("URL must start with http:// or https://");
  });

  it("should return valid: false for file:// protocol", () => {
    const result = validateAvatarUrl("file:///Users/photo.jpg");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("URL must start with http:// or https://");
  });

  it("should return valid: false for invalid URL format", () => {
    const result = validateAvatarUrl("not a url");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Please enter a valid URL");
  });

  it("should return valid: false for URL with query params but no extension", () => {
    const result = validateAvatarUrl("https://example.com/image?id=123");
    expect(result.valid).toBe(false);
  });
});
describe("showError", () => {
  beforeEach(() => {
    // Setup DOM before each test
    document.body.innerHTML = `
      <input id="email" />
      <div id="email-error" class="form-error"></div>
      
      <input id="login-email" />
      <div id="email-error" class="form-error"></div>
      
      <input id="register-username" />
      <div id="username-error" class="form-error"></div>
      
      <input id="create-post-title" />
      <div id="title-error" class="form-error"></div>
      
      <input id="post-body" />
      <div id="body-error" class="form-error"></div>
    `;
  });

  it("should add error class to input field", () => {
    const input = document.getElementById("email");
    showError("email", "Email is required");

    expect(input.classList.contains("error")).toBe(true);
  });

  it("should display error message", () => {
    const errorElement = document.getElementById("email-error");
    showError("email", "Email is required");

    expect(errorElement.textContent).toBe("Email is required");
    expect(errorElement.classList.contains("show")).toBe(true);
  });

  it("should handle login- prefix correctly", () => {
    const input = document.getElementById("login-email");
    const errorElement = document.getElementById("email-error");

    showError("login-email", "Invalid email");

    expect(input.classList.contains("error")).toBe(true);
    expect(errorElement.textContent).toBe("Invalid email");
  });

  it("should handle register- prefix correctly", () => {
    const input = document.getElementById("register-username");
    const errorElement = document.getElementById("username-error");

    showError("register-username", "Username taken");

    expect(input.classList.contains("error")).toBe(true);
    expect(errorElement.textContent).toBe("Username taken");
  });

  it("should handle create-post- prefix correctly", () => {
    const input = document.getElementById("create-post-title");
    const errorElement = document.getElementById("title-error");

    showError("create-post-title", "Title required");

    expect(input.classList.contains("error")).toBe(true);
    expect(errorElement.textContent).toBe("Title required");
  });

  it("should handle post- prefix correctly", () => {
    const input = document.getElementById("post-body");
    const errorElement = document.getElementById("body-error");

    showError("post-body", "Body required");

    expect(input.classList.contains("error")).toBe(true);
    expect(errorElement.textContent).toBe("Body required");
  });

  it("should not throw error if input element doesn't exist", () => {
    expect(() => {
      showError("nonexistent-field", "Error message");
    }).not.toThrow();
  });

  it("should not throw error if error element doesn't exist", () => {
    document.body.innerHTML = '<input id="test" />';

    expect(() => {
      showError("test", "Error message");
    }).not.toThrow();
  });
});

describe("clearError", () => {
  beforeEach(() => {
    // Setup DOM with errors already shown
    document.body.innerHTML = `
      <input id="email" class="error" />
      <div id="email-error" class="form-error show">Email is required</div>
      
      <input id="login-password" class="error" />
      <div id="password-error" class="form-error show">Password invalid</div>
      
      <input id="register-username" class="error" />
      <div id="username-error" class="form-error show">Username error</div>
    `;
  });

  it("should remove error class from input field", () => {
    const input = document.getElementById("email");
    clearError("email");

    expect(input.classList.contains("error")).toBe(false);
  });

  it("should clear error message text", () => {
    const errorElement = document.getElementById("email-error");
    clearError("email");

    expect(errorElement.textContent).toBe("");
  });

  it("should remove show class from error element", () => {
    const errorElement = document.getElementById("email-error");
    clearError("email");

    expect(errorElement.classList.contains("show")).toBe(false);
  });

  it("should handle login- prefix correctly", () => {
    const input = document.getElementById("login-password");
    const errorElement = document.getElementById("password-error");

    clearError("login-password");

    expect(input.classList.contains("error")).toBe(false);
    expect(errorElement.textContent).toBe("");
    expect(errorElement.classList.contains("show")).toBe(false);
  });

  it("should handle register- prefix correctly", () => {
    const input = document.getElementById("register-username");
    const errorElement = document.getElementById("username-error");

    clearError("register-username");

    expect(input.classList.contains("error")).toBe(false);
    expect(errorElement.textContent).toBe("");
  });

  it("should not throw error if elements don't exist", () => {
    expect(() => {
      clearError("nonexistent-field");
    }).not.toThrow();
  });
});

describe("clearAllErrors", () => {
  beforeEach(() => {
    // Setup DOM with multiple errors
    document.body.innerHTML = `
      <input id="email" class="error" />
      <div id="email-error" class="form-error show">Email error</div>
      
      <input id="password" class="error" />
      <div id="password-error" class="form-error show">Password error</div>
      
      <textarea id="body" class="error"></textarea>
      <div id="body-error" class="form-error show">Body error</div>
      
      <input id="normal-input" />
      <div id="normal-error" class="form-error">No error</div>
    `;
  });

  it("should clear all error messages", () => {
    clearAllErrors();

    const errorElements = document.querySelectorAll(".form-error");
    errorElements.forEach((el) => {
      expect(el.textContent).toBe("");
    });
  });

  it("should remove show class from all error elements", () => {
    clearAllErrors();

    const errorElements = document.querySelectorAll(".form-error");
    errorElements.forEach((el) => {
      expect(el.classList.contains("show")).toBe(false);
    });
  });

  it("should remove error class from all inputs", () => {
    clearAllErrors();

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((el) => {
      expect(el.classList.contains("error")).toBe(false);
    });
  });

  it("should handle mixed input and textarea elements", () => {
    clearAllErrors();

    const email = document.getElementById("email");
    const body = document.getElementById("body");

    expect(email.classList.contains("error")).toBe(false);
    expect(body.classList.contains("error")).toBe(false);
  });

  it("should not affect elements without error class", () => {
    const normalInput = document.getElementById("normal-input");
    const initialClasses = normalInput.className;

    clearAllErrors();

    expect(normalInput.className).toBe(initialClasses);
  });

  it("should work with empty DOM", () => {
    document.body.innerHTML = "";

    expect(() => {
      clearAllErrors();
    }).not.toThrow();
  });
});

describe("validateFields", () => {
  beforeEach(() => {
    // Setup DOM for validateFields tests
    document.body.innerHTML = `
      <input id="email" />
      <div id="email-error" class="form-error"></div>
      
      <input id="password" />
      <div id="password-error" class="form-error"></div>
      
      <input id="username" />
      <div id="username-error" class="form-error"></div>
    `;
  });

  it("should return true when all validations pass", () => {
    const validations = [
      {
        field: "email",
        validator: () => validateEmail("test@stud.noroff.no"),
      },
      {
        field: "password",
        validator: () => validatePassword("password123"),
      },
    ];

    const result = validateFields(validations);
    expect(result).toBe(true);
  });

  it("should return false when any validation fails", () => {
    const validations = [
      {
        field: "email",
        validator: () => validateEmail("test@stud.noroff.no"),
      },
      {
        field: "password",
        validator: () => validatePassword("123"), // Too short
      },
    ];

    const result = validateFields(validations);
    expect(result).toBe(false);
  });

  it("should return false when all validations fail", () => {
    const validations = [
      {
        field: "email",
        validator: () => validateEmail(""), // Empty
      },
      {
        field: "password",
        validator: () => validatePassword(""), // Empty
      },
    ];

    const result = validateFields(validations);
    expect(result).toBe(false);
  });

  it("should display error messages for failed validations", () => {
    const validations = [
      {
        field: "email",
        validator: () => validateEmail("invalid"),
      },
    ];

    validateFields(validations);

    const errorElement = document.getElementById("email-error");
    expect(errorElement.textContent).toBe(
      "Email must be a valid @stud.noroff.no address"
    );
  });

  it("should display multiple error messages for multiple failures", () => {
    const validations = [
      {
        field: "email",
        validator: () => validateEmail(""),
      },
      {
        field: "password",
        validator: () => validatePassword(""),
      },
    ];

    validateFields(validations);

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    expect(emailError.textContent).toBe("Email is required");
    expect(passwordError.textContent).toBe("Password is required");
  });

  it("should work with custom validator functions", () => {
    const validations = [
      {
        field: "username",
        validator: () => {
          const username = "test_user";
          return validateUsername(username);
        },
      },
    ];

    const result = validateFields(validations);
    expect(result).toBe(true);
  });

  it("should handle empty validations array", () => {
    const result = validateFields([]);
    expect(result).toBe(true);
  });

  it("should process all validations even if early ones fail", () => {
    let secondValidatorCalled = false;

    const validations = [
      {
        field: "email",
        validator: () => validateEmail(""), // Fails
      },
      {
        field: "password",
        validator: () => {
          secondValidatorCalled = true;
          return validatePassword("password123");
        },
      },
    ];

    validateFields(validations);
    expect(secondValidatorCalled).toBe(true);
  });
});
