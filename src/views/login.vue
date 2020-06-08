<template>
  <v-app>
    <v-row justify="center">
      <v-col 
        v-if="breakpoint != 'xs' && 'sm'"
        md="5"
        class="pa-0"
      >
        <v-img class="container-img" :src="momento.imagem">
          <div class="info-img">
            {{ momento.usuario }}
          </div>
        </v-img>
      </v-col>

      <v-col md="7" xs="12" class="container-form">
        <Logo class="mt-2" color="black" fontSize="40px" />
        
        <v-card outlined class="card-form">
          <h3 class="pt-4">Login</h3>
          
          <v-form class="px-12">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              required
            ></v-text-field>
          </v-form>

          <v-btn
            color="success"
            class="mb-3"
          >
            ENTRAR
          </v-btn>
        </v-card>
        
        <v-card outlined class="card-links py-2">
          <router-link to="/recuperar">Esqueci minha senha</router-link>
          <small class="px-2"> • </small>
          <router-link to="/cadastro">Não tenho uma conta</router-link>
        </v-card>

      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';
import Paises from '../assets/paises.js';

export default {  
  name: 'Login',
  components: {
    Logo
  },
  data() {
    return {
      nome: '',
      usuario: '',
      email: '',
      senha: '',

      momento: {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@matheus_santos"
      },

      paises: Paises,
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    }
  }
}
</script>

<style scoped>
  .card-form {
    max-width: 50%;
    min-width: 300px;
    margin: 40px auto 10px auto;
    background-color: white;
  }

  .container-img {
    max-height: 100vh;
  }

  .container-form {
    border-left: 1px solid black;
    background-color: #f9f9f9;
    padding: 0;
  }

  .info-img {
    font-size: 1vw;
    color: white;
    position: relative;
    float: left;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 0 20px;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .card-links {
    max-width: 50%;
    min-width: 300px;
    margin: auto;
    background-color: #f9f9f9;
  }

  a {
    text-decoration: none;
  }
</style>