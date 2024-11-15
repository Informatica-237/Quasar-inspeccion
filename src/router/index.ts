import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from '../stores/datos'; // Importa el store de autenticación

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: routes, // Asegúrate de pasar el array 'routes' correctamente
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Guardia global para verificar la autenticación
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // Acceder al store de autenticación
    const isAuthenticated = !!authStore.token; // Verifica si el token existe

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/'); // Redirige al login si no está autenticado
    } else {
      next(); // Permite la navegación si está autenticado o la ruta no requiere autenticación
    }
  });

  return Router;
});
