import Vue from 'vue';
import Toasted from 'vue-toasted';

const options = {
  duration: 2000,
}

Vue.use(Toasted, options);

export default Toasted;