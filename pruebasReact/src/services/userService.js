/**
 * Service to handle user-related API requests.
 */
export const userService = {
  /**
   * Fetches the list of users from the placeholder API.
   * @returns {Promise<Array>} A promise that resolves to the list of users.
   */
  async getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return response.json();
  }
};
