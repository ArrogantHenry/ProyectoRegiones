import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/region'
    },
    {
      path: '/region/',
      name: 'regiones',
      component: () => import('../views/regionesView.vue')
    },
    {
      path: '/region/:id',
      name: 'region',
      component: () => import('../views/regionView.vue')
    },
    {
      path: '/region/:id/comuna/',
      name: 'comunas',
      component: () => import('../views/comunasView.vue')
    },
    {
      path: '/region/:id/comuna/:idComuna',
      name: 'comunaDetalle',
      component: () => import('../views/ComunaView.vue')
    }

  ]
})


export default router


//{
//    path: '/region/:idRegion/comuna/:idComuna/editar';
//    name: 'editar-comuna';
//    component: () => import('../views/editarComunaView.vue')
//}

