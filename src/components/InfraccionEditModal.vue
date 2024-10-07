<!-- <template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">Editar Infracción</div>
      </q-card-section>

      <q-separator />

      <q-card-section> -->
        <!-- Formulario para editar los campos de la infracción -->
        <!-- <q-form @submit="guardarCambios">
          <q-input
            v-model="editableInfraccion.fechaHora"
            label="Fecha y Hora"
            mask="####-##-## ##:##:##"
            outlined
            dense
          />
          <q-input
            v-model="editableInfraccion.nombre"
            label="Nombre"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.apellido"
            label="Apellido"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.domicilio"
            label="Domicilio"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.localidad"
            label="Localidad"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.codigoPostal"
            label="Código Postal"
            type="number"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.partido"
            label="Partido"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.provincia"
            label="Provincia"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.pais"
            label="País"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.licenciaConducir"
            label="Licencia de Conducir"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.clase"
            label="Clase"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.vencimiento"
            label="Vencimiento"
            mask="####-##-##"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.tipoDocumento"
            label="Tipo de Documento"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.documento"
            label="Documento"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.tipoVehiculo"
            label="Tipo de Vehículo"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.marcaVehiculo"
            label="Marca del Vehículo"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.otraMarca"
            label="Otra Marca"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.modeloVehiculo"
            label="Modelo del Vehículo"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.colorVehiculo"
            label="Color del Vehículo"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.numeroDominio"
            label="Número de Dominio"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.hechoInfraccion"
            label="Hecho de la Infracción"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.lugarInfraccion"
            label="Lugar de la Infracción"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.leyInfringida"
            label="Ley Infringida"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.observaciones"
            label="Observaciones"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.descripcion"
            label="Descripción"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.testigos"
            label="Testigos"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.pruebaDocumental"
            label="Prueba Documental"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.cinometro"
            label="Cinómetro"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-model="editableInfraccion.alcoholimetro"
            label="Alcoholímetro"
            outlined
            dense
            class="q-mt-md"
          />
          <q-toggle
            v-model="editableInfraccion.retuvoLicencia"
            label="¿Retuvo Licencia?"
            left-label
            dense
            class="q-mt-md"
          />
          <q-toggle
            v-model="editableInfraccion.retuvoVehiculo"
            label="¿Retuvo Vehículo?"
            left-label
            dense
            class="q-mt-md"
          />
          <q-toggle
            v-model="editableInfraccion.estado"
            label="Estado"
            left-label
            dense
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="cancelar" />
        <q-btn flat label="Guardar" color="primary" @click="guardarCambios" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template> -->

<!-- <script setup lang="ts"> -->
// import { ref, watch, defineProps, defineEmits } from 'vue';
// import { Infraccion } from 'stores/transitoStore'; // Asegúrate de tener la interfaz importada

// const componentName = 'infraccionEditModal';
// Props que recibe los datos de la infracción y si el modal está visible
// const props = defineProps({
//   infraccion: Object as () => Infraccion,
//   modelValue: Boolean,
// });

// Emitimos eventos para notificar cambios
// const emit = defineEmits(['update:modelValue', 'guardar']);

// const visible = ref(props.modelValue);
// const editableInfraccion = ref({ ...props.infraccion });

// Sincronizamos la visibilidad del modal con el padre
// watch(
//   () => props.modelValue,
//   (val) => {
//     visible.value = val;
//   }
// );

// watch(visible, (val) => {
//   emit('update:modelValue', val);
// });

// function cancelar() {
//   visible.value = false;
// }

// function guardarCambios() {
//   emit('guardar', editableInfraccion.value);
//   visible.value = false;
// }
// </script>
