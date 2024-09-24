<template>
  <q-card class="q-pa-md q-mx-auto" style="max-width: 800px">
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
      <q-list bordered class="rounded-borders">
        <q-item
          v-for="infraccion in transitoStore.infraccionesFiltradas"
          :key="infraccion.id"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ infraccion.fechaHora }}</q-item-label>
            <q-item-label>{{ infraccion.nombre }}</q-item-label>
            <q-item-label caption>{{
              infraccion.licenciaConducir
            }}</q-item-label>
            <q-badge
              floating
              align="top"
              :color="infraccion.estado ? 'green' : 'orange'"
              :label="infraccion.estado ? 'Terminada' : 'Pendiente'"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="delete"
              color="primary"
              label="Eliminar"
              flat
              @click="transitoStore.eliminarInfraccion(infraccion.id)"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="edit"
              color="secondary"
              label="Editar"
              flat
              @click="transitoStore.eliminarInfraccion(infraccion.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-if="tab === 'actas'">
      <div class="q-gutter-sm row justify-between q-mb-md">
        <q-input
          v-model="transitoStore.busquedaActas"
          placeholder="Buscar acta..."
          class="col-grow"
          dense
          outlined
          prefix="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Nueva Acta" color="primary" icon="add" />
      </div>
      <q-list bordered class="rounded-borders">
        <q-item
          v-for="acta in transitoStore.actasFiltradas"
          :key="acta.id"
          clickable
        >
          <q-item-section>
            <q-item-label>Acta {{ acta.nombreImputado }}</q-item-label>
            <q-item-label caption>{{ acta.disposicionLegal }}</q-item-label>
            <q-badge
              floating
              align="top"
              :color="acta.estado ? 'green' : 'orange'"
              :label="acta.estado ? 'Terminada' : 'Pendiente'"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              icon="delete"
              color="primary"
              label="Eliminar"
              flat
              @click="transitoStore.eliminarActa(acta.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTransitoStore } from 'stores/transitoStore';

const tab = ref('infracciones');
const transitoStore = useTransitoStore();

// Cargar los datos al montar el componente
onMounted(() => {
  transitoStore.cargarInfracciones();
  transitoStore.cargarActas();
});
</script>
