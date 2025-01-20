<template>
  <q-dialog v-model="mostrar" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Archivos disponibles</div>
      </q-card-section>

      <q-card-section>
        <div v-if="archivos.length === 0">No hay archivos disponibles.</div>
        <div v-else>
          <q-list bordered>
            <q-item v-for="archivo in archivos" :key="archivo" clickable>
              <q-item-section>{{ archivo }}</q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  icon="visibility"
                  @click="seleccionarArchivo(archivo)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTransitoStore } from 'stores/transitoStore';

const props = defineProps({
  infraccion: Object,
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
const mostrar = ref(false);
const store = useTransitoStore();
const archivos = ref([]);

// Se asegura de que se actualice la propiedad `mostrar` cuando cambie el `modelValue`
watch(
  () => props.modelValue,
  (nuevoValor) => {
    mostrar.value = nuevoValor;
  }
);

watch(
  () => mostrar.value,
  (nuevoValor) => {
    if (nuevoValor) {
      cargarArchivos();
    }
  }
);

async function cargarArchivos() {
  await store.cargarArchivos(props.infraccion.id);
  archivos.value = store.archivos;
}
function seleccionarArchivo(archivo) {
  console.log('Archivo seleccionado:', archivo);
  store.verArchivo(props.infraccion.id, archivo);
}
function cerrarModal() {
  emit('update:modelValue', false);
}
</script>
