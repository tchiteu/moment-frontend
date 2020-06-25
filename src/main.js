import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Toasted from './plugins/toasted';
import vuetify from './plugins/vuetify';
import Axios from './plugins/axios';

Vue.prototype.$axios = Axios;

new Vue({
  Toasted,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
