import Vue from 'vue';
import Axios from 'axios';

Vue.use(Axios);

export const httpd = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: localStorage.token
  }
})

export default httpd;
