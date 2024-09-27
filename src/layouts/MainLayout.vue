<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header" >
      <div class="q-pa-md q-gutter-sm"  >
        <q-breadcrumbs align="center" active-color="white" style="font-size: 20px; color: white;">
          <q-breadcrumbs-el
            label="INFRACCION"
            icon="car_crash"
            :to="{ path: '/infraccion' }"
            :class="{ 'active-breadcrumb': route.path === '/infraccion' }"
          />
          <q-breadcrumbs-el
            label="ACTA DE INFRACCION"
            icon="post_add"
            :to="{ path: '/acta' }"
            :class="{ 'active-breadcrumb': route.path === '/acta' }"
          />
        </q-breadcrumbs>
      </div>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute(); // Obtener la ruta actual
</script>

<style scoped>
.active-breadcrumb {
  font-weight: bold;
  color: #000000; /* Cambia el color del texto activo a negro */
  /* Eliminamos la sombra */
}

.custom-header {
  background-color: rgb(110, 185, 255); /* Cambia a cualquier color que desees */
}
</style>
