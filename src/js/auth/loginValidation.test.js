import { describe, it, expect } from "@jest/globals";
import { validateEmail, validatePassword } from "../utils/validation.js";

describe("validateEmail (login form)", () => {
  it("should return valid: true for correct email", () => {
    const result = validateEmail("john.doe@stud.noroff.no");

    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: false for empty email", () => {
    const result = validateEmail("");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Email is required");
  });

  it("should return valid: false for gmail address", () => {
    const result = validateEmail("john@gmail.com");

    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Email must be a valid @stud.noroff.no address",
    );
  });

  it("should return valid: false for email without @", () => {
    const result = validateEmail("johndoe.stud.noroff.no");

    expect(result.valid).toBe(false);
  });

  it("should return valid: false for email without domain", () => {
    const result = validateEmail("john@");

    expect(result.valid).toBe(false);
  });
});

describe("validatePassword (login form)", () => {
  it("should return valid: true for password with 8+ characters", () => {
    const result = validatePassword("password123");

    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return valid: false for empty password", () => {
    const result = validatePassword("");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password is required");
  });

  it("should return valid: false for password shorter than 8 characters", () => {
    const result = validatePassword("abc123");

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Password must be at least 8 characters");
  });

  it("should return valid: true for exactly 8 characters", () => {
    const result = validatePassword("12345678");

    expect(result.valid).toBe(true);
  });

  it("should accept very long passwords", () => {
    const result = validatePassword("a".repeat(100));
    expect(result.valid).toBe(true);
  });
});
