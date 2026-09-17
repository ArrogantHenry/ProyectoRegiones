<template>
  <div class="pagina">

    <header class="encabezado">
      <p class="subtitulo">
        Sistema de regiones y comunas
      </p>

      <h1>
        Información de la comuna
      </h1>

      <p class="descripcion">
        Consulta y modifica la información de la comuna seleccionada.
      </p>
    </header>

    <main class="contenido">

      <div class="tarjeta">

        <!-- Encabezado de la tarjeta -->

        <div class="cabecera-tarjeta">

          <div class="icono">
            📍
          </div>

          <div>
            <span class="etiqueta">
              Comuna seleccionada
            </span>

            <h2>
              {{ comuna.comuna || 'Cargando...' }}
            </h2>
          </div>

        </div>

        <!-- Identificadores -->

        <div class="identificadores">

          <div class="dato">
            <span>ID Región</span>
            <strong>{{ comuna.idRegion }}</strong>
          </div>

          <div class="dato">
            <span>ID Comuna</span>
            <strong>{{ comuna.id }}</strong>
          </div>

        </div>

        <!-- Formulario -->

        <div class="formulario">

          <div class="campo">

            <label for="comuna">
              Nombre de la comuna
            </label>

            <input
              id="comuna"
              type="text"
              v-model="comuna.comuna"
              placeholder="Ingrese el nombre de la comuna"
            />

          </div>

          <div class="campo">

            <label for="informacion">
              Información adicional
            </label>

            <textarea
              id="informacion"
              rows="15"
              v-model="comuna.informacionAdicional"
              placeholder="Ingrese información adicional..."
            ></textarea>

            <span class="ayuda">
              Puede ingresar información adicional en formato XML.
            </span>

          </div>

        </div>

        <!-- Botones -->

        <div class="acciones">

          <button
            type="button"
            class="btn-volver"
            @click="$router.back()"
          >
            ← Volver
          </button>

          <button
            type="button"
            class="btn-guardar"
            @click="guardarComuna"
          >
            💾 Guardar cambios
          </button>

        </div>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import {
  obtenerComuna,
  actualizarComuna
} from '../../services/api'

const route = useRoute()

const idRegion = Number(route.params.id)
const idComuna = Number(route.params.idComuna)

const comuna = ref({
  id: idComuna,
  idRegion: idRegion,
  comuna: '',
  informacionAdicional: ''
})

onMounted(async () => {
  try {
    const data = await obtenerComuna(
      idRegion,
      idComuna
    )

    comuna.value = data

    console.log(
      'COMUNA SELECCIONADA:',
      comuna.value
    )

  } catch (error) {
    console.error(
      'Error al obtener la comuna:',
      error
    )
  }
})

const guardarComuna = async () => {
  try {

    await actualizarComuna(
      idRegion,
      idComuna,
      comuna.value
    )

    alert('Comuna modificada correctamente')

  } catch (error) {

    console.error(
      'Error al modificar la comuna:',
      error
    )

    alert('No se pudo modificar la comuna')
  }
}
</script>

<style scoped>
.pagina {
  min-height: 100vh;
  padding: 45px 25px;
  background: #f4f6f8;
}

/* Encabezado */

.encabezado {
  max-width: 900px;
  margin: 0 auto 35px;
}

.subtitulo {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 14px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.encabezado h1 {
  margin: 0;

  color: #1f2937;

  font-size: 36px;
}

.descripcion {
  margin-top: 10px;

  color: #6b7280;

  font-size: 16px;
}

/* Contenido */

.contenido {
  max-width: 900px;
  margin: 0 auto;
}

/* Tarjeta */

.tarjeta {
  padding: 32px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.06);
}

/* Cabecera */

.cabecera-tarjeta {
  display: flex;
  align-items: center;

  gap: 18px;

  padding-bottom: 25px;

  border-bottom: 1px solid #e5e7eb;
}

.icono {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  border-radius: 12px;

  background: #eff6ff;

  font-size: 28px;
}

.etiqueta {
  color: #6b7280;

  font-size: 13px;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cabecera-tarjeta h2 {
  margin: 4px 0 0;

  color: #1f2937;

  font-size: 24px;
}

/* Identificadores */

.identificadores {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;

  margin: 25px 0;
}

.dato {
  padding: 15px 18px;

  background: #f9fafb;

  border: 1px solid #e5e7eb;

  border-radius: 8px;
}

.dato span {
  display: block;

  margin-bottom: 5px;

  color: #6b7280;

  font-size: 13px;
}

.dato strong {
  color: #1f2937;

  font-size: 17px;
}

/* Formulario */

.formulario {
  margin-top: 10px;
}

.campo {
  margin-bottom: 25px;
}

.campo label {
  display: block;

  margin-bottom: 8px;

  color: #374151;

  font-size: 15px;
  font-weight: 600;
}

.campo input,
.campo textarea {
  box-sizing: border-box;

  width: 100%;

  padding: 12px 14px;

  border: 1px solid #d1d5db;

  border-radius: 8px;

  background: white;

  color: #1f2937;

  font-family: inherit;

  font-size: 15px;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.campo input:focus,
.campo textarea:focus {
  outline: none;

  border-color: #2563eb;

  box-shadow:
    0 0 0 3px
    rgba(37, 99, 235, 0.12);
}

.campo textarea {
  min-height: 280px;

  resize: vertical;

  line-height: 1.5;
}

.ayuda {
  display: block;

  margin-top: 7px;

  color: #6b7280;

  font-size: 13px;
}

/* Acciones */

.acciones {
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 15px;

  margin-top: 30px;
  padding-top: 25px;

  border-top: 1px solid #e5e7eb;
}

.acciones button {
  padding: 12px 20px;

  border: none;

  border-radius: 8px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.acciones button:hover {
  transform: translateY(-2px);
}

/* Volver */

.btn-volver {
  background: #e5e7eb;

  color: #374151;
}

.btn-volver:hover {
  background: #d1d5db;
}

/* Guardar */

.btn-guardar {
  background: #2563eb;

  color: white;

  box-shadow:
    0 3px 8px
    rgba(37, 99, 235, 0.25);
}

.btn-guardar:hover {
  background: #1d4ed8;

  box-shadow:
    0 6px 14px
    rgba(37, 99, 235, 0.3);
}

/* Responsive */

@media (max-width: 600px) {

  .pagina {
    padding: 30px 15px;
  }

  .encabezado h1 {
    font-size: 28px;
  }

  .tarjeta {
    padding: 22px;
  }

  .identificadores {
    grid-template-columns: 1fr;
  }

  .acciones {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .acciones button {
    width: 100%;
  }
}
</style>