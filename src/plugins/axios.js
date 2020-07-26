import Vue from 'vue';
import Axios from 'axios';

Vue.use(Axios);

export const httpd = Axios.create({
  baseURL: "http://192.168.1.10:3000",
  headers: {
    Authorization: localStorage.token
  }
})

export default httpd;
