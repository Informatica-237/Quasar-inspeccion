<template>
  <div class="login-container">
    <div class="login-header">
      <div>Login</div>
    </div>
    <q-form @submit="login">
      <q-input
        v-model="email"
        label="Email"
        type="email"
        class="login-input"
        placeholder="Email"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        class="login-input"
        placeholder="Password (Min-8, Max-15)"
        maxlength="15"
        minlength="8"
      />
      <q-btn type="submit" label="Login" color="primary" class="login-button" />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/datos';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

function login() {
  authStore.login({ email: email.value, password: password.value });
}
</script>

<style scoped>
/* Centrar el contenedor de login */

html {
  display: flex;
  width: 100%;
  direction: ltr;
  flex-direction: row;
  justify-content: space-around;
}

.login-container {
  width: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), 0px 0px 0px 3px #3498db,
    inset 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-header {
  font-size: x-large;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.login-header div {
  color: #333;
  font-size: 24px;
}

.login-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
}

.login-button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #3498db;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1),
    inset 0px 1px 3px rgba(255, 255, 255, 0.5);
  transition: background 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}
</style>
