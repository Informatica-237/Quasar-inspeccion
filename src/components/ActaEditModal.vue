<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 1000px">
      <q-card-section>
        <div class="text-h6">Editar Acta</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- Formulario para editar los campos de la infracción -->

        <q-form @submit="guardarCambios">
          <div class="row q-pa-md q-gutter-md">
            <q-input
              v-model="editableActa.domicilio"
              label="Lugar de los hechos"
              class="col-4"
              outlined
            />
          </div>

          <div class="row q-pa-md q-gutter-lg">
            <q-input
              v-model="editableActa.naturalezaHechos"
              label="Naturaleza de los hechos"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.disposicionLegal"
              label="Disposición legal"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.nombreImputado"
              label="Nombre Imputado"
              class="col-4"
              outlined
            />
          </div>

          <div class="row q-pa-md q-gutter-lg">
            <q-input
              v-model="editableActa.apellidoImputado"
              label="Apellido Imputado"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.domicilioImputado"
              label="Domicilio Imputado"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.dniImputado"
              label="DNI Imputado"
              class="col-4"
              outlined
            />
          </div>

          <div class="row q-pa-md q-gutter-lg">
            <q-input
              v-model="editableActa.nombreTestigo"
              label="Nombre Testigo"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.apellidoTestigo"
              label="Apellido Testigo"
              class="col-4"
              outlined
            />
            <q-input
              v-model="editableActa.domicilioTestigo"
              label="Domicilio Testigo"
              class="col-4"
              outlined
            />
          </div>

          <div class="row q-pa-md q-gutter-lg">
            <q-input
              v-model="editableActa.dniTestigo"
              label="DNI Testigo"
              class="col-4"
              outlined
            />
            <q-select
              v-model="editableActa.estado"
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
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="cancelar" />
        <q-btn flat label="Guardar" color="primary" @click="guardarCambios" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// import { Infraccion } from 'stores/transitoStore';

export default {
  name: 'actaEditModal',
  props: {
    acta: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'guardar'],
  setup(props) {
    const estados = [
      { label: 'PENDIENTE', value: false },
      { label: 'TERMINADO', value: true },
    ];

    return {
      estados,
      ...props,
    };
  },
  data() {
    return {
      visible: this.modelValue,
      editableActa: { ...this.acta },
    };
  },
  watch: {
    modelValue(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('update:modelValue', val);
    },
  },
  methods: {
    cancelar() {
      this.visible = false;
    },
    guardarCambios() {
      this.$emit('guardar', this.editableActa);
      this.visible = false;
    },
  },
};
</script>
