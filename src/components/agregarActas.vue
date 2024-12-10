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
          <div class="text-h6">Agregar Infraccion</div>
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
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.domicilio"
                  label="Lugar de los hechos"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.naturalezaHechos"
                  label="Naturaleza de los hechos"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.disposicionLegal"
                  label="Disposicion legal"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.nombreImputado"
                  label="Nombre Imputado"
                />
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.apellidoImputado"
                  label="Apellido Imputado"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.domicilioImputado"
                  label="Domicilio Imputado"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.dniImputado"
                  label="Dni Imputado"
                />
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.nombreTestigo"
                  label="Nombre Testigo"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.apellidoTestigo"
                  label="Apellido Testigo"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.domicilioTestigo"
                  label="Domicilio Testigo"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaActa.dniTestigo"
                  label="DNI Testigo"
                />
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <h6>Estado:</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaActa.estado"
                    :options="estados"
                    type="radio"
                    inline
                    color="grey-10"
                    label="Elige una opcion"
                  />
                </div>
              </div>
            </div>
            <!-- Agrega los demás campos según sea necesario -->
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
      estado: true,
    });

    const agregarActa = () => {
      if (nuevaActa.value) {
        actaStore.agregarActa(nuevaActa.value);
        limpiarFormulario();
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
        estado: true,
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
