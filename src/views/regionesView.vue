<template>
  <div class="pagina">

    <header class="encabezado">
      <p class="subtitulo">Sistema de regiones y comunas</p>
      <h1>Regiones de Chile</h1>
      <p class="descripcion">
        Selecciona una región para consultar las comunas que la componen.
      </p>
    </header>

    <main class="contenido">

      <div class="grid-regiones">

        <RouterLink
          v-for="region in regiones"
          :key="region.id"
          :to="`/region/${region.id}`"
          class="tarjeta-region"
        >
          <div class="numero-region">
            {{ region.id }}
          </div>

          <div class="informacion-region">
            <h2>{{ region.region }}</h2>
            <span>Ver región →</span>
          </div>
        </RouterLink>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { obtenerRegiones } from '../../services/api'

const regiones = ref<any[]>([])

onMounted(async () => {
  try {
    regiones.value = await obtenerRegiones()
  } catch (error) {
    console.error('Error al obtener las regiones:', error)
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

.grid-regiones {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Tarjetas */

.tarjeta-region {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 22px;

  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  color: inherit;
  text-decoration: none;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}

.tarjeta-region:hover {
  transform: translateY(-3px);

  border-color: #2563eb;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
}

/* Número */

.numero-region {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 48px;
  height: 48px;

  border-radius: 10px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 18px;
  font-weight: 700;
}

/* Información */

.informacion-region {
  min-width: 0;
}

.informacion-region h2 {
  margin: 0 0 6px;

  color: #1f2937;

  font-size: 18px;
}

.informacion-region span {
  color: #6b7280;
  font-size: 14px;
}

.tarjeta-region:hover .informacion-region span {
  color: #2563eb;
}

/* Responsive */

@media (max-width: 900px) {
  .grid-regiones {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .pagina {
    padding: 30px 15px;
  }

  .encabezado h1 {
    font-size: 28px;
  }

  .grid-regiones {
    grid-template-columns: 1fr;
  }
}
</style>