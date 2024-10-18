<template>
  <q-card class="q-pa-md q-mx-auto" style="max-width: 1500px; margin-top: 10px">
    <q-tabs v-model="tab" class="q-mb-md" dense>
      <q-tab name="infracciones" label="Infracciones" />
      <q-tab name="actas" label="Actas" />
    </q-tabs>

    <div v-if="tab === 'infracciones'">
      <div class="q-gutter-sm row justify-between q-mb-md">
        <q-input v-model="transitoStore.busquedaInfracciones" label="Buscar infracción..." class="col-grow" dense
          outlined color="grey-10">
          <template v-slot:append>
            <q-icon name="search" color="grey-10" />
          </template>
        </q-input>

        <componente-modal v-model="mostrarModal" />
      </div>

      <div class="q-gutter-md q-mt-md">
        <q-card v-for="infraccion in transitoStore.infraccionesFiltradas" :key="infraccion.id" bordered class="q-mb-md"
          clickable @click="abrirInfraccionModal(infraccion)">
          <q-card-section>
            <div class="text-h6">
              Fecha y Hora: {{ formatDate(infraccion.fechaHora) }}
            </div>
            <div>{{ infraccion.nombre }}</div>
            <div>{{ infraccion.localidad }}</div>
            <q-item-label caption>{{
              infraccion.licenciaConducir
              }}</q-item-label>
            <q-badge floating align="top" :color="infraccion.estado ? 'primary' : 'orange'"
              :label="infraccion.estado ? 'Terminada' : 'Pendiente'" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn icon="delete" color="negative" label="Eliminar" flat
              @click="transitoStore.eliminarInfraccion(infraccion.id)" />
            <q-btn icon="edit" color="positive" label="Editar" flat
              @click.stop="abrirInfraccionEdicionModal(infraccion)" />
          </q-card-actions>
        </q-card>

        <infraccion-dialog v-if="infraccionModalVisible" :infraccion="infraccionSeleccionada"
          v-model="infraccionModalVisible" @close="cerrarModal" />
        <infraccion-edit-modal v-if="infraccionEditModalVisible" :infraccion="infraccionSeleccionada"
          v-model="infraccionEditModalVisible" @guardar="guardarEdicion" @close="cerrarModal" />
      </div>
    </div>

    <div v-if="tab === 'actas'">
      <div class="q-gutter-sm row justify-between q-mb-md">
        <q-input v-model="transitoStore.busquedaActas" placeholder="Buscar acta..." class="col-grow" dense outlined>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Nueva Acta" color="primary" icon="add" />
      </div>

      <div class="q-gutter-md q-mt-md">
        <q-card v-for="acta in transitoStore.actasFiltradas" :key="acta.id" bordered class="q-mb-md" clickable
          @click="abrirActaModal(acta)">
          <q-card-section>
            <div class="text-h6">Acta {{ acta.nombreImputado }}</div>
            <div>{{ acta.disposicionLegal }}</div>
            <q-badge floating align="top" :color="acta.estado ? 'green' : 'orange'"
              :label="acta.estado ? 'Terminada' : 'Pendiente'" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn icon="delete" color="red" label="Eliminar" flat @click="transitoStore.eliminarActa(acta.id)" />
          </q-card-actions>
        </q-card>
        <acta-dialog v-if="actaSeleccionada" :acta="actaSeleccionada" v-model="actaModalVisible" />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Acta, Infraccion, useTransitoStore } from 'stores/transitoStore';
import infraccionDialog from '../components/infraccionDialog.vue';
import actaDialog from '../components/actaDialog.vue';
import infraccionEditModal from '../components/InfraccionEditModal.vue';
import componenteModal from '../components/modal.vue';

const mostrarModal = ref(false);

const transitoStore = useTransitoStore();

// Control de los modales

const tab = ref('infracciones');

const infraccionModalVisible = ref(false);
const infraccionEditModalVisible = ref(false);
const infraccionSeleccionada = ref();
const actaModalVisible = ref(false);
const actaSeleccionada = ref();

function abrirInfraccionEdicionModal(infraccion: Infraccion) {
  // Cerramos el modal de visualización si está abierto
  infraccionModalVisible.value = false;
  infraccionSeleccionada.value = infraccion;
  infraccionEditModalVisible.value = true;
}

function abrirInfraccionModal(infraccion: Infraccion) {
  // Cerramos el modal de edición si está abierto
  infraccionEditModalVisible.value = false;
  infraccionSeleccionada.value = infraccion;
  infraccionModalVisible.value = true;
}

function abrirActaModal(acta: Acta) {
  actaSeleccionada.value = acta;
  actaModalVisible.value = true;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

function guardarEdicion(infraccionEditada: Infraccion) {
  if (infraccionEditada && infraccionSeleccionada.value) {
    transitoStore.editarInfraccion(
      infraccionSeleccionada.value.id,
      infraccionEditada
    );
    cerrarModal();
  }
}

function cerrarModal() {
  // Al cerrar, se limpia la selección
  infraccionSeleccionada.value = null;
  infraccionModalVisible.value = false;
  infraccionEditModalVisible.value = false;
  actaModalVisible.value = false;
}

// Cargar los datos al montar el componente
onMounted(() => {
  transitoStore.cargarInfracciones();
  transitoStore.cargarActas();
});
</script>
