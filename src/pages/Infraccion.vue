<template>
  <div>



    <div class="row justify-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" v-for="infraccion in transitoStore.infraccionesFiltradas" :key="infraccion.id">
          <q-card-section>





          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransitoStore } from 'stores/transitoStore'; // Asegúrate de que esté disponible el store



defineOptions({
  name: 'infraccionPage'
});


const transitoStore = useTransitoStore();


onMounted(() => {
  // Cargar los datos cuando se monte el componente
  transitoStore.cargarInfracciones();
});

</script>
