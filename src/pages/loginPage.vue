<template>
  <div class="login-container-wrapper">
    <div class="login-container">
      <q-form @submit.prevent="login" @validation-failed="onValidationFailed">
        <div class="login-header">
          <div>INGRESO</div>
        </div>
        <q-input
          v-model="name"
          label="Usuario"
          type="text"
          class="login-input"
          :rules="[(val) => !!val || 'El nombre de usuario es obligatorio.']"
          aria-label="Nombre de usuario"
        />
        <q-input
          v-model="password"
          label="Contraseña"
          type="password"
          class="login-input"
          placeholder="Contraseña (Min-5, Max-10)"
          :rules="[
            (val) =>
              (val && val.length >= 5 && val.length <= 10) ||
              'La contraseña debe tener entre 5 y 10 caracteres.',
          ]"
          aria-label="Contraseña"
        />
        <q-btn
          :loading="isSubmitting"
          :disable="isSubmitting"
          label="Siguiente"
          color="primary"
          class="login-button"
          type="submit"
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
const isSubmitting = ref(false);
const authStore = useAuthStore();
const $q = useQuasar();

async function login() {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  try {
    await authStore.login({ name: name.value, password: password.value });
    $q.notify({
      type: 'positive',
      message: 'Sesión iniciada correctamente.',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message:
        error.response?.data?.message ||
        'Error desconocido. Inténtalo de nuevo.',
    });
  } finally {
    isSubmitting.value = false;
  }
}

function onValidationFailed(errors) {
  console.log(errors);
  $q.notify({
    type: 'negative',
    message: 'Por favor, corrige los errores antes de continuar.',
  });
}
</script>

<style scoped>
.login-container-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
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
  margin-bottom: 15px;
}

.login-button {
  width: 100%;
  padding: 10px;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .login-container {
    width: 90%;
  }
}
</style>
