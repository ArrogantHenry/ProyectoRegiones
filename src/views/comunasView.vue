<template>
  <div class="pagina">

    <header class="encabezado">
      <p class="subtitulo">
        Sistema de regiones y comunas
      </p>

      <h1>
        Comunas
      </h1>

      <p class="descripcion">
        Selecciona una comuna para consultar y modificar
        su información.
      </p>
    </header>

    <main class="contenido">

      <div
        v-if="comunas.length > 0"
        class="grid-comunas"
      >

        <RouterLink
          v-for="comuna in comunas"
          :key="comuna.id"
          :to="`/region/${route.params.id}/comuna/${comuna.id}`"
          class="tarjeta-comuna"
        >

          <div class="numero-comuna">
            {{ comuna.id }}
          </div>

          <div class="informacion-comuna">

            <h2>
              {{ comuna.comuna }}
            </h2>

            <span>
              Ver información →
            </span>

          </div>

        </RouterLink>

      </div>

      <div
        v-else
        class="sin-comunas"
      >
        <div class="icono-vacio">
          📍
        </div>

        <h2>
          No hay comunas disponibles
        </h2>

        <p>
          No se encontraron comunas para esta región.
        </p>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerComunas } from '../../services/api'

const route = useRoute()

const comunas = ref<any[]>([])

onMounted(async () => {
  try {
    const id = Number(route.params.id)

    comunas.value = await obtenerComunas(id)

  } catch (error) {
    console.error(
      'Error al obtener las comunas:',
      error
    )
  }
})
</script>

<style scoped>
.pagina {
  min-height: 100vh;
  padding: 45px 25px;
  background: #f4f6f8;
}

/* Encabezado */

.encabezado {
  max-width: 1100px;
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
  max-width: 1100px;
  margin: 0 auto;
}

/* Grid */

.grid-comunas {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;
}

/* Tarjetas */

.tarjeta-comuna {
  display: flex;
  align-items: center;

  gap: 18px;

  padding: 22px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  color: inherit;
  text-decoration: none;

  box-shadow:
    0 3px 10px
    rgba(0, 0, 0, 0.05);

  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}

.tarjeta-comuna:hover {
  transform: translateY(-3px);

  border-color: #2563eb;

  box-shadow:
    0 8px 20px
    rgba(0, 0, 0, 0.10);
}

/* Número */

.numero-comuna {
  display: flex;

  align-items: center;
  justify-content: center;

  min-width: 48px;
  height: 48px;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 17px;
  font-weight: 700;
}

/* Información */

.informacion-comuna {
  min-width: 0;
}

.informacion-comuna h2 {
  margin: 0 0 6px;

  color: #1f2937;

  font-size: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.informacion-comuna span {
  color: #6b7280;

  font-size: 14px;

  transition: color 0.2s;
}

.tarjeta-comuna:hover
.informacion-comuna span {
  color: #2563eb;
}

/* Sin comunas */

.sin-comunas {
  padding: 60px 20px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  text-align: center;

  box-shadow:
    0 3px 10px
    rgba(0, 0, 0, 0.05);
}

.icono-vacio {
  margin-bottom: 15px;

  font-size: 40px;
}

.sin-comunas h2 {
  margin: 0 0 8px;

  color: #1f2937;
}

.sin-comunas p {
  margin: 0;

  color: #6b7280;
}

/* Responsive */

@media (max-width: 900px) {

  .grid-comunas {
    grid-template-columns:
      repeat(2, 1fr);
  }
}

@media (max-width: 600px) {

  .pagina {
    padding: 30px 15px;
  }

  .encabezado h1 {
    font-size: 28px;
  }

  .grid-comunas {
    grid-template-columns: 1fr;
  }
}
</style>