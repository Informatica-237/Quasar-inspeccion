<template>
  <div>

    <div class="row justify-center q-gutter-md" style="margin-top: 20px;">
      <q-input v-model="transitoStore.busquedaInfracciones" debounce="500" filled label="Buscar"
        style="min-width: 550px;">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn color="light-blue-5" label="NUEVA INFRACCION" icon="health_and_safety" @click="openModal" />
    </div>

    <div class="row justify-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" v-for="infraccion in transitoStore.infraccionesFiltradas" :key="infraccion.id">
          <q-card-section>

            <div class="row">
            <div class="col-md-4">
              <div class="text-h6">FECHA:</div>
              <div class="text-subtitle2">{{ infraccion.fechaHora }}</div>
            </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="text-h6">NOMBRE:</div>
                <div class="text-subtitle2">{{ infraccion.nombre }}</div>
              </div>
            </div>

            <div class="row">
            <div class="col-md-4">
              <div class="text-h6">DNI:</div>
              <div class="text-subtitle2">{{ infraccion.licenciaConducir }}</div>
            </div>
            </div>



          </q-card-section>
        </q-card>
      </div>
    </div>




    <q-dialog v-model="fullHeight" full-height full-width persistent>
      <q-card class="column full-height">
        <q-card-section>
          <div class="row justify-between q-gutter-sm">
            <div class="text-h6">Full Height</div>
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="col q-pt-none scroll">
          <q-scroll-area style="  display: flex;
  flex-direction: column;
  height: 100%;">
            <div class="q-py-xs">


              <div class="row justify-center">
                <h4><b>FECHA Y HORA</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <div class="q-gutter-md row items-start">
                  <q-date v-model="fecha1" mask="YYYY-MM-DD HH:mm" color="primary" />
                  <q-time v-model="fecha2" mask="YYYY-MM-DD HH:mm" color="primary" />
                </div>
              </div>

              <div class="row justify-center">
                <h4><b>CONDUCTOR</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="nombre" label="NOMBRE" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="apellido" label="APELLIDO" />
                <div class="col-md-2">
                  <q-option-group v-model="checkboxes" :options="checkboxOptions" type="radio" inline color="primary" />
                </div>
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="domicilio" label="DOMICILIO" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="localidad" label="LOCALIDAD" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="codigopostal"
                  label="CODIGO POSTAL" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="partido" label="PARTIDO" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="provincia" label="PROVINCIA" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="pais" label="PAIS" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="licenciaconducir"
                  label="LICENCIA DE CONDUCIR" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="clase" label="CLASE" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="vencimiento" label="VENCIMIENTO" />
              </div>

              <div class="row justify-center">
                <H6>TIPO DOCUMENTO</H6>
              </div>
              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-select standout="bg-primary text-black" style="min-width: 200px; max-width: 300px"
                  v-model="opcionesdni" :options="optiones" label="TIPO" />

                <q-input class="col-md-2" standout="bg-primary text-white" v-model="espaciodni" label="" />
              </div>

              <div class="row justify-center">
                <h3><b>VEHICULO</b></h3>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-select standout="bg-primary text-black" style="min-width: 200px; max-width: 300px" v-model="model"
                  :options="options" label="TIPO" />
                <q-select standout="bg-primary text-black" style="min-width: 200px; max-width: 300px" v-model="model2"
                  :options="options2" label="MARCA" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="otramarca" label="OTRA MARCA"
                  :disable="model2 !== 'OTRO'" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="modelo" label="MODELO" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="color" label="COLOR" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="dominio" label="Nº DOMINIO" />
              </div>

              <div class="row justify-center">
                <h4><b>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</b></h4>
              </div>

              <div class="row justify-center">
                <H6>DISPOSICION LEGAL INFRIGIDA LEY</H6>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="ley" label="" />
              </div>

              <div class="row justify-center">
                <h4><b>OBSERVACIONES / DESCRIPCION / TESTIGOS / PRUEBA DOCUMENTAL</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="observaciones"
                  label="OBSERVACIONES" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="descripcion" label="DESCRIPCION" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="testigos" label="TESTIGOS" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="pruebadocumental"
                  label="PRUEBA DOCUMENTAL" />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="lugarinfraccion"
                  label="LUGAR INFRACCION" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="localidad" label="LOCALIDAD" />
              </div>

              <div class="row justify-center">
                <h4><b>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="cinometro" label="" />
                <q-input class="col-md-2" standout="bg-primary text-white" v-model="alcoholimetro" label="" />
              </div>

              <div class="row justify-center">
                <h4><b>MEDIDAS PRECAUTORIAS</b></h4>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <h6>RETUVO LICENCIA</h6>
                <div class="col-md-2">
                  <q-option-group v-model="checkboxes2" :options="checkboxOptions2" type="radio" inline
                    color="primary" />
                </div>
                <h6>RETUVO VEHICULO</h6>
                <div class="col-md-2">
                  <q-option-group v-model="checkboxes3" :options="checkboxOptions3" type="radio" inline
                    color="primary" />
                </div>
              </div>

              <div class="row q-pa-md q-gutter-lg justify-center">
                <q-btn color="primary" label="Enviar" />
              </div>

            </div>
          </q-scroll-area>


        </q-card-section>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTransitoStore } from 'stores/transitoStore'; // Asegúrate de que esté disponible el store

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
const ley = ref('');
const otramarca = ref('');
const modelo = ref('');
const color = ref('');
const dominio = ref('');
const observaciones = ref('');
const descripcion = ref('');
const testigos = ref('');
const pruebadocumental = ref('');
const lugarinfraccion = ref('');
const cinometro = ref('');
const alcoholimetro = ref('');
const fecha1 = ref('');
const fecha2 = ref('');
const opcionesdni = ref('');
const espaciodni = ref('');





const fullHeight = ref(false); // Estado para el modal

const openModal = () => {
  fullHeight.value = true; // Abre el modal
};


// Definir los valores del checkbox
const checkboxes = ref([null]);

const checkboxOptions = [
  { label: 'M', value: 'checkbox1' },
  { label: 'F', value: 'checkbox2' }
];

const checkboxes2 = ref([null]);
const checkboxOptions2 = [
  { label: 'SI', value: 'checkbox3' },
  { label: 'NO', value: 'checkbox4' }
];

const checkboxes3 = ref([null]);
const checkboxOptions3 = [
  { label: 'SI', value: 'checkbox5' },
  { label: 'NO', value: 'checkbox6' }
];

// DEFINIR VALORES DE SELECT
const model = ref([null]);
const model2 = ref<string>(''); // Refactor de array a string


const options = [
  'AUTOMOVIL', 'CAMIONETA', 'MOTO', 'OMNIBUS', 'CAMION', 'ACOPLADO', 'TRAILER OTRO', ''
]

const options2 = [
  'AUDI', 'BMW', 'CITROEN', 'CHEVROLET', 'DODGE', 'FIAT', 'FORD', 'HONDA', 'KAWA', 'M. BENZ', 'MITSUBISHI', 'PEUGEOT', 'REANULT', 'SCANIA', 'TOYOTA', 'V.W', 'YAHAMA', 'OTRO'
]

const optiones = [
  'DNI', 'LE', 'LC', 'PAS', 'CI'
]


defineOptions({
  name: 'infraccionPage'
});


const transitoStore = useTransitoStore();


onMounted(() => {
  // Cargar los datos cuando se monte el componente
  transitoStore.cargarInfracciones();
});

</script>
