<template>
  <div class="q-pa-md">
    <q-form @submit="login">
      <q-input v-model="email" label="Email" type="email" />
      <q-input v-model="password" label="Password" type="password" />
      <q-btn type="submit" label="Login" color="primary" />
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
