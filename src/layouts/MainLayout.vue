<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated reveal class="custom-header">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>Sistema inspeccion</q-toolbar-title>

        <!-- <q-btn flat round dense icon="whatshot" /> -->
        <q-btn-dropdown color="primary" icon="person">
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <!-- <q-toggle v-model="mobileData" label="Use Mobile Data" />
              <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <!-- <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user }}</div> -->

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
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
// import { useRoute } from 'vue-router';

// const route = useRoute(); // Obtener la ruta actual
</script>

<style scoped>
.active-breadcrumb {
  font-weight: bold;
  color: #000000; /* Cambia el color del texto activo a negro */
  /* Eliminamos la sombra */
}

.custom-header {
  background-color: #9d9d9e; /* Cambia a cualquier color que desees */
}
</style>
