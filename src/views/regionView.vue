<template>
  <div class="pagina">

    <header class="encabezado">
      <p class="subtitulo">Sistema de regiones y comunas</p>

      <h1>
        {{ region?.region || 'Cargando región...' }}
      </h1>

      <p class="descripcion">
        Consulta las comunas pertenecientes a esta región.
      </p>
    </header>

    <main class="contenido">

      <div class="tarjeta-region">

        <div class="icono-region">
          🗺️
        </div>

        <div class="informacion">
          <span class="etiqueta">
            Región seleccionada
          </span>

          <h2>
            {{ region?.region || 'Cargando...' }}
          </h2>

          <p>
            Desde aquí puedes consultar las comunas
            asociadas a esta región.
          </p>
        </div>

        <button
          type="button"
          class="btn-comunas"
          @click="verComunas"
        >
          Ver comunas
          <span>→</span>
        </button>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerRegion } from '../../services/api'

const route = useRoute()
const router = useRouter()

const region = ref<any>(null)

onMounted(async () => {
  try {
    region.value = await obtenerRegion(
      Number(route.params.id)
    )
  } catch (error) {
    console.error(
      'Error al obtener la región:',
      error
    )
  }
})

const verComunas = () => {
  router.push(
    `/region/${route.params.id}/comuna`
  )
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
  margin: 0 auto 40px;
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

.tarjeta-region {
  display: flex;
  align-items: center;
  gap: 25px;

  padding: 30px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

/* Icono */

.icono-region {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 70px;
  height: 70px;

  border-radius: 14px;

  background: #eff6ff;

  font-size: 32px;
}

/* Información */

.informacion {
  flex: 1;
}

.etiqueta {
  color: #6b7280;

  font-size: 13px;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.informacion h2 {
  margin: 5px 0 8px;

  color: #1f2937;

  font-size: 24px;
}

.informacion p {
  margin: 0;

  color: #6b7280;

  line-height: 1.5;
}

/* Botón */

.btn-comunas {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 13px 20px;

  border: none;
  border-radius: 8px;

  background: #2563eb;
  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.25);

  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.btn-comunas:hover {
  background: #1d4ed8;

  transform: translateY(-2px);

  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
}

.btn-comunas span {
  font-size: 20px;
}

/* Responsive */

@media (max-width: 650px) {

  .pagina {
    padding: 30px 15px;
  }

  .encabezado h1 {
    font-size: 28px;
  }

  .tarjeta-region {
    flex-direction: column;
    align-items: stretch;

    text-align: center;
  }

  .icono-region {
    align-self: center;
  }

  .btn-comunas {
    justify-content: center;
  }
}
</style>