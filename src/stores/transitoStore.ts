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

  // Actions: Cargar datos
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

  // Actions: Agregar infracción
  const agregarInfraccion = async (nuevaInfraccion: Partial<Infraccion>) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/infraccion',
        nuevaInfraccion
      );
      infracciones.value.push(response.data); // Agregamos la nueva infracción al array
    } catch (error) {
      console.error('Error al agregar infracción:', error);
    }
  };

  // Actions: Editar infracción
  const editarInfraccion = async (
    id: number,
    cambiosInfraccion: Partial<Infraccion>
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/infraccion/${id}`,
        cambiosInfraccion
      );
      const index = infracciones.value.findIndex(
        (infraccion) => infraccion.id === id
      );
      if (index !== -1) {
        infracciones.value[index] = {
          ...infracciones.value[index],
          ...response.data,
        };
      }
    } catch (error: any) {
      console.error(
        'Error al editar infracción:',
        error.response?.data || error
      );
    }
  };

  // Actions: Eliminar infracción
  const eliminarInfraccion = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/infraccion/${id}`);
      infracciones.value = infracciones.value.filter(
        (infraccion) => infraccion.id !== id
      );
    } catch (error) {
      console.error('Error al eliminar infracción:', error);
    }
  };

  // Actions: Agregar acta
  const agregarActa = async (nuevaActa: Partial<Acta>) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/actas',
        nuevaActa
      );
      actas.value.push(response.data);
    } catch (error) {
      console.error('Error al agregar acta:', error);
    }
  };

  // Actions: Editar acta
  const editarActa = async (id: number, cambiosActa: Partial<Acta>) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/actas/${id}`,
        cambiosActa
      );
      const index = actas.value.findIndex((acta) => acta.id === id);
      if (index !== -1) {
        actas.value[index] = { ...actas.value[index], ...response.data };
      }
    } catch (error) {
      console.error('Error al editar acta:', error);
    }
  };

  // Actions: Eliminar acta
  const eliminarActa = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/actas/${id}`);
      actas.value = actas.value.filter((acta) => acta.id !== id);
    } catch (error) {
      console.error('Error al eliminar acta:', error);
    }
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
      const nombreImputado = acta.nombreImputado.toLowerCase();
      const busqueda = busquedaActas.value.toLowerCase();
      return nombreImputado.includes(busqueda);
    });
  });

  return {
    infracciones,
    actas,
    busquedaInfracciones,
    busquedaActas,
    cargarInfracciones,
    cargarActas,
    agregarInfraccion,
    editarInfraccion,
    eliminarInfraccion,
    agregarActa,
    editarActa,
    eliminarActa,
    infraccionesFiltradas,
    actasFiltradas,
  };
});
