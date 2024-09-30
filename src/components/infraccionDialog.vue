<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">
          {{ infraccion.nombre }} {{ infraccion.apellido }}
        </div>
        <div class="text-caption">Fecha: {{ infraccion.fechaHora }}</div>
      </q-card-section>

      <q-card-section>
        <div><strong>Domicilio:</strong> {{ infraccion.domicilio }}</div>
        <div><strong>Localidad:</strong> {{ infraccion.localidad }}</div>
        <div><strong>Código Postal:</strong> {{ infraccion.codigoPostal }}</div>
        <div>
          <strong>Licencia de Conducir:</strong>
          {{ infraccion.licenciaConducir }}
        </div>
        <div>
          <strong>Vehículo:</strong> {{ infraccion.tipoVehiculo }} -
          {{ infraccion.marcaVehiculo }}
        </div>
        <div><strong>Infracción:</strong> {{ infraccion.hechoInfraccion }}</div>
        <div>
          <strong>Observaciones:</strong> {{ infraccion.observaciones }}
        </div>
        <div>
          <strong>Estado:</strong>
          {{ infraccion.estado ? 'Terminada' : 'Pendiente' }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" @click="visible = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { Infraccion } from 'stores/transitoStore';

const visible = ref(false);
const infraccion = defineProps({
  infraccion: {
    type: Object as PropType<Infraccion>,
    required: true,
  },
});
</script>
