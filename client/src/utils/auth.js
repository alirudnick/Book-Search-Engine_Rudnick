// Import jwt-decode package to decode JWT tokens
import decode from 'jwt-decode';

// AuthService class that holds methods for user authentication
class AuthService {
  // Method to get the user's profile data from a JWT token
  getProfile() {
    // Retrieve JWT token from local storage and decode it using jwt-decode package
    return decode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Retrieve JWT token from local storage
    const token = this.getToken();
    // Check if the token is not null/undefined, and if the token is not expired
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if a JWT token has expired
  isTokenExpired(token) {
    try {
      // Decode the token
      const decoded = decode(token);
      // Check if the token has an expiration date, and if it has passed
      if (decoded.exp < Date.now() / 1000) {
        return true; // Token has expired
      } else {
        return false; // Token is still valid
      }
    } catch (err) {
      return false; // Error occurred decoding token, assume it is still valid
    }
  }

  // Method to retrieve JWT token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Method to save JWT token to local storage and redirect user to home page
  login(idToken) {
    localStorage.setItem('id_token', idToken); // Save token to local storage
    window.location.assign('/'); // Redirect user to home page
  }

  // Method to remove JWT token from local storage and redirect user to home page
  logout() {
    localStorage.removeItem('id_token'); // Remove token from local storage
    window.location.assign('/'); // Redirect user to home page
  }
}

// Export a new instance of the AuthService class
export default new AuthService();