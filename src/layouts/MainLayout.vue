<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs align="center" active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="INFRACCION" icon="car_crash" to="/infraccion"/>
          <q-breadcrumbs-el label="ACTA DE INFRACCION" icon="post_add" to="/acta"/>
        </q-breadcrumbs>
      </div>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});
</script>
