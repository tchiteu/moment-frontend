<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="9">
          <div class="moments-feed"></div>
        </v-col>

        <v-col cols="3">
          <v-navigation-drawer class="menu-fixed" dark fixed right>
            <v-list>
              <v-list-item-group>
                <v-list-item>
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
                
                <v-list-item link v-for="(item, index) in menu" :key="index">
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
                <v-btn block>SAIR</v-btn>
              </div>
            </template>
          </v-navigation-drawer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'inicio',
  data: () => ({
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
    border: tomato solid 1px;
    width: 100%;
    min-height: 92vh;
    height: 4000px;
  }
  .menu-fixed {
    width: 100%;
    min-height: 92vh
  }

  .lista-titulo {
    text-align: left;
    margin-left: 30px;
  }
</style>