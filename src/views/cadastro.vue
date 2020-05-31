<template>
  <v-app class="background">
    <Logo />
    <v-container>
      <v-row justify="center" class="container-cadastro">
        <v-col md="4" class="container-img">
          <v-img height="500px" src="https://source.unsplash.com/random">
            <div class="info-img">
              <p>@matheus_santos</p>
            </div>
          </v-img>
        </v-col>

        <v-col md="5" class="container-form">
          <v-form>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';

export default {  
  name: 'Cadastro',
  components: {
    Logo
  }
}

</script>

<style scoped>
  .background {
    background-color: #6F68BF;
    height: 100vh;
    width: 100vw;
  }
  .container-img {
    padding: 0;
    border: 2px solid black;
  }
  .container-form {
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid black;
    border-left: none;
    color: white;
  }
  .info-img {
    font-size: 13px;
    color: white;
    position: relative;
    text-align: left;
    top: 483px;
    width: 30%;
    border-top-right-radius: 10px;
    background-color: black;
  }
</style>