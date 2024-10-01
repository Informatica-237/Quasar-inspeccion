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
        <q-btn flat label="Cerrar" @click="cerrarDialogo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { Infraccion } from 'stores/transitoStore';

export default {
  name: 'infraccionDialog',
  props: {
    infraccion: {
      type: Object as () => Infraccion,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    // Sincronizar el prop `modelValue` con la visibilidad del diálogo
    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue;
      }
    );

    // Función para cerrar el diálogo y emitir el evento
    const cerrarDialogo = () => {
      visible.value = false;
      emit('update:modelValue', false); // Emitir evento para cerrar el modal en el componente padre
    };

    return {
      visible,
      cerrarDialogo,
    };
  },
};
</script>
