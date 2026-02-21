import { describe, it, expect } from "@jest/globals";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "./validation.js";

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
      "Email must be a valid @stud.noroff.no address",
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
      "Username can only contain letters, numbers, and underscores",
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
