import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
// Default JSON instance
const jsonInstance = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});


// For cookie-based authentication, we don't need to manually add
// authentication headers as cookies are automatically sent with requests
// when withCredentials is set to true

// Auth instance with CSRF protection for cookie-based auth
const authInstance = axios.create({
    baseURL,
    timeout: 10000, // Slightly longer timeout for auth operations
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for cookies to be sent with requests
});

// Helper function to get CSRF token from cookies (if your backend uses CSRF protection)


// File upload instance with cookie auth
const fileInstance = axios.create({
    baseURL,
    timeout: 30000, // Longer timeout for file uploads
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
     
    },
    withCredentials: true, // Important for cookie-based auth
});

// For cookie-based authentication, no need to add auth headers

export {
    jsonInstance,
    authInstance,
    fileInstance
};