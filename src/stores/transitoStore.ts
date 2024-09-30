// stores/transitoStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

// Interfaces
export interface Infraccion {
  id: number;
  fechaHora: Date;
  nombre: string;
  apellido: string;
  domicilio: string;
  localidad: string;
  codigoPostal: number;
  partido: string;
  provincia: string;
  pais: string;
  licenciaConducir: string;
  clase: string;
  vencimiento: Date;
  tipoDocumento: string;
  documento: string;
  tipoVehiculo: string;
  marcaVehiculo: string;
  otraMarca: string;
  modeloVehiculo: string;
  colorVehiculo: string;
  numeroDominio: string;
  hechoInfraccion: string;
  lugarInfraccion: string;
  leyInfringida: string;
  observaciones: string;
  descripcion: string;
  testigos: string;
  pruebaDocumental: string;
  cinometro: string;
  alcoholimetro: string;
  retuvoLicencia: boolean;
  retuvoVehiculo: boolean;
  estado: boolean;
}

export interface Acta {
  id: number;
  domicilio: string;
  naturalezaHechos: string;
  disposicionLegal: string;
  nombreImputado: string;
  apellidoImputado: string;
  domicilioImputado: string;
  dniImputado: string;
  nombreTestigo: string;
  apellidoTestigo: string;
  domicilioTestigo: string;
  dniTestigo: string;
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
