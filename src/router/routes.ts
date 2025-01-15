import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/loginPage.vue'),
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/infraccion', component: () => import('pages/Infraccion.vue') },
      { path: '/acta', component: () => import('pages/Acta.vue') },
      { path: '/home', component: () => import('pages/homePage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
