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
              v-model="editableActa.nombreImputado"
              label="Nombre"
              outlined
              dense
              class="q-mt-md"
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
