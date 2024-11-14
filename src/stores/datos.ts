// src/stores/auth.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    async login(credentials: object) {
      try {
        const response = await axios.post(
          'http://localhost:3000/auth/login',
          credentials
        );
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.router.push('/dashboard'); // Redirige al usuario a la página de inicio o dashboard
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
      this.router.push('/login');
    },
  },
});
