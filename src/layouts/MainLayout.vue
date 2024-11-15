<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated reveal class="custom-header">
      <q-toolbar>
        <q-avatar>
          <q-icon name="car_crash" size="30px"></q-icon>
        </q-avatar>

        <q-toolbar-title>Sistema inspección</q-toolbar-title>

        <q-btn-dropdown color="grey-8" icon="person">
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <q-btn
                color="grey-10"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="logout"
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/datos';

// Obtener acceso al router y al store de autenticación

const authStore = useAuthStore();

function logout() {
  authStore.logout(); // Llama a la función para cerrar sesión en el store
}
</script>

<style scoped lang="scss">
.active-breadcrumb {
  font-weight: bold;
  color: #000000;
}

.custom-header {
  background-color: $grey-10;
}
</style>
