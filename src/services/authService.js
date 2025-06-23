import axios from 'axios';

const API_URL = 'http://your-backend-api.com/auth';

export const login = async (credentials) => {
  // In a real app, you would call your backend API
  // const response = await axios.post(`${API_URL}/login`, credentials);
  
  // Mock response for demo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { 
          id: '1', 
          name: 'Demo User', 
          email: credentials.email,
          role: 'admin'
        },
        token: 'mock-token-123',
      });
    }, 1000);
  });
};