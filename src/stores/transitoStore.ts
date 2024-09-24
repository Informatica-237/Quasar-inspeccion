// stores/transitoStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

// Interfaces
interface Infraccion {
  id: number;
  fechaHora: number;
  nombre: string;
  licenciaConducir: string;
  estado: boolean;
}

interface Acta {
  id: number;
  nombreImputado: string;
  disposicionLegal: string;
  estado: boolean;
}

export const useTransitoStore = defineStore('transitoStore', () => {
  // State
  const infracciones = ref<Infraccion[]>([]);
  const actas = ref<Acta[]>([]);
  const busquedaInfracciones = ref('');
  const busquedaActas = ref('');

  // Actions
  const cargarInfracciones = async () => {
    try {
      const response = await axios.get('http://localhost:3000/infraccion');
      infracciones.value = response.data;
    } catch (error) {
      console.error('Error cargando infracciones:', error);
    }
  };

  const cargarActas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/actas');
      actas.value = response.data;
    } catch (error) {
      console.error('Error cargando actas:', error);
    }
  };

  const eliminarInfraccion = (id: number) => {
    infracciones.value = infracciones.value.filter(
      (infraccion) => infraccion.id !== id
    );
  };

  const eliminarActa = (id: number) => {
    actas.value = actas.value.filter((acta) => acta.id !== id);
  };

  // Computed
  const infraccionesFiltradas = computed(() => {
    return infracciones.value.filter((infraccion) => {
      const nombre = infraccion.nombre.toLowerCase();
      const busqueda = busquedaInfracciones.value.toLowerCase();
      return nombre.includes(busqueda);
    });
  });

  const actasFiltradas = computed(() => {
    return actas.value.filter((acta) => {
      const numeroActa = acta.nombreImputado.toLowerCase();
      const busqueda = busquedaActas.value.toLowerCase();
      return numeroActa.includes(busqueda);
    });
  });

  return {
    infracciones,
    actas,
    busquedaInfracciones,
    busquedaActas,
    cargarInfracciones,
    cargarActas,
    eliminarInfraccion,
    eliminarActa,
    infraccionesFiltradas,
    actasFiltradas,
  };
});
