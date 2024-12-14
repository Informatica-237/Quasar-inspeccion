<template>
  <q-dialog v-model="showModal">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Subir archivo</div>

        <q-file
          v-model="archivo"
          label="Seleccionar archivo"
          filled
          outlined
          color="primary"
          accept="application/pdf, image/*, .zip"
          @added="handleFileAdded"
        >
          <template v-slot:before>
            <q-icon name="attachment" />
          </template>

          <template v-slot:append>
            <q-icon
              v-if="model !== null"
              name="close"
              @click.stop.prevent="model = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Cancelar" color="red" @click="close" flat />
        <q-btn label="Subir" color="primary" @click="subirArchivo" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useTransitoStore } from 'stores/transitoStore'; // Importar el store

// Propiedades recibidas
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  infraccion: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// Datos locales para manejar el archivo
const archivo = ref(null);

// Computed para el estado del modal
const showModal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    showModal.value = newValue;
  }
);

const transitoStore = useTransitoStore();

// Método para cerrar el modal
function close() {
  emit('update:modelValue', false); // Cerrar modal
}

// Método para manejar el archivo agregado
function handleFileAdded() {
  // Validación u otras acciones si es necesario
}

// Método para subir el archivo
async function subirArchivo() {
  if (archivo.value) {
    try {
      // Usamos el ID de la infracción desde las props
      const idInfraccion = props.infraccion.id;

      // Llamamos a la función del store para subir el archivo
      await transitoStore.subirArchivo(idInfraccion, archivo.value);
      close(); // Cerramos el modal después de subir el archivo
    } catch (error) {
      console.error('Error al subir el archivo', error);
    }
  } else {
    console.log('No se ha seleccionado un archivo.');
  }
}
</script>

<style scoped>
.q-file {
  max-width: 100%;
}
</style>
