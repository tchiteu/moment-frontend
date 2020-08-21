import Vue from 'vue';
import Axios from 'axios';

Vue.use(Axios);

const httpd = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization:  localStorage.getItem('token')
  },
});

httpd.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token || '';
  return config;
});

export default httpd;
