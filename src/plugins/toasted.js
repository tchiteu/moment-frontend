import Vue from 'vue';
import Toasted from 'vue-toasted';

const options = {
  duration: 3500,
  position: "bottom-right"
}

Vue.use(Toasted, options);

export default Toasted;