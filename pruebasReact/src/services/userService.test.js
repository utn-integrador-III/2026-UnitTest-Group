import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { userService } from './userService';

describe('userService', () => {
  beforeEach(() => {
    // Spy and stub the global fetch method
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    // Restore all mocked modules and methods
    vi.restoreAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    // Mock the fetch call to return ok: true and the mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    const result = await userService.getUsers();

    // Assertions
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(result).toEqual(mockUsers);
  });

  it('should throw an error when the API request fails (response.ok is false)', async () => {
    // Mock the fetch call to return a failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    // Assertion for rejecting and throwing an error
    await expect(userService.getUsers()).rejects.toThrow('Failed to fetch users');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
