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
    <q-card class="column full-height" style="width: 1000px; max-width: 90vw">
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
          <form @submit.prevent="agregarInfraccion">
            <div class="q-py-xs">
              <!-- <div class="row justify-center">
                <h5><b>FECHA Y HORA</b></h5>
              </div> -->

              <div class="row q-pa-md q-gutter-lg">
                <div class="q-gutter-md row items-start">
                  <q-input
                    filled
                    v-model="nuevaInfraccion.fechaHora"
                    color="grey-10"
                    label="Fecha y Hora"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="event"
                        class="cursor-pointer"
                        color="grey-10"
                      >
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
              </div>

              <h6>Datos del conductor</h6>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.nombre"
                  label="NOMBRE"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.apellido"
                  label="APELLIDO"
                />

                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.domicilio"
                  label="DOMICILIO"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.localidad"
                  label="LOCALIDAD"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.codigoPostal"
                  label="CODIGO POSTAL"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.partido"
                  label="PARTIDO"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.provincia"
                  label="PROVINCIA"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.pais"
                  label="PAIS"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.licenciaConducir"
                  label="LICENCIA DE CONDUCIR"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.clase"
                  label="CLASE"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.vencimiento"
                  label="VENCIMIENTO"
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

              <h6>Tipo documento</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoDocumento"
                  :options="tipoDocumento"
                  label="TIPO"
                />

                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.documento"
                  label=""
                />
              </div>

              <h6>Vehiculo</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.tipoVehiculo"
                  :options="vehiculo"
                  label="TIPO"
                />
                <q-select
                  standout="bg-grey-10 text-black"
                  style="min-width: 200px; max-width: 300px"
                  v-model="nuevaInfraccion.marcaVehiculo"
                  :options="marca"
                  label="MARCA"
                />
                <q-input
                  v-if="nuevaInfraccion.model2 === 'OTRO'"
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.otraMarca"
                  label="OTRA MARCA"
                />

                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.modeloVehiculo"
                  label="MODELO"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.colorVehiculo"
                  label="COLOR"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.numeroDominio"
                  label="Nº DOMINIO"
                />
              </div>

              <h6>HECHO QUE CONFIGURA LA INFRACCION Y LUGAR</h6>

              <h6>DISPOSICION LEGAL INFRIGIDA LEY</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.leyInfringida"
                  label=""
                />
              </div>
              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.hechoInfraccion"
                  label=""
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
                  label="OBSERVACIONES"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.descripcion"
                  label="DESCRIPCION"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.testigos"
                  label="TESTIGOS"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.pruebaDocumental"
                  label="PRUEBA DOCUMENTAL"
                />
              </div>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.lugarInfraccion"
                  label="LUGAR INFRACCION"
                />
              </div>

              <h6>ESPECIFICACIONES DEL CINEMOMETRO / ALCOHOLIMETRO</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.cinometro"
                  label="CINEMOMETRO"
                />
                <q-input
                  class="col-md-2"
                  standout="bg-grey-10 text-white"
                  v-model="nuevaInfraccion.alcoholimetro"
                  label="ALCOHOLIMETRO"
                />
              </div>

              <h6>MEDIDAS PRECAUTORIAS</h6>

              <div class="row q-pa-md q-gutter-lg justify-start">
                <h6>RETUVO LICENCIA</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.retuvoLicencia"
                    :options="opcionretuvolicencia"
                    type="radio"
                    inline
                    color="grey-10"
                  />
                </div>
                <h6>RETUVO VEHICULO</h6>
                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.retuvoVehiculo"
                    :options="opcionretuvovehiculo"
                    type="radio"
                    inline
                    color="grey-10"
                  />
                </div>

                <div class="col-md-2">
                  <q-select
                    v-model="nuevaInfraccion.estado"
                    :options="estados"
                    type="radio"
                    inline
                    color="grey-10"
                  />
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
      retuvoLicencia: false,
      retuvoVehiculo: false,
      estado: false,
    });

    const transitoStore = useTransitoStore();

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
        estado: nuevaInfraccion.value.estado.value, // Obtener solo el valor de estado
        retuvoLicencia: nuevaInfraccion.value.retuvoLicencia.value, // Obtener solo el valor de retuvoLicencia
        retuvoVehiculo: nuevaInfraccion.value.retuvoVehiculo.value, // Obtener solo el valor de retuvoVehiculo
        tipoDocumento: nuevaInfraccion.value.tipoDocumento.value, // Obtener solo el valor de tipoDocumento
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
      { label: 'PENDIENTE', value: true },
      { label: 'TERMINADO', value: false },
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
        retuvoLicencia: false,
        retuvoVehiculo: false,
        estado: false,
      };
    };

    return {
      agregarInfraccion,
      mostrarDialogo,
      nuevaInfraccion,
      estados,
      vehiculo,
      marca,
      tipoDocumento,
      opcionretuvolicencia,
      opcionretuvovehiculo,
      resetForm,
    };
  },
});
</script>
