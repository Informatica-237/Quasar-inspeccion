<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 1000px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">
          Detalles de la Infracción - {{ infraccion.id }}
        </div>
        <div class="text-caption">
          Fecha y Hora: {{ formatDate(infraccion.fechaHora) }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-scroll-area style="height: 400px">
          <div class="q-mb-md">
            <q-icon name="person" class="q-mr-sm" size="25px" />
            <strong>Datos del Infractor</strong>
            <q-separator color="black" inset />
            <div>
              <strong>Nombre:</strong> {{ infraccion.nombre }}
              {{ infraccion.apellido }}
            </div>
            <div><strong>Domicilio:</strong> {{ infraccion.domicilio }}</div>
            <div><strong>Localidad:</strong> {{ infraccion.localidad }}</div>
            <div>
              <strong>Código Postal:</strong> {{ infraccion.codigoPostal }}
            </div>
            <div><strong>Partido:</strong> {{ infraccion.partido }}</div>
            <div><strong>Provincia:</strong> {{ infraccion.provincia }}</div>
            <div><strong>País:</strong> {{ infraccion.pais }}</div>
            <div>
              <strong>Documento:</strong> {{ infraccion.tipoDocumento }}
              {{ infraccion.documento }}
            </div>
          </div>

          <div class="q-mb-md">
            <q-icon name="directions_car" class="q-mr-sm" size="25px" />
            <strong>Datos del Vehículo</strong>
            <q-separator color="black" inset />
            <div><strong>Tipo:</strong> {{ infraccion.tipoVehiculo }}</div>
            <div><strong>Marca:</strong> {{ infraccion.marcaVehiculo }}</div>
            <div><strong>Modelo:</strong> {{ infraccion.modeloVehiculo }}</div>
            <div><strong>Color:</strong> {{ infraccion.colorVehiculo }}</div>
            <div><strong>Dominio:</strong> {{ infraccion.numeroDominio }}</div>
            <div>
              <strong>Otra Marca:</strong> {{ infraccion.otraMarca || 'N/A' }}
            </div>
          </div>

          <div class="q-mb-md">
            <q-icon name="gavel" class="q-mr-sm" size="25px" />
            <strong>Detalles de la Infracción</strong>
            <q-separator color="black" inset />
            <div><strong>Hecho:</strong> {{ infraccion.hechoInfraccion }}</div>
            <div><strong>Lugar:</strong> {{ infraccion.lugarInfraccion }}</div>
            <div>
              <strong>Ley Infringida:</strong> {{ infraccion.leyInfringida }}
            </div>
            <div>
              <strong>Observaciones:</strong> {{ infraccion.observaciones }}
            </div>
            <div>
              <strong>Descripción:</strong> {{ infraccion.descripcion }}
            </div>
            <div><strong>Testigos:</strong> {{ infraccion.testigos }}</div>
            <div>
              <strong>Prueba Documental:</strong>
              {{ infraccion.pruebaDocumental }}
            </div>
          </div>

          <div class="q-mb-md">
            <q-icon name="drive_eta" class="q-mr-sm" size="25px" />
            <strong>Licencia de Conducir</strong>
            <q-separator color="black" />
            <div>
              <strong>Número:</strong> {{ infraccion.licenciaConducir }}
            </div>
            <div><strong>Clase:</strong> {{ infraccion.clase }}</div>
            <div>
              <strong>Vencimiento:</strong>
              {{ formatDate(infraccion.vencimiento) }}
            </div>
          </div>

          <div class="q-mb-md">
            <q-icon name="verified" class="q-mr-sm" size="25px" />
            <strong>Estado y Retenciones</strong>
            <q-separator color="black" inset />
            <div>
              <strong>Retuvo Licencia:</strong>
              <q-chip :color="infraccion.retuvoLicencia ? 'green' : 'red'">
                {{ infraccion.retuvoLicencia ? 'Sí' : 'No' }}
              </q-chip>
            </div>
            <div>
              <strong>Retuvo Vehículo:</strong>
              <q-chip :color="infraccion.retuvoVehiculo ? 'green' : 'red'">
                {{ infraccion.retuvoVehiculo ? 'Sí' : 'No' }}
              </q-chip>
            </div>
            <div>
              <strong>Estado:</strong>
              <q-chip :color="infraccion.estado ? 'green' : 'red'">
                {{ infraccion.estado ? 'Terminada' : 'Pendiente' }}
              </q-chip>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" @click="cerrarDialogo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { Infraccion } from 'stores/transitoStore';

export default {
  name: 'InfraccionDialog',
  props: {
    infraccion: {
      type: Object as () => Infraccion,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue;
      }
    );

    const cerrarDialogo = () => {
      visible.value = false;
      emit('update:modelValue', false);
    };

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date));
    };

    return {
      visible,
      cerrarDialogo,
      formatDate,
    };
  },
};
</script>
