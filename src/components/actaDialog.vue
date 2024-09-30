<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">
          {{ acta?.nombreImputado }} {{ acta?.apellidoImputado }}
        </div>
        <div class="text-caption">
          Disposición Legal: {{ acta?.disposicionLegal }}
        </div>
      </q-card-section>

      <q-card-section>
        <div><strong>Domicilio:</strong> {{ acta?.domicilioImputado }}</div>
        <div><strong>Hechos:</strong> {{ acta?.naturalezaHechos }}</div>
        <div>
          <strong>Testigo:</strong> {{ acta?.nombreTestigo }}
          {{ acta?.apellidoTestigo }}
        </div>
        <div>
          <strong>Estado:</strong>
          {{ acta?.estado ? 'Terminada' : 'Pendiente' }}
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
import { Acta } from 'stores/transitoStore';

const visible = ref(false);

// Definir el prop correctamente usando PropType
const props = defineProps({
  acta: {
    type: Object as PropType<Acta>,
    required: true,
  },
});
</script>
