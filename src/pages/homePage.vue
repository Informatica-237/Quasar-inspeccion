<template>
  <q-card class="q-pa-md q-mx-auto" style="max-width: 1500px">
    <q-card-section>
      <div class="text-h6 text-bold">Gestión de Tránsito</div>
    </q-card-section>

    <q-tabs v-model="tab" class="q-mb-md" dense>
      <q-tab name="infracciones" label="Infracciones" />
      <q-tab name="actas" label="Actas" />
    </q-tabs>

    <div v-if="tab === 'infracciones'">
      <div class="q-gutter-sm row justify-between q-mb-md">
        <q-input
          v-model="transitoStore.busquedaInfracciones"
          placeholder="Buscar infracción..."
          class="col-grow"
          dense
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Nueva Infracción" color="primary" icon="add" />
      </div>
      <!-- Agregamos la clase q-mt-md para margen superior -->
      <div class="q-gutter-md q-mt-md">
        <q-card
          v-for="infraccion in transitoStore.infraccionesFiltradas"
          :key="infraccion.id"
          bordered
          class="q-mb-md"
          clickable
          @click="abrirInfraccionModal(infraccion)"
        >
          <q-card-section>
            <div class="text-h6">{{ infraccion.fechaHora }}</div>
            <div>{{ infraccion.nombre }}</div>
            <div>{{ infraccion.localidad }}</div>
            <q-item-label caption>{{
              infraccion.licenciaConducir
            }}</q-item-label>
            <q-badge
              floating
              align="top"
              :color="infraccion.estado ? 'green' : 'orange'"
              :label="infraccion.estado ? 'Terminada' : 'Pendiente'"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              icon="delete"
              color="primary"
              label="Eliminar"
              flat
              @click="transitoStore.eliminarInfraccion(infraccion.id)"
            />
            <q-btn
              icon="edit"
              color="secondary"
              label="Editar"
              flat
              @click="transitoStore.eliminarInfraccion(infraccion.id)"
            />
          </q-card-actions>
        </q-card>
        <infraccion-modal
          v-if="infraccionSeleccionada"
          :infraccion="infraccionSeleccionada"
          v-model="infraccionModalVisible"
        />
      </div>
    </div>

    <div v-if="tab === 'actas'">
      <div class="q-gutter-sm row justify-between q-mb-md">
        <q-input
          v-model="transitoStore.busquedaActas"
          placeholder="Buscar acta..."
          class="col-grow"
          dense
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Nueva Acta" color="primary" icon="add" />
      </div>

      <div class="q-gutter-md q-mt-md">
        <q-card
          v-for="acta in transitoStore.actasFiltradas"
          :key="acta.id"
          bordered
          class="q-mb-md"
          clickable
          @click="abrirActaModal(acta)"
        >
          <q-card-section>
            <div class="text-h6">Acta {{ acta.nombreImputado }}</div>
            <div>{{ acta.disposicionLegal }}</div>
            <q-badge
              floating
              align="top"
              :color="acta.estado ? 'green' : 'orange'"
              :label="acta.estado ? 'Terminada' : 'Pendiente'"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              icon="delete"
              color="primary"
              label="Eliminar"
              flat
              @click="transitoStore.eliminarActa(acta.id)"
            />
          </q-card-actions>
        </q-card>
        <acta-modal
          v-if="actaSeleccionada"
          :acta="actaSeleccionada"
          v-model="actaModalVisible"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransitoStore } from 'stores/transitoStore';
import InfraccionDialog from '../components/infraccionDialog.vue';
import ActaDialog from '../components/actaDialog.vue';

const transitoStore = useTransitoStore();

// Control de los modales
const infraccionModalVisible = ref(false);
const infraccionSeleccionada = ref(null);
const actaModalVisible = ref(false);
const actaSeleccionada = ref(null);

function abrirInfraccionModal(infraccion: null) {
  infraccionSeleccionada.value = infraccion;
  infraccionModalVisible.value = true;
}

function abrirActaModal(acta: null) {
  actaSeleccionada.value = acta;
  actaModalVisible.value = true;
}
</script>
