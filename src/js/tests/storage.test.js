import { describe, it, expect, beforeEach } from "@jest/globals";
import {
  saveAuth,
  saveApiKey,
  getToken,
  getApiKey,
  getCurrentUserData,
  isAuthenticated,
  clearAuth,
  hasApiKey,
  logout,
} from "../auth/storage.js";

describe("storage.js - localStorage management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // saveAuth Tests

  describe("saveAuth()", () => {
    it("should save complete user data to localStorage", () => {
      const userData = {
        accessToken: "test-token-123",
        name: "test_user",
        email: "test@stud.noroff.no",
        avatar: { url: "https://example.com/avatar.jpg" },
      };

      saveAuth(userData);

      expect(localStorage.getItem("accessToken")).toBe("test-token-123");
      expect(localStorage.getItem("userName")).toBe("test_user");
      expect(localStorage.getItem("userEmail")).toBe("test@stud.noroff.no");
      expect(localStorage.getItem("userAvatar")).toBe(
        "https://example.com/avatar.jpg",
      );
    });

    it("should handle missing optional fields", () => {
      const userData = {
        accessToken: "test-token",
        name: "test_user",
        email: "test@stud.noroff.no",
      };

      saveAuth(userData);

      expect(localStorage.getItem("accessToken")).toBe("test-token");
      expect(localStorage.getItem("userName")).toBe("test_user");
      expect(localStorage.getItem("userAvatar")).toBeNull();
    });

    it("should handle empty avatar object", () => {
      const userData = {
        accessToken: "token",
        name: "user",
        email: "test@stud.noroff.no",
        avatar: {}, // Empty avatar object
      };

      saveAuth(userData);

      expect(localStorage.getItem("userAvatar")).toBeNull();
    });

    it("should handle avatar object without url property", () => {
      const userData = {
        accessToken: "token",
        name: "user",
        email: "test@stud.noroff.no",
        avatar: { alt: "Profile picture" }, // No url property
      };

      saveAuth(userData);

      expect(localStorage.getItem("userAvatar")).toBeNull();
    });

    it("should save only token if other fields are missing", () => {
      const userData = {
        accessToken: "only-token",
      };

      saveAuth(userData);

      expect(localStorage.getItem("accessToken")).toBe("only-token");
      expect(localStorage.getItem("userName")).toBeNull();
      expect(localStorage.getItem("userEmail")).toBeNull();
    });

    it("should not save if accessToken is missing", () => {
      const userData = {
        name: "test_user",
        email: "test@stud.noroff.no",
      };

      saveAuth(userData);

      expect(localStorage.getItem("accessToken")).toBeNull();
      expect(localStorage.getItem("userName")).toBe("test_user");
      expect(localStorage.getItem("userEmail")).toBe("test@stud.noroff.no");
    });

    it("should not clear existing data when called with partial data", () => {
      // First save complete data
      localStorage.setItem("accessToken", "existing-token");
      localStorage.setItem("userName", "existing_user");
      localStorage.setItem("userEmail", "existing@stud.noroff.no");

      // Save only token
      saveAuth({ accessToken: "new-token" });

      expect(localStorage.getItem("accessToken")).toBe("new-token");
      // Old data should remain
      expect(localStorage.getItem("userName")).toBe("existing_user");
      expect(localStorage.getItem("userEmail")).toBe("existing@stud.noroff.no");
    });

    it("should handle empty object gracefully", () => {
      expect(() => {
        saveAuth({});
      }).not.toThrow();

      expect(localStorage.getItem("accessToken")).toBeNull();
    });
  });

  //saveApiKey Tests

  describe("saveApiKey()", () => {
    it("should save API key to localStorage", () => {
      saveApiKey("my-api-key-123");

      expect(localStorage.getItem("apiKey")).toBe("my-api-key-123");
    });

    it("should overwrite existing API key", () => {
      saveApiKey("old-key");
      saveApiKey("new-key");

      expect(localStorage.getItem("apiKey")).toBe("new-key");
    });

    it("should save empty string as API key", () => {
      saveApiKey("");

      expect(localStorage.getItem("apiKey")).toBe("");
    });
  });

  // getToken Tests

  describe("getToken()", () => {
    it("should return access token from localStorage", () => {
      localStorage.setItem("accessToken", "stored-token");

      expect(getToken()).toBe("stored-token");
    });

    it("should return null if no token exists", () => {
      expect(getToken()).toBeNull();
    });

    it("should return empty string if token is empty", () => {
      localStorage.setItem("accessToken", "");

      expect(getToken()).toBe("");
    });
  });

  // getApiKey Tests

  describe("getApiKey()", () => {
    it("should return API key from localStorage", () => {
      localStorage.setItem("apiKey", "stored-api-key");

      expect(getApiKey()).toBe("stored-api-key");
    });

    it("should return null if no API key exists", () => {
      expect(getApiKey()).toBeNull();
    });
  });

  // getCurrentUserData Tests

  describe("getCurrentUserData()", () => {
    it("should return user data object when token exists", () => {
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("userName", "john_doe");
      localStorage.setItem("userEmail", "john@stud.noroff.no");
      localStorage.setItem("userAvatar", "https://example.com/avatar.jpg");

      const userData = getCurrentUserData();

      expect(userData).toEqual({
        name: "john_doe",
        email: "john@stud.noroff.no",
        avatar: "https://example.com/avatar.jpg",
      });
    });

    it("should return null if no token exists", () => {
      localStorage.setItem("userName", "john_doe");
      localStorage.setItem("userEmail", "john@stud.noroff.no");

      expect(getCurrentUserData()).toBeNull();
    });

    it("should return user data with null fields when only token exists", () => {
      localStorage.setItem("accessToken", "token");

      const userData = getCurrentUserData();

      expect(userData).toEqual({
        name: null,
        email: null,
        avatar: null,
      });
    });

    it("should return partial user data when some fields are missing", () => {
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("userName", "john_doe");
      // Email and avatar missing

      const userData = getCurrentUserData();

      expect(userData).toEqual({
        name: "john_doe",
        email: null,
        avatar: null,
      });
    });
  });

  // isAuthenticated Tests

  describe("isAuthenticated()", () => {
    it("should return true when access token exists", () => {
      localStorage.setItem("accessToken", "some-token");

      expect(isAuthenticated()).toBe(true);
    });

    it("should return false when no access token exists", () => {
      expect(isAuthenticated()).toBe(false);
    });

    it("should return false when access token is empty string", () => {
      localStorage.setItem("accessToken", "");

      expect(isAuthenticated()).toBe(false);
    });

    it("should return true even if other auth data is missing", () => {
      localStorage.setItem("accessToken", "token");
      // No userName, userEmail, etc.

      expect(isAuthenticated()).toBe(true);
    });
  });

  // hasApiKey Tests

  describe("hasApiKey()", () => {
    it("should return true when API key exists", () => {
      localStorage.setItem("apiKey", "my-key");

      expect(hasApiKey()).toBe(true);
    });

    it("should return false when no API key exists", () => {
      expect(hasApiKey()).toBe(false);
    });

    it("should return false when API key is empty string", () => {
      localStorage.setItem("apiKey", "");

      expect(hasApiKey()).toBe(false);
    });
  });

  // clearAuth Tests

  describe("clearAuth()", () => {
    it("should remove all auth data from localStorage", () => {
      // Arrange: Fill localStorage
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("apiKey", "key");
      localStorage.setItem("userName", "user");
      localStorage.setItem("userEmail", "email");
      localStorage.setItem("userAvatar", "avatar");
      localStorage.setItem("userBio", "bio");

      // Act: Clear
      clearAuth();

      // Assert: All removed
      expect(localStorage.getItem("accessToken")).toBeNull();
      expect(localStorage.getItem("apiKey")).toBeNull();
      expect(localStorage.getItem("userName")).toBeNull();
      expect(localStorage.getItem("userEmail")).toBeNull();
      expect(localStorage.getItem("userAvatar")).toBeNull();
      expect(localStorage.getItem("userBio")).toBeNull();
    });

    it("should not throw error when localStorage is already empty", () => {
      expect(() => {
        clearAuth();
      }).not.toThrow();
    });

    it("should not affect other localStorage items", () => {
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("otherItem", "should-remain");

      clearAuth();

      expect(localStorage.getItem("accessToken")).toBeNull();
      expect(localStorage.getItem("otherItem")).toBe("should-remain");
    });
  });

  // logout Tests

  describe("logout()", () => {
    it("should clear all auth data", () => {
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("apiKey", "key");
      localStorage.setItem("userName", "user");

      logout();

      expect(localStorage.getItem("accessToken")).toBeNull();
      expect(localStorage.getItem("apiKey")).toBeNull();
      expect(localStorage.getItem("userName")).toBeNull();
    });

    it("should make isAuthenticated return false", () => {
      localStorage.setItem("accessToken", "token");
      expect(isAuthenticated()).toBe(true);

      logout();

      expect(isAuthenticated()).toBe(false);
    });

    it("should make getCurrentUserData return null", () => {
      localStorage.setItem("accessToken", "token");
      localStorage.setItem("userName", "user");

      logout();

      expect(getCurrentUserData()).toBeNull();
    });

    it("should not throw error when already logged out", () => {
      expect(() => {
        logout();
      }).not.toThrow();
    });
  });

  // Integration Tests

  describe("Integration: Save and Retrieve Flow", () => {
    it("should save and retrieve complete auth flow", () => {
      // Save auth data
      const userData = {
        accessToken: "integration-token",
        name: "integration_user",
        email: "integration@stud.noroff.no",
        avatar: { url: "https://example.com/integration.jpg" },
      };

      saveAuth(userData);
      saveApiKey("integration-api-key");

      // Verify retrieval
      expect(getToken()).toBe("integration-token");
      expect(getApiKey()).toBe("integration-api-key");
      expect(isAuthenticated()).toBe(true);
      expect(hasApiKey()).toBe(true);

      const currentUser = getCurrentUserData();
      expect(currentUser.name).toBe("integration_user");
      expect(currentUser.email).toBe("integration@stud.noroff.no");
      expect(currentUser.avatar).toBe("https://example.com/integration.jpg");

      // Clear and verify
      clearAuth();
      expect(isAuthenticated()).toBe(false);
      expect(hasApiKey()).toBe(false);
      expect(getCurrentUserData()).toBeNull();
    });

    it("should handle multiple save operations", () => {
      saveAuth({ accessToken: "token1", name: "user1" });
      saveAuth({ accessToken: "token2", email: "user2@stud.noroff.no" });

      expect(getToken()).toBe("token2");
      expect(getCurrentUserData().name).toBe("user1"); // Should persist
      expect(getCurrentUserData().email).toBe("user2@stud.noroff.no");
    });
  });
});
