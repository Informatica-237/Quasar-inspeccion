// src/stores/auth.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '', // Inicializa el token desde localStorage si existe
    email: '', // Puedes agregar el email si quieres manejarlo en el estado
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await axios.post(
          'http://localhost:3000/auth/login',
          credentials
        );

        // Guarda el token y el email desde la respuesta
        this.token = response.data.access_token;
        this.email = response.data.email;

        // Almacena el token en localStorage
        localStorage.setItem('token', this.token);

        // Redirige al usuario a la página de inicio o dashboard
        this.router.push('/home');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token'); // Remueve el token de localStorage
      this.router.push('/'); // Redirige al usuario al login
    },
  },
});
