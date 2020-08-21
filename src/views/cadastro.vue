<template>
  <v-app class="background">
    <v-row justify="center">
      <v-col 
        v-if="!mobile"
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
              v-model="usuario.nome"
              label="Nome Completo"
              :rules="nameRules"
              placeholder=" "
              required
            ></v-text-field>
          
            <v-text-field
              v-model="usuario.usuario"
              prepend-inner-icon="mdi-at"
              label="Usuário"
              :rules="userRules"
              :error-messages="(this.usuarioExiste) ? 'Nome de usuário já existente.' : ''"
              :loading="loadingUsuario"
              required
            ></v-text-field>

            <v-autocomplete
              label="País"
              v-model="usuario.pais"
              :items="paises"
              hide-no-data
            />
            
            <v-text-field
              v-model="usuario.email"
              label="E-mail"
              :rules="emailRules"
              placeholder=" "
              required
            ></v-text-field>

            <v-text-field
              v-model="usuario.senha"
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
import mixinGlobal from '../plugins/mixinGlobal';
import Logo from '../components/Logo';
import Paises from '../assets/paises.js';

export default {  
  mixins: [mixinGlobal],
  name: 'Cadastro',
  components: {
    Logo
  },
  data() {
    return {
      usuario: {
        nome: '',
        usuario: '',
        pais: '',
        email: '',
        senha: ''
      },

      usuarioExiste: false,
      loadingUsuario: false,  

      momento: {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@unsplash"
      },

      reqRules: [v => !!v || 'Campo obrigatório.'],
      userRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length > 2 || 'Nome de usuário curto.',
        v => v.length < 12 || 'Nome de usuário muito longo.',
      ],
      nameRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length < 55 || 'Nome muito longo.'
      ],
      emailRules: [
        v => !!v || 'Campo obrigatório.',
        v => /.+@.+\..+/.test(v) || 'Esse e-mail não é válido.',
        v => v.length < 45 || 'E-mail muito longo.'
      ],
      passRules: [
        v => !!v || 'Campo obrigatório.',
        v => v.length > 5 || 'Senha fraca.',
        v => v.length < 25 || 'Senha muito longa.'
      ],

      paises: Paises,
    }
  },
  watch: {
    'usuario.usuario'(val) {
      this.verificaUsuario(val);
    }
  },
  methods: {
    async cadastrar() {
      if(!this.$refs.form.validate() || this.usuarioExiste) return false; 

      const retorno = await this.$axios.post('usuarios', this.usuario)
        .catch((err) => {
          if(err.response.data) {
            this.$toasted.error(err.response.data.message);
          }
        })

      if(retorno) {
        if(retorno.data.codigo) {
          this.$toasted.success("Cadastrado com sucesso!");
          this.$router.push("/login");
        }
      }
    },
    async verificaUsuario(usuario) {
      if(usuario.length > 2 && usuario.length < 12) {
        this.loadingUsuario = true;

        let existe = await this.$axios.get(`/usuarios/verificar-usuario/${usuario}`);

        if(existe.data.existe) {
          this.usuarioExiste = true;
        } else {
          this.usuarioExiste = false;
        }

        this.loadingUsuario = false;
      } else {
        this.usuarioExiste = false;
      }
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