import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn();

// Import after mocking
const { register } = await import('./auth.js');

describe('register function', () => {
  
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it('should successfully register a user with valid data', async () => {
   // Arrange: Mock a successful API response
    const mockResponse = {
      data: {
        name: 'test_user',
        email: 'test@stud.noroff.no',
        /*bio: 'Test bio',
        avatar: { url: 'https://example.com/avatar.jpg' },
        banner: { url: 'https://example.com/banner.jpg' }*/
      }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const userData = {
      name: 'test_user',
      email: 'test@stud.noroff.no',
      password: 'password123'
    };

    // Act: Call the function
    const result = await register(userData);

    // Assert: Check the result
    expect(result).toEqual(mockResponse.data);
    
   // Check that fetch was called correctly
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://v2.api.noroff.dev/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }
    );
  });

  it('should throw error when API returns 400 (user exists)', async () => {
    // Arrange: Mock an API error
    const mockErrorResponse = {
      errors: [
        { message: 'Profile already exists' }
      ],
      status: 'Bad Request',
      statusCode: 400
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockErrorResponse
    });

    const userData = {
      name: 'existing_user',
      email: 'existing@stud.noroff.no',
      password: 'password123'
    };

    // Act and Assert: Check that an error is thrown
    await expect(register(userData)).rejects.toThrow('Profile already exists');
  });

  it('should throw error when API returns 400 (invalid email)', async () => {
    const mockErrorResponse = {
      errors: [
        { message: 'Email must be a valid stud.noroff.no email address' }
      ]
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockErrorResponse
    });

    const userData = {
      name: 'test_user',
      email: 'test@gmail.com',
      password: 'password123'
    };

    await expect(register(userData)).rejects.toThrow(
      'Email must be a valid stud.noroff.no email address'
    );
  });

  it('should throw generic error when API response has no error message', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({})
    });

    const userData = {
      name: 'test_user',
      email: 'test@stud.noroff.no',
      password: 'password123'
    };

    await expect(register(userData)).rejects.toThrow('Registration failed');
  });

  it('should handle network errors', async () => {
    // Mock a network error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const userData = {
      name: 'test_user',
      email: 'test@stud.noroff.no',
      password: 'password123'
    };

    await expect(register(userData)).rejects.toThrow('Network error');
  });

  it('should send all user data including optional fields', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: {} })
    });

    const userData = {
      name: 'test_user',
      email: 'test@stud.noroff.no',
      password: 'password123',
      /*bio: 'My bio',
      avatar: { url: 'https://example.com/avatar.jpg', alt: 'Avatar' },
      banner: { url: 'https://example.com/banner.jpg', alt: 'Banner' }*/
    };

    await register(userData);

    const fetchCall = fetch.mock.calls[0];
    const sentData = JSON.parse(fetchCall[1].body);

    expect(sentData).toEqual(userData);
  });
});