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
          <q-form>
            <div class="q-py-xs">
              <h6>Fecha y Hora</h6>

              <div class="q-gutter-md row items-start">
                <!-- Input para la Fecha -->
                <q-input
                  v-model="fecha"
                  outlined
                  label="Fecha"
                  hint="Formato YYYY-MM-DD"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer" color="grey-10">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="fecha" mask="YYYY-MM-DD" outlined>
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

                <!-- Input para la Hora -->
                <q-input
                  v-model="hora"
                  outlined
                  label="Hora"
                  hint="Formato HH:mm"
                >
                  <template v-slot:prepend>
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
                        <q-time v-model="hora" mask="HH:mm" format24h outlined>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Cerrar"
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
                  outlined
                  v-model="nuevaInfraccion.nombre"
                  label="Nombre"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.apellido"
                  label="Apellido"
                  :rules="[(val) => !!val || 'Sin completar']"
                />

                <q-select
                  outlined
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoDocumento"
                  :options="tipoDocumento"
                  label="Tipo Documento"
                  :rules="[(val) => !!val || 'Sin completar']"
                />

                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.documento"
                  label="Numero documento"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.domicilio"
                  label="Domicilio"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.localidad"
                  label="Localidad"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.codigoPostal"
                  label="Codigo Postal"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.partido"
                  label="Partido"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.provincia"
                  label="Provincia"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.pais"
                  label="Pais"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.licenciaConducir"
                  label="Licencia de Conducir"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.clase"
                  label="Clase"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
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
                  outlined
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoVehiculo"
                  :options="vehiculo"
                  label="Tipo Vehiculo"
                  :rules="[(val) => !!val || 'Sin completar']"
                />

                <q-select
                  outlined
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.marcaVehiculo"
                  use-input
                  input-debounce="0"
                  label="Marca del Vehiculo"
                  clearable
                  :options="options"
                  @filter="filterFn"
                  :rules="[(val) => !!val || 'Sin completar']"
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
                  outlined
                  v-model="nuevaInfraccion.otraMarca"
                  label="Otra Marca"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.nroChasis"
                  label="Numero de chasis"
                  hint="Valor alfanumerico"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.nroMotor"
                  label="Numero de motor"
                  hint="Valor numerico"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.modeloVehiculo"
                  label="Modelo"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.colorVehiculo"
                  label="Color"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.numeroDominio"
                  label="Nº Dominio"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <h6>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-4"
                  outlined
                  v-model="nuevaInfraccion.leyInfringida"
                  label="Disposicion legal infrigida ley"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-4"
                  outlined
                  v-model="nuevaInfraccion.hechoInfraccion"
                  label="Hecho Infraccion"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <h6>
                OBSERVACIONES / DESCRIPCION / TESTIGOS / PRUEBA DOCUMENTAL
              </h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.observaciones"
                  label="Observaciones"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.descripcion"
                  label="Descripcion"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.testigos"
                  label="Testigos"
                  :rules="[(val) => !!val || 'Sin completar']"
                />

                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.pruebaDocumental"
                  label="Prueba Documental"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.lugarInfraccion"
                  label="Lugar Infraccion"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
              </div>

              <h6>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.cinometro"
                  label="Cinometro"
                  :rules="[(val) => !!val || 'Sin completar']"
                />
                <q-input
                  class="col-md-2"
                  outlined
                  v-model="nuevaInfraccion.alcoholimetro"
                  label="Alcoholimetro"
                  :rules="[(val) => !!val || 'Sin completar']"
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
                    outlined
                    :rules="[(val) => !!val || 'Sin completar']"
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
                    outlined
                    :rules="[(val) => !!val || 'Sin completar']"
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
                    outlined
                    label="Elige una opcion"
                    :rules="[(val) => !!val || 'Sin completar']"
                  />
                </div>
              </div>
            </div>

            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn
                color="primary"
                label="Guardar"
                type="submit"
                @click="agregarInfraccion"
              />
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
import { useQuasar } from 'quasar';

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
    const $q = useQuasar();
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

        if (Array.isArray(response.data.marcas)) {
          // Almacenar los labels directamente
          marcasOptions.value = response.data.marcas.map((marca) => ({
            label: marca,
          }));
          options.value = marcasOptions.value.map((marca) => marca.label); // Solo guardar labels
        } else {
          console.error('El formato del JSON no es correcto:', response.data);
        }

        console.log('Opciones de marcas:', marcasOptions.value);
      } catch (error) {
        console.error('Error al cargar las marcas:', error);
      }
    });

    const filterFn = (val, update) => {
      if (val === '') {
        update(() => {
          options.value = marcasOptions.value.map((marca) => marca.label); // Restablecer a los labels
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = marcasOptions.value
          .map((marca) => marca.label)
          .filter((label) => label.toLowerCase().includes(needle));
      });
    };

    const agregarInfraccion = async () => {
      const formatFecha = (fechaStr) => {
        const date = new Date(fechaStr);
        return isNaN(date.getTime()) ? null : date;
      };

      // Validación de campos vacíos
      if (
        !nuevaInfraccion.value.fechaHora ||
        !nuevaInfraccion.value.vencimiento ||
        !nuevaInfraccion.value.codigoPostal ||
        !nuevaInfraccion.value.tipoDocumento ||
        !nuevaInfraccion.value.tipoDocumento.value
      ) {
        console.log('Datos faltantes:', {
          fechaHora: nuevaInfraccion.value.fechaHora,
          vencimiento: nuevaInfraccion.value.vencimiento,
          codigoPostal: nuevaInfraccion.value.codigoPostal,
          tipoDocumento: nuevaInfraccion.value.tipoDocumento,
        });
        $q.notify({
          message: 'Por favor complete todos los campos obligatorios.',
          color: 'negative',
        });
        return;
      }

      const infraccionData = {
        ...nuevaInfraccion.value,
        fechaHora: formatFecha(nuevaInfraccion.value.fechaHora),
        vencimiento: formatFecha(nuevaInfraccion.value.vencimiento),
        codigoPostal: Number(nuevaInfraccion.value.codigoPostal),
        retuvoLicencia: Boolean(nuevaInfraccion.value.retuvoLicencia),
        retuvoVehiculo: Boolean(nuevaInfraccion.value.retuvoVehiculo),
        estado: Boolean(nuevaInfraccion.value.estado),
        tipoDocumento: nuevaInfraccion.value.tipoDocumento.value,
      };

      if (!infraccionData.fechaHora || !infraccionData.vencimiento) {
        $q.notify({
          message: 'Las fechas proporcionadas no son válidas.',
          color: 'negative',
        });
        return;
      }

      try {
        await transitoStore.agregarInfraccion(infraccionData);
        $q.notify({
          message: 'La infracción se guardó correctamente.',
          color: 'positive',
        });
        resetForm();
        mostrarDialogo.value = false;
      } catch (error) {
        console.error('Error al agregar infracción:', error);
        $q.notify({
          message: 'Error al agregar infracción. Inténtalo de nuevo.',
          color: 'negative',
        });
      }
    };

    // Computed para separar y unir fecha y hora
    const fecha = computed({
      get: () => nuevaInfraccion.value.fechaHora.split(' ')[0] || '',
      set: (val) => {
        const hora = nuevaInfraccion.value.fechaHora.split(' ')[1] || '00:00';
        nuevaInfraccion.value.fechaHora = `${val} ${hora}`;
      },
    });

    const hora = computed({
      get: () => nuevaInfraccion.value.fechaHora.split(' ')[1] || '',
      set: (val) => {
        const fecha =
          nuevaInfraccion.value.fechaHora.split(' ')[0] || '0000-00-00';
        nuevaInfraccion.value.fechaHora = `${fecha} ${val}`;
      },
    });

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
      fecha,
      hora,
    };
  },
});
</script>
