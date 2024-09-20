<template>

  <div class="row justify-center">
      <h2><b>ACTA DE INFRACCION</b></h2>
    </div>

  <div class="row justify-center">
      <h4><b>FECHA Y HORA</b></h4>
    </div>

    <div class="row q-pa-md q-gutter-lg justify-center">
      <q-date v-model="fecha1" mask="YYYY-MM-DD HH:mm" color="primary" />
      <q-time v-model="fecha2" mask="YYYY-MM-DD HH:mm" color="primary" />
    </div>

    <div class="row q-pa-md q-gutter-lg justify-center">
      <q-input class="col-md-2" standout="bg-primary text-white" v-model="domicilio" label="DOMICILIO" />
    </div>

    <div class="row q-pa-md q-gutter-lg justify-center">
      <div class="row q-pa-md q-gutter-lg justify-center">
        <h6>NATURALEZA Y CIRCUSTANCIAS DE LOS HECHOS</h6>
      </div>
    </div>
    <div class="row q-pa-md q-gutter-lg justify-center" >
          <q-input
          style="min-width: 400px;"
          v-model="textarea"
          filled
          type="textarea"
          />
        </div>

        <div class="row q-pa-md q-gutter-lg justify-center" >
          <h6>DISPOSICION LEGAL</h6>
        </div>
        <div class="row q-pa-md q-gutter-lg justify-center">
          <q-input
          style="min-width: 400px;"
          v-model="textarea2"
          filled
          type="textarea"
          />
        </div>

        <div class="row justify-center">
            <h4><b>IMPUTADO</b></h4>
          </div>

      <div class="row q-pa-md q-gutter-lg justify-center">
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="nombreimputado" label="NOMBRE" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="apellidoimputado" label="APELLIDO" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="domicilioimputado" label="DOMICILIO" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="dniimputado" label="D.N.I" />
      </div>

        <div class="row justify-center">
            <h4><b>TESTIGOS</b></h4>
          </div>

      <div class="row q-pa-md q-gutter-lg justify-center">
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="nombretestigos" label="NOMBRE" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="apellidotestigos" label="APELLIDO" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="domiciliotestigos" label="DOMICILIO" />
        <q-input class="col-md-2" standout="bg-primary text-white" v-model="dnitestigos" label="D.N.I" />
      </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const domicilio = ref('');
const fecha1 = ref('');
const fecha2 = ref('');
const textarea = ref('');
const textarea2 = ref('');
const nombreimputado = ref('');
const apellidoimputado = ref('');
const domicilioimputado = ref('');
const dniimputado = ref('');
const nombretestigos = ref('');
const apellidotestigos = ref('');
const domiciliotestigos = ref('');
const dnitestigos = ref('');


defineOptions({
  name: 'actaPage'
});</script>
