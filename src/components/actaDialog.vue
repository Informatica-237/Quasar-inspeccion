<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">
          {{ acta?.nombreImputado }} {{ acta?.apellidoImputado }}
        </div>
        <div class="text-caption">
          <strong>Disposición Legal:</strong> {{ acta?.disposicionLegal }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div><strong>Domicilio:</strong> {{ acta?.domicilioImputado }}</div>
        <div><strong>Hechos:</strong> {{ acta?.naturalezaHechos }}</div>
        <div>
          <strong>Testigo:</strong> {{ acta?.nombreTestigo }}
          {{ acta?.apellidoTestigo }}
        </div>
        <div>
          <strong>Estado:</strong>
          <q-chip :color="acta?.estado ? 'green' : 'red'">
            {{ acta?.estado ? 'Terminada' : 'Pendiente' }}
          </q-chip>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" @click="cerrarDialogo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { Acta } from 'stores/transitoStore';

export default {
  name: 'actaDialog',
  props: {
    acta: {
      type: Object as () => Acta,
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
