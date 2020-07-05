<template>
  <v-app>
    <v-container fluid>
      <div class="lista-momentos">
        <Momento
          v-for="(momento, index) in momentos"
          :key="index"
          :momento="momento"
          class="ma-4"
        />
      </div>  

      <v-navigation-drawer class="menu-fixed" fixed right>
        <v-list>
          <v-list-item-group>
            <v-list-item inactive>
              <v-list-item-content>
                <v-list-item-title>
                  Matheus Santos
                </v-list-item-title>
                <v-list-item-subtitle>
                  Brazil
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider />
            
            <v-list-item 
              link v-for="(item, index) in menu"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icone }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="lista-titulo">
                  {{ item.titulo }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="#ff6347">SAIR</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-container>
  </v-app>
</template>

<script>
import Momento from '../components/Momento.vue';

export default {
  name: 'inicio',
  components: {
    Momento
  },
  data: () => ({
    momentos:[
      {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@matheus_santos",
        titulo: "Foto aleatória",
        descricao: "Uma foto aleatória, sabe? É random mesmo, vem direto da unsplash.com",
        curtidas: 302,
      },
      {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@giza",
        titulo: "Foto aleatória",
        descricao: "Uma foto aleatória, sabe? É random mesmo, vem direto da unsplash.com",
        curtidas: 302
      },
      {
        imagem: "https://source.unsplash.com/random/600x800",
        usuario: "@noix_guri",
        titulo: "Foto aleatória",
        descricao: "Uma foto aleatória, sabe? É random mesmo, vem direto da unsplash.com",
        curtidas: 302
      },
    ],
    menu: [
      {
        titulo: "Início",
        icone: "mdi-home"
      },
      {
        titulo: "Minha Conta",
        icone: "mdi-account"
      },
      {
        titulo: "Adicionar Amigos",
        icone: "mdi-account-plus"
      },
      {
        titulo: "Novo Momento",
        icone: "mdi-card-plus"
      }
    ]
  }),
}
</script>

<style scoped>
  .moments-feed {
    border: #ff6347 solid 1px;
    width: 100%;
    min-height: 92vh;
    height: 4000px;
  }
  .menu-fixed {
    width: 100%;
    min-height: 92vh;
  }

  .lista-titulo {
    text-align: left;
  }

  .lista-momentos {
    width: 100%;
    border: solid black 1px;
  }
</style>