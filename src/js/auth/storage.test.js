import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  saveAuth,
  saveApiKey,
  getToken,
  getApiKey,
  getCurrentUserData,
  isAuthenticated,
  clearAuth,
  hasApiKey
} from './storage.js';

describe('storage.js - localStorage management', () => {
  
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveAuth', () => {
    it('should save user data to localStorage', () => {
      const userData = {
        accessToken: 'test-token-123',
        name: 'test_user',
        email: 'test@stud.noroff.no',
        avatar: { url: 'https://example.com/avatar.jpg' },
      };

      saveAuth(userData);

      expect(localStorage.getItem('accessToken')).toBe('test-token-123');
      expect(localStorage.getItem('userName')).toBe('test_user');
      expect(localStorage.getItem('userEmail')).toBe('test@stud.noroff.no');
      expect(localStorage.getItem('userAvatar')).toBe('https://example.com/avatar.jpg');
    });

    it('should handle missing optional fields', () => {
      const userData = {
        accessToken: 'test-token',
        name: 'test_user',
        email: 'test@stud.noroff.no'
      };

      saveAuth(userData);

      expect(localStorage.getItem('accessToken')).toBe('test-token');
      expect(localStorage.getItem('userName')).toBe('test_user');
      expect(localStorage.getItem('userAvatar')).toBeNull();
    });
  });

  describe('saveApiKey', () => {
    it('should save API key to localStorage', () => {
      saveApiKey('my-api-key-123');
      
      expect(localStorage.getItem('apiKey')).toBe('my-api-key-123');
    });
  });

  describe('getToken', () => {
    it('should return access token from localStorage', () => {
      localStorage.setItem('accessToken', 'stored-token');
      
      expect(getToken()).toBe('stored-token');
    });

    it('should return null if no token exists', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('getApiKey', () => {
    it('should return API key from localStorage', () => {
      localStorage.setItem('apiKey', 'stored-api-key');
      
      expect(getApiKey()).toBe('stored-api-key');
    });

    it('should return null if no API key exists', () => {
      expect(getApiKey()).toBeNull();
    });
  });

  describe('getCurrentUserData', () => {
    it('should return user data object when token exists', () => {
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('userName', 'john_doe');
      localStorage.setItem('userEmail', 'john@stud.noroff.no');
      localStorage.setItem('userAvatar', 'https://example.com/avatar.jpg');

      const userData = getCurrentUserData();

      expect(userData).toEqual({
        name: 'john_doe',
        email: 'john@stud.noroff.no',
        avatar: 'https://example.com/avatar.jpg',
      });
    });

    it('should return null if no token exists', () => {
      expect(getCurrentUserData()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when access token exists', () => {
      localStorage.setItem('accessToken', 'some-token');
      
      expect(isAuthenticated()).toBe(true);
    });

    it('should return false when no access token exists', () => {
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('clearAuth', () => {
    it('should remove all auth data from localStorage', () => {
      // Arrange: Fill localStorage
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('apiKey', 'key');
      localStorage.setItem('userName', 'user');
      localStorage.setItem('userEmail', 'email');
      localStorage.setItem('userAvatar', 'avatar');

      // Act: Clean up
      clearAuth();

      // Assert: All deleted
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('apiKey')).toBeNull();
      expect(localStorage.getItem('userName')).toBeNull();
      expect(localStorage.getItem('userEmail')).toBeNull();
      expect(localStorage.getItem('userAvatar')).toBeNull();
      expect(localStorage.getItem('userBio')).toBeNull();
    });
  });

  describe('hasApiKey', () => {
    it('should return true when API key exists', () => {
      localStorage.setItem('apiKey', 'my-key');
      
      expect(hasApiKey()).toBe(true);
    });

    it('should return false when no API key exists', () => {
      expect(hasApiKey()).toBe(false);
    });
  });
});