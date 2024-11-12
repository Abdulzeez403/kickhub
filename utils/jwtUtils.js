// Decode base64 URL string to base64 string
const base64UrlToBase64 = (base64Url) => {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding
  const padding = base64.length % 4;
  if (padding > 0) {
    base64 += '='.repeat(4 - padding);
  }
  return base64;
};

// Decode the JWT token
export const decodeToken = (token) => {
  try {
    // Split the token into parts
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error('Invalid token format');

    const base64 = base64UrlToBase64(base64Url);
    const jsonString = atob(base64); // Decode base64 to string
    return JSON.parse(jsonString); // Parse JSON
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if the token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) throw new Error('Invalid token payload');
    
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};
