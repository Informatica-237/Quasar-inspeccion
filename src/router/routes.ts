import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/infraccion', component: () => import('pages/Infraccion.vue') },
      { path: '/acta', component: () => import('pages/Acta.vue') }
    ],
  },

  // Siempre deja esto al final,
  // pero lo puedes remover si es necesario
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
