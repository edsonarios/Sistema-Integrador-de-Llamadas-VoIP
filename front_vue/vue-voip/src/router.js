import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import Contactos from './views/Contactos.vue';
import ContactosAgregar from './views/ContactosAgregar.vue';
import HistorialLlamadas from './views/HistorialLlamadas.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/'),
    },
    {
      path: '/Contactos',
      name: 'Contactos',
      component: Contactos,
    },
    {
      path: '/ContactosAgregar',
      name: 'ContactosAgregar',
      component: ContactosAgregar,
    },
    {
      path: '/Historial',
      name: 'HistorialLlamadas',
      component: HistorialLlamadas,
    }
  ],
});
