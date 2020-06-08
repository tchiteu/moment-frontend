import Vue from 'vue';
import VueRouter from 'vue-router';

// COMPONENTES
import inicio from '../views/inicio.vue';
import login from '../views/login.vue';
import cadastro from '../views/cadastro.vue';
// import page_404 from '../views/page_404';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: inicio
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: cadastro
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
