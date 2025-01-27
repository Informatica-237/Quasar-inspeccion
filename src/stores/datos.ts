// src/stores/auth.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('username') || '',
    rol: localStorage.getItem('rol') || '',
  }),
  actions: {
    async login(credentials: { name: string; password: string }) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/login`,
          credentials
        );

        // Guarda el token y el email desde la respuesta
        this.token = response.data.access_token;
        this.user = response.data.username;
        this.rol = response.data.rol;
        // this.rol = response.data.rol;

        // Almacena el token en localStorage
        localStorage.setItem('token', this.token);
        localStorage.setItem('rol', this.rol);
        localStorage.setItem('username', this.user);

        // Redirige al usuario a la página de inicio o dashboard
        this.router.push('/home');
      } catch (error) {
        // Lanza el error para que pueda ser capturado en el componente
        throw new Error('Usuario o contraseña incorrectos');
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('username');
      this.router.push('/');
    },
  },
});
export const API_BASE_URL = 'http://179.43.127.133:3002';
