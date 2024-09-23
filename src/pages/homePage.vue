<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Gestión de Infracciones y Actas</div>
      </q-card-section>

      <q-tabs v-model="tab" dense>
        <q-tab name="infracciones" label="Infracciones" />
        <q-tab name="actas" label="Actas" />
      </q-tabs>

      <div v-if="tab === 'infracciones'">
        <q-input v-model="busquedaInfracciones" placeholder="Buscar infracción..." />
        <div v-for="infraccion in infraccionesFiltradas" :key="infraccion.id">
          <q-item>
            <q-item-section>
              <q-item-label>{{ infraccion.tipo }} - {{ infraccion.conductor }}</q-item-label>
              <q-item-label caption>{{ infraccion.fecha }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn color="primary" @click="eliminarInfraccion(infraccion.id)">Eliminar</q-btn>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div v-if="tab === 'actas'">
        <q-input v-model="busquedaActas" placeholder="Buscar acta..." />
        <div v-for="acta in actasFiltradas" :key="acta.id">
          <q-item>
            <q-item-section>
              <q-item-label>Acta {{ acta.numeroActa }} - {{ acta.infractor }}</q-item-label>
              <q-item-label caption>{{ acta.fecha }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn color="primary" @click="eliminarActa(acta.id)">Eliminar</q-btn>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Infraccion {
  id: number
  tipo: string
  conductor: string
  fecha: string
}

interface Acta {
  id: number
  numeroActa: string
  infractor: string
  fecha: string
}

const tab = ref('infracciones')
const infracciones = ref<Infraccion[]>([])
const actas = ref<Acta[]>([])
const busquedaInfracciones = ref('')
const busquedaActas = ref('')

// Cargar infracciones desde la API
const cargarInfracciones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/infraccion')
    infracciones.value = response.data
  } catch (error) {
    console.error('Error cargando infracciones:', error)
  }
}

// Cargar actas desde la API
const cargarActas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/actas')
    actas.value = response.data
  } catch (error) {
    console.error('Error cargando actas:', error)
  }
}

// Eliminar infracción
const eliminarInfraccion = (id: number) => {
  infracciones.value = infracciones.value.filter(infraccion => infraccion.id !== id)
}

// Eliminar acta
const eliminarActa = (id: number) => {
  actas.value = actas.value.filter(acta => acta.id !== id)
}

// Filtros de búsqueda
const infraccionesFiltradas = computed(() => {
  return infracciones.value.filter(infraccion =>
    infraccion.tipo.toLowerCase().includes(busquedaInfracciones.value.toLowerCase()) ||
    infraccion.conductor.toLowerCase().includes(busquedaInfracciones.value.toLowerCase())
  )
})

const actasFiltradas = computed(() => {
  return actas.value.filter(acta =>
    acta.numeroActa.toLowerCase().includes(busquedaActas.value.toLowerCase()) ||
    acta.infractor.toLowerCase().includes(busquedaActas.value.toLowerCase())
  )
})

// Cargar los datos al montar el componente
onMounted(() => {
  cargarInfracciones()
  cargarActas()
})
</script>
