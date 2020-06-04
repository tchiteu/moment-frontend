<template>
  <v-app class="background">
    <Logo />
    <v-container>
      <v-row justify="center" class="container-cadastro">
        <v-col md="4" class="container-img">
          <v-img height="500px" :src="momento.url">
            <div class="info-img">
              {{ momento.usuario }}
            </div>
          </v-img>
        </v-col>

        <v-col md="4" class="container-form">
          <div class="info-pagina">Cadastro</div>
          
          <v-form class="px-2">
            <v-row >
              <v-col class="pa-0 mt-4 mr-4">
                <v-text-field
                  v-model="nome"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="pa-0 mt-4">
                <v-text-field
                  v-model="sobrenome"
                  label="Sobrenome"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            
            <div class="input-menor">
              <v-text-field
                v-model="usuario"
                prepend-icon="mdi-at"
                label="Usuario"
                required
              ></v-text-field>
            </div>

            <v-select label="País" :items="paises" />
            
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

            <v-btn
              
              color="success"
              class="mr-4"
              @click="validate"
            >
              Cadastrar
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';
import Paises from '../assets/paises.js';

export default {  
  name: 'Cadastro',
  components: {
    Logo
  },
  data() {
    return {
      nome: '',
      sobrenome: '',
      email: '',

      momento: {
        url: "https://source.unsplash.com/random",
        usuario: "@matheus_santos"
      },

      paises: Paises,
    }
  }
}

</script>

<style scoped>
  .background {
    background-color: #6F68BF;
    background-image: url('../assets/background.jpg');
    height: 100vh;
    width: 100vw;
  }

  .container-img {
    padding: 0;
    border: 1px solid #000;
  }

  .container-form {
    background-color: #00000010;
    border: 1px solid #000;
    border-left: none;
    background-color: white;
    padding: 0;
  }

  .info-img {
    font-size: 13px;
    color: white;
    position: relative;
    text-align: left;
    float: left;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    padding: 0 4px;
    top: 483px;
    border-top-right-radius: 10px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .info-pagina {
    font-size: 19px;
    color: white;
    position: relative;
    text-align: right;
    float: right;
    border-left: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    padding: 0 4px;
    border-bottom-left-radius: 10px;
    background-color: #00000080;
  }

  .input-menor {
    width: 300px;
  }
</style>