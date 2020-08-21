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
        <Logo class="mt-12" color="black" fontSize="40px" />
        
        <v-card outlined class="card-form">
          <h3 class="pt-4">Login</h3>
          
          <v-form ref="form" lazy-validation class="px-12">
            <v-text-field
              v-model="email"
              label="E-mail"
              placeholder=" "
              @keyup.enter="login()"
              :rules="emailRules"
            ></v-text-field>

            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              placeholder=" "
              :rules="senhaRules"
              @keyup.enter="login()"
              required
            ></v-text-field>
          </v-form>

          <v-btn
            color="success"
            class="mb-3"
            :loading="loading"
            @click="login()"
          >
            ENTRAR
          </v-btn>
        </v-card>
        
        <v-card outlined class="card-links py-2">
          <!-- <router-link to="/recuperar">Esqueci minha senha</router-link> -->
          <a class="text-disable">Esqueci minha senha</a>
          <br v-if="breakpoint == 'xs'">
          <small v-else class="px-2"> • </small>
          <router-link to="/cadastro">Não tenho uma conta</router-link>
        </v-card>

      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';

export default {  
  name: 'Login',
  components: {
    Logo
  },
  data() {
    return {
      email: '',
      senha: '',
      loading: false,
      
      momento: {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@unsplash"
      },

      emailRules: [
        v => !!v || 'Campo obrigatório.',
        v => /.+@.+\..+/.test(v) || 'Esse e-mail não é válido.',
      ],
      senhaRules: [
        v => !!v || 'Campo obrigatório.',
      ],
    }
  },
  methods: {
    login() {
      if(!this.$refs.form.validate()) return false; 
      this.loading = true;

      const { email, senha } = this;

      const retorno = this.auth({ email, senha }).catch(err => {
        this.$toasted.error(err.response.data.message);
      });
      
      if(retorno) {
        setTimeout(() => this.$router.push('/'), 2000);
      }


      this.loading = false;
    },


    // Manipulação do token (deveria ser importado de outro arquivo)
    auth(data) {
      const auth = new Promise ((resolve, reject) => {
        this.$axios.post("/login", data)
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            resolve(resp)
          })
        .catch(err => {
          localStorage.removeItem('token')
          reject(err)
        })
      });
      
      return auth;
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