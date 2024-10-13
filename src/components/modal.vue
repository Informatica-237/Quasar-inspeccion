<template>
  <q-page style="min-height: auto">
    <!-- Botón que abre el diálogo -->
    <q-btn
      label="Nueva Infracción"
      color="primary"
      icon="add"
      @click="mostrarDialogo = true"
    />
  </q-page>

  <!-- Diálogo que depende de mostrarDialogo (computed) para su visibilidad -->
  <q-dialog full-height full-width persistent v-model="mostrarDialogo">
    <q-card class="column full-height">
      <q-card-section>
        <div class="row justify-between q-gutter-sm">
          <div class="text-h6">Full Height</div>
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
          <div class="q-py-xs">
            <div class="row justify-center">
              <h5><b>FECHA Y HORA</b></h5>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <div class="q-gutter-md row items-start">
                <q-date v-model="fecha1" mask="YYYY-MM-DD" color="grey-10" />
                <q-time v-model="fecha2" mask="HH:mm" color="grey-10" />
              </div>
            </div>

            <div class="row justify-center">
              <h4><b>CONDUCTOR</b></h4>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="nombre"
                label="NOMBRE"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="apellido"
                label="APELLIDO"
              />
              <div class="col-md-2">
                <q-option-group
                  v-model="checkboxes"
                  :options="checkboxOptions"
                  type="radio"
                  inline
                  color="grey-10"
                />
              </div>
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="domicilio"
                label="DOMICILIO"
              />
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="localidad"
                label="LOCALIDAD"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="codigopostal"
                label="CODIGO POSTAL"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="partido"
                label="PARTIDO"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="provincia"
                label="PROVINCIA"
              />
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="pais"
                label="PAIS"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="licenciaconducir"
                label="LICENCIA DE CONDUCIR"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="clase"
                label="CLASE"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="vencimiento"
                label="VENCIMIENTO"
              />
            </div>

            <div class="row justify-center">
              <H6>TIPO DOCUMENTO</H6>
            </div>
            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-select
                standout="bg-grey-10 text-black"
                style="min-width: 200px; max-width: 300px"
                v-model="opcionesdni"
                :options="tipoDocumento"
                label="TIPO"
              />

              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="espaciodni"
                label=""
              />
            </div>

            <div class="row justify-center">
              <h3><b>VEHICULO</b></h3>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-select
                standout="bg-grey-10 text-black"
                style="min-width: 200px; max-width: 300px"
                v-model="model"
                :options="vehiculo"
                label="TIPO"
              />
              <q-select
                standout="bg-grey-10 text-black"
                style="min-width: 200px; max-width: 300px"
                v-model="model2"
                :options="marca"
                label="MARCA"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="otramarca"
                label="OTRA MARCA"
                :disable="model2 !== 'OTRO'"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="modelo"
                label="MODELO"
              />
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="color"
                label="COLOR"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="dominio"
                label="Nº DOMINIO"
              />
            </div>

            <div class="row justify-center">
              <h4><b>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</b></h4>
            </div>

            <div class="row justify-center">
              <H6>DISPOSICION LEGAL INFRIGIDA LEY</H6>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-primary text-white"
                v-model="ley"
                label=""
              />
            </div>

            <div class="row justify-center">
              <h4>
                <b
                  >OBSERVACIONES / DESCRIPCION / TESTIGOS / PRUEBA DOCUMENTAL</b
                >
              </h4>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="observaciones"
                label="OBSERVACIONES"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="descripcion"
                label="DESCRIPCION"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="testigos"
                label="TESTIGOS"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="pruebadocumental"
                label="PRUEBA DOCUMENTAL"
              />
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="lugarinfraccion"
                label="LUGAR INFRACCION"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="localidadinfraccion"
                label="LOCALIDAD"
              />
            </div>

            <div class="row justify-center">
              <h4><b>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</b></h4>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="cinemometro"
                label="CINEMOMETRO"
              />
              <q-input
                class="col-md-2"
                standout="bg-grey-10 text-white"
                v-model="alcoholimetro"
                label="ALCOHOLIMETRO"
              />
            </div>

            <div class="row justify-center">
              <h4><b>MEDIDAS PRECAUTORIAS</b></h4>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <h6>RETUVO LICENCIA</h6>
              <div class="col-md-2">
                <q-option-group
                  v-model="retuvolicencia"
                  :options="opcionretuvolicencia"
                  type="radio"
                  inline
                  color="grey-10"
                />
              </div>
              <h6>RETUVO VEHICULO</h6>
              <div class="col-md-2">
                <q-option-group
                  v-model="retuvovehiculo"
                  :options="opcionretuvovehiculo"
                  type="radio"
                  inline
                  color="grey-10"
                />
              </div>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn color="grey-10" label="Enviar" />
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'componenteModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // Computed para manejar el v-model sin mutar directamente modelValue
    const mostrarDialogo = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    // Variables reactivas para las fechas
    const fecha1 = ref('');
    const fecha2 = ref('');

    // Variables reactivas para los datos del conductor
    const nombre = ref('');
    const apellido = ref('');
    const domicilio = ref('');
    const localidad = ref('');
    const codigopostal = ref('');
    const partido = ref('');
    const provincia = ref('');
    const pais = ref('');
    const licenciaconducir = ref('');
    const clase = ref('');
    const vencimiento = ref('');
    const opcionesdni = ref('');
    const checkboxes = ref(null);
    const checkboxOptions = [
      { label: 'M', value: true },
      { label: 'F', value: false },
    ];
    const tipoDocumento = ['DNI', 'LE', 'LC', 'PAS', 'CI'];
    const vehiculo = [
      'AUTOMOVIL',
      'CAMIONETA',
      'MOTO',
      'OMNIBUS',
      'CAMION',
      'ACOPLADO',
      'TRAILER OTRO',
    ];
    const marca = [
      'AUDI',
      'BMW',
      'CITROEN',
      'CHEVROLET',
      'DODGE',
      'FIAT',
      'FORD',
      'HONDA',
      'KAWA',
      'M. BENZ',
      'MITSUBISHI',
      'PEUGEOT',
      'REANULT',
      'SCANIA',
      'TOYOTA',
      'V.W',
      'YAHAMA',
      'OTRO',
    ];
    const ley = ref('');
    const observaciones = ref('');
    const descripcion = ref('');
    const testigos = ref('');
    const pruebadocumental = ref('');
    const lugarinfraccion = ref('');
    const localidadinfraccion = ref('');
    const cinemometro = ref('');
    const alcoholimetro = ref('');
    const retuvolicencia = ref('');
    const retuvovehiculo = ref('');
    const opcionretuvolicencia = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];
    const opcionretuvovehiculo = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];

    return {
      mostrarDialogo,
      fecha1,
      fecha2,
      nombre,
      apellido,
      domicilio,
      localidad,
      codigopostal,
      partido,
      provincia,
      pais,
      licenciaconducir,
      clase,
      vencimiento,
      checkboxes,
      checkboxOptions,
      opcionesdni,
      tipoDocumento,
      vehiculo,
      marca,
      ley,
      observaciones,
      descripcion,
      testigos,
      pruebadocumental,
      lugarinfraccion,
      localidadinfraccion,
      cinemometro,
      alcoholimetro,
      retuvolicencia,
      retuvovehiculo,
      opcionretuvolicencia,
      opcionretuvovehiculo,
    };
  },
});
</script>
