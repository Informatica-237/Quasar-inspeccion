<template>
  <div class="form-container">
    <form @submit.prevent="login" class="form-signin">
      <img class="logo" src="@/assets/Logo_OFICIAL.png" alt="" width="62" height="57">
      <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" v-model="email" placeholder="Correo electrónico" required>
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" v-model="password" placeholder="Contraseña" required>
        <label for="floatingPassword">Contraseña</label>
      </div>
      <button class="btn btn-primary py-2" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useUser from '../composables/useUser';

export default {
  setup() {
    const { login } = useUser();
    const email = ref('');
    const password = ref('');

    const loginUser = async () => {
      await login(email.value, password.value);
    };

    return { email, password, login: loginUser };
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.form-signin {
  border: solid 1px #2370c8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  padding: 2rem;
  text-align: center;
}

.logo {
  margin-bottom: 1.5rem;
}

.form-floating {
  margin-bottom: 1rem;
}

.form-signin input[type="email"],
.form-signin input[type="password"] {
  width: 100%;
  
  border: 1px solid #ccc;
  border-radius: 5px;

}

.form-signin button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2370c8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-signin button:hover {
  background-color: #195190;
}
</style>
