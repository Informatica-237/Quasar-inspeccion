<template>
  <div class="login-container-wrapper">
    <div class="login-container">
      <q-form>
        <div class="login-header">
          <div>INGRESO</div>
        </div>
        <q-input
          v-model="name"
          label="Usuario"
          type="text"
          class="login-input"
        />
        <q-input
          v-model="password"
          label="Contraseña"
          type="password"
          class="login-input"
          placeholder="Contraseña (Min-5, Max-15)"
          maxlength="15"
          minlength="8"
        />
        <q-btn
          @click.prevent="login"
          label="Siguiente"
          color="primary"
          class="login-button"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/datos';
import { useQuasar } from 'quasar';

const name = ref('');
const password = ref('');
const authStore = useAuthStore();
const $q = useQuasar();

async function login() {
  try {
    await authStore.login({ name: name.value, password: password.value });
    $q.notify({
      type: 'positive',
      message: 'Sesión iniciada correctamente.',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error desconocido. Inténtalo de nuevo.',
    });
  }
}
</script>

<style scoped>
.login-container-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  width: 30%;
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
  background: #063d62;
  transform: translateY(-2px);
}
</style>
