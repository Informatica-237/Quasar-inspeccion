// stores/transitoStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { Acta, Infraccion } from 'src/components/models';

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
      const infraccionesData = response.data;

      // Realizar una solicitud adicional por cada infracción para contar las ocurrencias por DNI
      const promises = infraccionesData.map(async (infraccion: Infraccion) => {
        try {
          const countResponse = await axios.get(
            `http://localhost:3000/infraccion/count/${infraccion.documento}`
          );
          // Agregar el conteo al objeto infracción
          return {
            ...infraccion,
            count: countResponse.data.count,
          };
        } catch (error) {
          console.error(
            `Error al contar infracciones para el DNI ${infraccion.documento}:`,
            error
          );
          return { ...infraccion, count: 0 }; // Si falla, asignar 0
        }
      });

      // Esperar todas las promesas y actualizar el estado
      infracciones.value = await Promise.all(promises);
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
    } catch (error) {
      console.error('Error al editar infracción:');
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
      const busqueda = busquedaInfracciones.value.toLowerCase();

      // Aseguramos que los campos sean cadenas
      const nombre = (infraccion.nombre || '').toLowerCase();
      const apellido = (infraccion.apellido || '').toLowerCase();
      const domicilio = (infraccion.domicilio || '').toLowerCase();
      const localidad = (infraccion.localidad || '').toLowerCase();

      return (
        nombre.includes(busqueda) ||
        apellido.includes(busqueda) ||
        domicilio.includes(busqueda) ||
        localidad.includes(busqueda)
      );
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
