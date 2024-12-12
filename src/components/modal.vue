<template>
  <q-page style="min-height: auto">
    <!-- Botón que abre el diálogo -->
    <q-btn
      label="Nueva Infraccion"
      color="grey-10"
      icon="health_and_safety"
      @click="mostrarDialogo = true"
    />
  </q-page>

  <!-- Diálogo que depende de mostrarDialogo (computed) para su visibilidad -->
  <q-dialog full-height persistent v-model="mostrarDialogo">
    <q-card class="column full-height" style="width: 1400px; max-width: 90vw">
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
          <q-form @submit.prevent="agregarInfraccion">
            <div class="q-py-xs">
              <h6>Fecha y Hora</h6>

              <div class="q-gutter-md row items-start">
                <q-input
                  filled
                  v-model="nuevaInfraccion.fechaHora"
                  color="grey-10"
                  label="Fecha y Hora"
                  hint="Formato 0000-00-00 00:00"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer" color="grey-10">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="nuevaInfraccion.fechaHora"
                          mask="YYYY-MM-DD HH:mm"
                          color="grey-10"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="grey-10"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon
                      name="access_time"
                      class="cursor-pointer"
                      color="grey-10"
                    >
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="nuevaInfraccion.fechaHora"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                          color="grey-10"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="grey-10"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>



              <h6>Datos del conductor</h6>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.nombre"
                  label="NOMBRE"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.apellido"
                  label="Apellido"
                  :rules="[val => !!val || 'Sin completar']"
                />

                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoDocumento"
                  :options="tipoDocumento"
                  label="Tipo Documento"
                  :rules="[val => !!val || 'Sin completar']"
                />

                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.documento"
                  label="Numero documento"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.domicilio"
                  label="Domicilio"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.localidad"
                  label="Localidad"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.codigoPostal"
                  label="Codigo Postal"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.partido"
                  label="Partido"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.provincia"
                  label="Provincia"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.pais"
                  label="Pais"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.licenciaConducir"
                  label="Licencia de Conducir"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.clase"
                  label="Clase"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.vencimiento"
                  label="Vencimiento"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" color="grey-10">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="nuevaInfraccion.vencimiento"
                          mask="YYYY-MM-DD"
                          color="grey-10"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Cerrar"
                              color="grey-10"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <h6>Vehiculo</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoVehiculo"
                  :options="vehiculo"
                  label="Tipo Vehiculo"
                  :rules="[val => !!val || 'Sin completar']"
                />

                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  filled
                  v-model="nuevaInfraccion.marcaVehiculo"
                  use-input
                  input-debounce="0"
                  label="Marca del Vehiculo"
                  clearable
                  :options="options"
                  @filter="filterFn"
                  :rules="[val => !!val || 'Sin completar']"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  v-if="nuevaInfraccion.model2 === 'OTRO'"
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.otraMarca"
                  label="Otra Marca"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.nroChasis"
                  label="Numero de chasis"
                  hint="Valor alfanumerico"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.nroMotor"
                  label="Numero de motor"
                  hint="Valor numerico"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.modeloVehiculo"
                  label="Modelo"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.colorVehiculo"
                  label="Color"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.numeroDominio"
                  label="Nº Dominio"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <h6>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-4"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.leyInfringida"
                  label="Disposicion legal infrigida ley"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-4"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.hechoInfraccion"
                  label="Hecho Infraccion"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <h6>
                OBSERVACIONES / DESCRIPCION / TESTIGOS / PRUEBA DOCUMENTAL
              </h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.observaciones"
                  label="Observaciones"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.descripcion"
                  label="Descripcion"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.testigos"
                  label="Testigos"
                  :rules="[val => !!val || 'Sin completar']"
                />

                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.pruebaDocumental"
                  label="Prueba Documental"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.lugarInfraccion"
                  label="Lugar Infraccion"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <h6>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.cinometro"
                  label="Cinometro"
                  :rules="[val => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.alcoholimetro"
                  label="Alcoholimetro"
                  :rules="[val => !!val || 'Sin completar']"
                />
              </div>

              <h6>MEDIDAS PRECAUTORIAS</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <h6>Retuvo licencia:</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.retuvoLicencia"
                    :options="opcionretuvolicencia"
                    type="radio"
                    label="Elige una opcion"
                    inline
                    color="grey-10"
                    :rules="[val => !!val || 'Sin completar']"
                  />
                </div>
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <h6>Retuvo vehiculo:</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.retuvoVehiculo"
                    :options="opcionretuvovehiculo"
                    type="radio"
                    label="Elige una opcion"
                    inline
                    color="grey-10"
                    :rules="[val => !!val || 'Sin completar']"
                  />
                </div>
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <h6>Estado:</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.estado"
                    :options="estados"
                    type="radio"
                    inline
                    color="grey-10"
                    label="Elige una opcion"
                    :rules="[val => !!val || 'Sin completar']"
                  />
                </div>
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

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useTransitoStore } from '../stores/transitoStore';
import axios from 'axios';

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
    const mostrarDialogo = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    const nuevaInfraccion = ref({
      fechaHora: '',
      nombre: '',
      apellido: '',
      domicilio: '',
      localidad: '',
      codigoPostal: '', // Inicialmente como cadena
      partido: '',
      provincia: '',
      pais: '',
      licenciaConducir: '',
      clase: '',
      vencimiento: '', // Inicialmente como cadena
      tipoDocumento: '',
      documento: '',
      tipoVehiculo: '',
      marcaVehiculo: '',
      nroChasis: '',
      nroMotor: '',
      otraMarca: '',
      modeloVehiculo: '',
      colorVehiculo: '',
      numeroDominio: '',
      hechoInfraccion: '',
      lugarInfraccion: '',
      leyInfringida: '',
      observaciones: '',
      descripcion: '',
      testigos: '',
      pruebaDocumental: '',
      cinometro: '',
      alcoholimetro: '',
      retuvoLicencia: '',
      retuvoVehiculo: '',
      estado: '',
    });

    const transitoStore = useTransitoStore();

    const marcasOptions = ref([]);
    const options = ref([]); // Inicializar con una copia de marcasOptions

    // Cargar datos de marcas desde el archivo JSON
    onMounted(async () => {
      try {
        const response = await axios.get('/config.json');
        console.log('Datos cargados desde config.json:', response.data);

        // Accede al array de marcas dentro del objeto
        if (Array.isArray(response.data.marcas)) {
          marcasOptions.value = response.data.marcas.map((marca, index) => ({
            label: marca,
            value: index + 1,
          }));
          options.value = [...marcasOptions.value]; // Inicializar options con los mismos valores
        } else {
          console.error('El formato del JSON no es correcto:', response.data);
        }

        console.log('Opciones de marcas:', marcasOptions.value);
      } catch (error) {
        console.error('Error al cargar las marcas:', error);
      }
    });

    const filterFn = (val, update) => {
      // Si el valor de búsqueda está vacío, restablecemos las opciones a las originales
      if (val === '') {
        update(() => {
          options.value = marcasOptions.value; // Asumiendo que marcasOptions es un ref
        });
        return;
      }

      // Filtrar las opciones basadas en el valor de búsqueda
      update(() => {
        const needle = val.toLowerCase();
        options.value = marcasOptions.value.filter((v) => {
          // Verificar si 'v.label' es una cadena y hacer la comparación}
          console.log(v.label);

          if (typeof v.label === 'string') {
            return v.label.toLowerCase().includes(needle); // Cambié a v.label
          }
          return false; // Excluir valores que no sean cadenas
        });
      });
    };

    const agregarInfraccion = async () => {
      const formatFecha = (fechaStr) => {
        const date = new Date(fechaStr);
        return isNaN(date.getTime()) ? null : date; // Retorna null si la fecha no es válida
      };

      const infraccionData = {
        ...nuevaInfraccion.value,
        fechaHora: formatFecha(nuevaInfraccion.value.fechaHora), // Validar y formatear fechaHora
        vencimiento: formatFecha(nuevaInfraccion.value.vencimiento), // Validar y formatear vencimiento
        codigoPostal: Number(nuevaInfraccion.value.codigoPostal), // Convertir codigoPostal a tipo Number
        retuvoLicencia: Boolean(nuevaInfraccion.value.retuvoLicencia),
        retuvoVehiculo: Boolean(nuevaInfraccion.value.retuvoVehiculo),
        estado: Boolean(nuevaInfraccion.value.estado),

        tipoDocumento: nuevaInfraccion.value.tipoDocumento.value, // Obtener solo el valor del tipo de documento
      };

      if (!infraccionData.fechaHora || !infraccionData.vencimiento) {
        console.error('Fecha inválida en los datos:', infraccionData);
        return;
      }

      try {
        await transitoStore.agregarInfraccion(infraccionData);
        resetForm(); // Reiniciar el formulario después de agregar
      } catch (error) {
        console.error('Error al agregar infracción:', error);
      }
    };

    const estados = [
      { label: 'PENDIENTE', value: false },
      { label: 'TERMINADO', value: true },
    ];

    const opcionretuvovehiculo = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];

    const opcionretuvolicencia = [
      { label: 'SI', value: true },
      { label: 'NO', value: false },
    ];

    const vehiculo = [
      'AUTOMOVIL',
      'CAMIONETA',
      'MOTO',
      'OMNIBUS',
      'CAMION',
      'ACOPLADO',
      'TRAILER OTRO',
    ];

    const tipoDocumento = [
      { label: 'DNI', value: 'dni' },
      { label: 'Pasaporte', value: 'pasaporte' },
    ];

    // const marca = [
    //   'AUDI',
    //   'BMW',
    //   'CITROEN',
    //   'CHEVROLET',
    //   'DODGE',
    //   'FIAT',
    //   'FORD',
    //   'HONDA',
    //   'KAWA',
    //   'M. BENZ',
    //   'MITSUBISHI',
    //   'PEUGEOT',
    //   'REANULT',
    //   'SCANIA',
    //   'TOYOTA',
    //   'V.W',
    //   'YAHAMA',
    //   'OTRO',
    // ];

    const resetForm = () => {
      nuevaInfraccion.value = {
        fechaHora: '',
        nombre: '',
        apellido: '',
        domicilio: '',
        localidad: '',
        codigoPostal: '', // Reinicia como cadena
        partido: '',
        provincia: '',
        pais: '',
        licenciaConducir: '',
        clase: '',
        vencimiento: '', // Reinicia como cadena
        tipoDocumento: '',
        documento: '',
        tipoVehiculo: '',
        nroChasis: '',
        nroMotor: '',
        marcaVehiculo: '',
        otraMarca: '',
        modeloVehiculo: '',
        colorVehiculo: '',
        numeroDominio: '',
        hechoInfraccion: '',
        lugarInfraccion: '',
        leyInfringida: '',
        observaciones: '',
        descripcion: '',
        testigos: '',
        pruebaDocumental: '',
        cinometro: '',
        alcoholimetro: '',
        retuvoLicencia: '',
        retuvoVehiculo: '',
        estado: '',
      };
    };

    return {
      agregarInfraccion,
      mostrarDialogo,
      nuevaInfraccion,
      estados,
      vehiculo,
      marcasOptions,
      tipoDocumento,
      opcionretuvolicencia,
      opcionretuvovehiculo,
      resetForm,
      filterFn,
      options,
    };
  },
});
</script>
