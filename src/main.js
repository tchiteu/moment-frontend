import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Axios from './plugins/axios';
import router from './router';
import VueToastify from "vue-toastify";

Vue.use(VueToastify);
/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.prototype.$axios = Axios;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
