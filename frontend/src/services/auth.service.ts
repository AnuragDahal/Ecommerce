import api from './api';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const { data } = await api.post('/api/auth/login', credentials);
    return data;
  },

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
  }) {
    const { data } = await api.post('/api/auth/signup', userData);
    return data;
  },

  async logout() {
    await api.post('/api/auth/logout');
  },

  async getProfile() {
    const { data } = await api.get('/api/user/profile');
    return data;
  },
};