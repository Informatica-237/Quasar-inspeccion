<template>
  <q-page style="min-height: auto">
    <!-- Botón que abre el diálogo -->
    <q-btn label="Nueva Infraccion" color="grey-10" icon="health_and_safety" @click="mostrarDialogo = true" />
  </q-page>

  <!-- Diálogo que depende de mostrarDialogo (computed) para su visibilidad -->
  <q-dialog full-height full-width persistent v-model="mostrarDialogo">
    <q-card class="column full-height">
      <q-card-section>
        <div class="row justify-between q-gutter-sm">
          <div class="text-h6">Full Height</div>
          <q-btn icon="close" flat round dense @click="mostrarDialogo = false" />
        </div>
      </q-card-section>

      <q-card-section class="col q-pt-none scroll">
        <q-scroll-area style="display: flex; flex-direction: column; height: 100%">
          <form @submit.prevent="agregarInfraccion">
            <div class="q-py-xs">
              <div class="row justify-center">
                <h5><b>FECHA Y HORA</b></h5>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <div class="q-gutter-md row items-start">
                  <q-input filled v-model="nuevaInfraccion.fecha" color="grey-10">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer" color="grey-10">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="nuevaInfraccion.fecha" mask="YYYY-MM-DD HH:mm" color="grey-10">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="grey-10" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer" color="grey-10">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-time v-model="nuevaInfraccion.fecha" mask="YYYY-MM-DD HH:mm" format24h color="grey-10">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="grey-10" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>


              <div class="row justify-center">
                <h4><b>CONDUCTOR</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.nombre"
                  label="NOMBRE" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.apellido"
                  label="APELLIDO" />
                <div class="col-md-2">
                  <q-option-group v-model="checkboxes" :options="checkboxOptions" type="radio" inline color="grey-10" />
                </div>
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.domicilio"
                  label="DOMICILIO" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.localidad"
                  label="LOCALIDAD" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.codigopostal"
                  label="CODIGO POSTAL" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.partido"
                  label="PARTIDO" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.provincia"
                  label="PROVINCIA" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.pais"
                  label="PAIS" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.licenciaconducir"
                  label="LICENCIA DE CONDUCIR" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.clase"
                  label="CLASE" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.vencimiento"
                  label="VENCIMIENTO" />
              </div>

              <div class="row justify-center">
                <h6>TIPO DOCUMENTO</h6>
              </div>
              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-select standout="bg-grey-10 text-black" style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.opcionesdni" :options="tipoDocumento" label="TIPO" />

                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.espaciodni"
                  label="" />
              </div>

              <div class="row justify-center">
                <h3><b>VEHICULO</b></h3>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-select standout="bg-grey-10 text-black" style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.model" :options="vehiculo" label="TIPO" />
                <q-select standout="bg-grey-10 text-black" style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.model2" :options="marca" label="MARCA" />
                <q-input v-if="nuevaInfraccion.model2 === 'OTRO'" class="col-md-2" standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.otramarca" label="OTRA MARCA" />

                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.modelo"
                  label="MODELO" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.color"
                  label="COLOR" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.dominio"
                  label="Nº DOMINIO" />
              </div>

              <div class="row justify-center">
                <h4><b>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</b></h4>
              </div>

              <div class="row justify-center">
                <h6>DISPOSICION LEGAL INFRIGIDA LEY</h6>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.ley" label="" />
              </div>

              <div class="row justify-center">
                <h4>
                  <b>OBSERVACIONES / DESCRIPCION / TESTIGOS / PRUEBA DOCUMENTAL</b>
                </h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.observaciones"
                  label="OBSERVACIONES" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.descripcion"
                  label="DESCRIPCION" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.testigos"
                  label="TESTIGOS" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.pruebadocumental"
                  label="PRUEBA DOCUMENTAL" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.lugarinfraccion"
                  label="LUGAR INFRACCION" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.localidadinfraccion"
                  label="LOCALIDAD" />
              </div>

              <div class="row justify-center">
                <h4><b>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.cinemometro"
                  label="CINEMOMETRO" />
                <q-input class="col-md-2" standout="bg-grey-10 text-white" v-model="nuevaInfraccion.alcoholimetro"
                  label="ALCOHOLIMETRO" />
              </div>

              <div class="row justify-center">
                <h4><b>MEDIDAS PRECAUTORIAS</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <h6>RETUVO LICENCIA</h6>
                <div class="col-md-2">
                  <q-option-group v-model="nuevaInfraccion.retuvolicencia" :options="opcionretuvolicencia" type="radio"
                    inline color="grey-10" />
                </div>
                <h6>RETUVO VEHICULO</h6>
                <div class="col-md-2">
                  <q-option-group v-model="nuevaInfraccion.retuvovehiculo" :options="opcionretuvovehiculo" type="radio"
                    inline color="grey-10" />
                </div>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-btn color="grey-10" label="Enviar" type="submit" />
              </div>
            </div>
          </form>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useTransitoStore } from '../stores/transitoStore';

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


    const nuevaInfraccion = ref({
      fecha: new Date().toISOString(),
      nombre: '',
      apellido: '',
      domicilio: '',
      localidad: '',
      codigopostal: '',
      partido: '',
      provincia: '',
      pais: '',
      licenciaconducir: '',
      clase: '',
      vencimiento: '',
      opcionesdni: '',
      espaciodni: '',
      checkboxes: null,
      checkboxOptions: [
        { label: 'M', value: true },
        { label: 'F', value: false },
      ],
      vehiculo: [
        'AUTOMOVIL',
        'CAMIONETA',
        'MOTO',
        'OMNIBUS',
        'CAMION',
        'ACOPLADO',
        'TRAILER OTRO',
      ],
      marca: [
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
      ],
      model: '',
      model2: '',
      otramarca: '',
      color: '',
      dominio: '',
      ley: '',
      observaciones: '',
      descripcion: '',
      testigos: '',
      pruebadocumental: '',
      lugarinfraccion: '',
      localidadinfraccion: '',
      cinemometro: '',
      alcoholimetro: '',
      retuvolicencia: '',
      retuvovehiculo: '',
      opcionretuvolicencia: '',
      opcionretuvovehiculo: '',
    });


    const transitoStore = useTransitoStore();

    const agregarInfraccion = async () => {
      try {

        await transitoStore.agregarInfraccion(nuevaInfraccion);
        resetForm();
        mostrarDialogo.value = false;
      } catch (error) {
        console.error('Error al agregar infracción:', error);
        // Mostrar un mensaje de error al usuario (puedes implementar un sistema de notificación aquí)
      }
    };






    // Variables reactivas para las fechas
    const fecha = ref('');

    // Variables reactivas para los datos del conductor
    const nombre = ref('');
    const apellido = ref('');
    const domicilio = ref('');
    const localidad = ref('');
    const codigopostal = ref('');
    const partido = ref('');
    const provincia = ref
    const pais = ref('');
    const licenciaconducir = ref('');
    const clase = ref('');
    const vencimiento = ref
    const opcionesdni = ref('');
    const checkboxes = ref([]);
    const checkboxOptions = [
      { label: 'M', value: true },
      { label: 'F', value: false },
    ];
    const tipoDocumento = ref([{ label: 'DNI', value: 'dni' }, { label: 'Pasaporte', value: 'pasaporte' }]);
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
    const espaciodni = ref('')
    const otramarca = ref('')
    const model = ref('');
    const modelo = ref('');
    const model2 = ref('');
    const color = ref('');
    const dominio = ref('');
    const ley = ref('');
    const observaciones = ref('');
    const descripcion = ref
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

    // Añadir esta línea para definir la variable dominio

    return {
      agregarInfraccion,
      mostrarDialogo,
      fecha,
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
      espaciodni,
      tipoDocumento,
      vehiculo,
      marca,
      otramarca,
      model,
      modelo,
      model2,
      color,
      dominio,
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
      nuevaInfraccion,
    };
  },
});
</script>
