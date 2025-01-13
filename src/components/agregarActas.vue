<template>
  <q-page style="min-height: auto">
    <!-- Botón que abre el diálogo -->
    <q-btn
      label="Nueva Acta"
      color="grey-10"
      icon="health_and_safety"
      @click="mostrarDialogo = true"
    />
  </q-page>
  <!-- Diálogo que depende de mostrarDialogo (computed) para su visibilidad -->
  <q-dialog full-height persistent v-model="mostrarDialogo">
    <q-card class="column full-height" style="width: 1000px; max-width: 90vw">
      <q-card-section>
        <div class="row justify-between q-gutter-sm">
          <div class="text-h6">Agregar Infracción</div>
          <q-btn
            icon="close"
            flat
            round
            dense
            @click="mostrarDialogo = false"
          />
        </div>
      </q-card-section>

      <q-card-section class="col q-pt-none scroll">
        <q-scroll-area
          style="display: flex; flex-direction: column; height: 100%"
        >
          <q-form @submit.prevent="agregarActa">
            <div class="q-py-xs">
              <div class="row q-pa-md q-gutter-lg">
                <q-input
                  outlined
                  type="date"
                  v-model="nuevaActa.fecha"
                  label="Fecha"
                  class="col-4"
                  hint="Formato YYYY/MM/DD"
                />

                <!-- Campo de Hora -->
                <q-input
                  outlined
                  type="time"
                  v-model="nuevaActa.hora"
                  label="Hora"
                  class="col-4"
                  hint="Formato HH:mm"
                />

                <q-input
                  v-model="nuevaActa.domicilio"
                  label="Lugar de los hechos"
                  class="col-4"
                  outlined
                />
              </div>

              <div class="row q-pa-md q-gutter-lg">
                <q-input
                  v-model="nuevaActa.naturalezaHechos"
                  label="Naturaleza de los hechos"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.disposicionLegal"
                  label="Disposición legal"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.nombreImputado"
                  label="Nombre Imputado"
                  class="col-4"
                  outlined
                />
              </div>

              <div class="row q-pa-md q-gutter-lg">
                <q-input
                  v-model="nuevaActa.apellidoImputado"
                  label="Apellido Imputado"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.domicilioImputado"
                  label="Domicilio Imputado"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.dniImputado"
                  label="DNI Imputado"
                  class="col-4"
                  outlined
                />
              </div>

              <div class="row q-pa-md q-gutter-lg">
                <q-input
                  v-model="nuevaActa.nombreTestigo"
                  label="Nombre Testigo"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.apellidoTestigo"
                  label="Apellido Testigo"
                  class="col-4"
                  outlined
                />
                <q-input
                  v-model="nuevaActa.domicilioTestigo"
                  label="Domicilio Testigo"
                  class="col-4"
                  outlined
                />
              </div>

              <div class="row q-pa-md q-gutter-lg">
                <q-input
                  v-model="nuevaActa.dniTestigo"
                  label="DNI Testigo"
                  class="col-4"
                  outlined
                />
                <q-select
                  v-model="nuevaActa.estado"
                  :options="estados"
                  option-value="label"
                  option-label="label"
                  emit-value
                  type="radio"
                  outlined
                  color="grey-10"
                  label="Elige una opción"
                  class="col-4"
                />
              </div>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn color="primary" label="Guardar" type="submit" />
              <q-btn
                color="red"
                label="Cancelar"
                @click="mostrarDialogo = false"
              />
            </div>
          </q-form>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useTransitoStore } from '../stores/transitoStore';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ActaManager',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const actaStore = useTransitoStore();
    const $q = useQuasar();
    const mostrarDialogo = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    const nuevaActa = ref({
      domicilio: '',
      naturalezaHechos: '',
      disposicionLegal: '',
      nombreImputado: '',
      apellidoImputado: '',
      domicilioImputado: '',
      dniImputado: '',
      nombreTestigo: '',
      apellidoTestigo: '',
      domicilioTestigo: '',
      dniTestigo: '',
      estado: null,
      fecha: '',
      hora: '',
    });

    const agregarActa = () => {
      if (nuevaActa.value) {
        // Mantener fecha y hora como cadenas en formato deseado
        const acta = {
          ...nuevaActa.value,
          fecha: nuevaActa.value.fecha, // Mantener la fecha como está
          hora: nuevaActa.value.hora, // Mantener la hora como está
        };

        actaStore.agregarActa(acta);
        limpiarFormulario();
        mostrarDialogo.value = false;
        $q.notify({
          type: 'positive',
          message: 'Acta agregada correctamente!',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: 'Error al agregar acta!',
        });
      }
    };

    const estados = [
      { label: 'PENDIENTE', value: false },
      { label: 'TERMINADO', value: true },
    ];

    const limpiarFormulario = () => {
      nuevaActa.value = {
        domicilio: '',
        naturalezaHechos: '',
        disposicionLegal: '',
        nombreImputado: '',
        apellidoImputado: '',
        domicilioImputado: '',
        dniImputado: '',
        nombreTestigo: '',
        apellidoTestigo: '',
        domicilioTestigo: '',
        dniTestigo: '',
        estado: null,
        fecha: '',
        hora: '',
      };
    };

    return {
      actaStore,
      nuevaActa,
      agregarActa,
      limpiarFormulario,
      mostrarDialogo,
      estados,
    };
  },
});
</script>
