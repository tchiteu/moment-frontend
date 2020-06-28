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
          <h3 class="pt-4">Cadastro</h3>
          <v-form ref="form" class="px-12">
            
            <v-text-field
              v-model="nome"
              label="Nome Completo"
              :rules="nameRules"
              placeholder=" "
              required
            ></v-text-field>
          
            <div>
              <v-text-field
                v-model="usuario"
                prepend-icon="mdi-at"
                label="Usuário"
                :rules="userRules"
                placeholder=" "
                required
              ></v-text-field>
            </div>

            <v-select label="País" :items="paises" />
            
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="emailRules"
              placeholder=" "
              required
            ></v-text-field>

            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              placeholder=" "
              :rules="passRules"
              required
            ></v-text-field>
          </v-form>

          <v-btn
            color="success"
            class="mb-3"
            @click="cadastrar()"
          >
            Cadastrar
          </v-btn>
        </v-card>
        
        <v-card outlined class="card-links py-2">
          <router-link to="/login">Já tenho uma conta</router-link>
        </v-card>

      </v-col>
    </v-row>
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
      usuario: '',
      email: '',
      senha: '',

      momento: {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@matheus_santos"
      },

      reqRules: [v => !!v || 'Campo obrigatório.'],
      userRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length > 2 || 'Nome de usuário curto.',
        v => v.length < 12 || 'Nome de usuário muito longo.',
        v => this.verificaUsuario(v)
      ],
      nameRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length < 55 || 'Nome muito longo.',
      ],
      emailRules: [
        v => !!v || 'Campo obrigatório.',
        v => /.+@.+\..+/.test(v) || 'Esse e-mail não é válido.',
        v => v.length < 45 || 'E-mail muito longo.',
      ],
      passRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length > 5 || 'Senha fraca.',
        v => v.length < 25 || 'Senha muito longa.',
      ],

      paises: Paises,
    }
  },
  methods: {
    cadastrar() {
      if(!this.$refs.form.validate()) return false; 

      alert("realizou cadastro")
    },
    verificaUsuario(usuario) {
      console.log(this.usuarioExiste(usuario));
      // if(this.usuarioExiste(usuario)) {
      //   return "Nome de usuário já utilizado."
      // } else {
      //   return true;
      // }
    },
    async usuarioExiste(usuario) {
      if(usuario.length > 2 && usuario.length < 12) {
        await this.$axios.get(`/usuarios/verificar-usuario/${usuario}`)
          .then(retorno => {
            console.log(retorno);
            return retorno.data.existe;      
          });
      }
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
    max-width: 60%;
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
    max-width: 60%;
    min-width: 300px;
    margin: auto;
    background-color: #f9f9f9;
  }

  a {
    text-decoration: none;
  }
</style>