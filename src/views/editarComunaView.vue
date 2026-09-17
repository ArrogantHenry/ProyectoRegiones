<template>
  <h2>Modificar comuna</h2>

  <form @submit.prevent="guardar">
    <div>
      <label>Id Región</label>
      <input type="number" v-model.number="formulario.idRegion">
    </div>

    <div>
      <label>Id Comuna</label>
      <input type="number" v-model.number="formulario.idComuna">
    </div>

    <div>
      <label>Comuna</label>
      <input type="text" v-model="formulario.comuna">
    </div>

    <div>
      <label>Información adicional (XML)</label>
      <textarea rows="15"
                v-model="formulario.informacionAdicional">
      </textarea>
    </div>

    <button type="submit">Guardar cambios</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    obtenerComuna,
    actualizarComuna
} from '../services/api';
import type { ComunaDetalle } from '../models/ComunaDetalle';

const route = useRoute();
const router = useRouter();

const formulario = reactive<ComunaDetalle>({
    idRegion: Number(route.params.idRegion),
    idComuna: Number(route.params.idComuna),
    comuna: '',
    informacionAdicional: ''
});

onMounted(async () => {
    const datos = await obtenerComuna(
        formulario.idRegion,
        formulario.idComuna
    );

    Object.assign(formulario, datos);
});

const guardar = async () => {
    await actualizarComuna(
        formulario.idRegion,
        formulario.idComuna,
        formulario
    );

    router.push(
        `/region/${formulario.idRegion}/comunas`
    );
};
</script>
