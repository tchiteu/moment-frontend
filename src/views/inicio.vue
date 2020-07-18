<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="9">
          <div class="lista-momentos ml-12">
            <Momento
              v-for="(momento, index) in momentos"
              :key="index"
              :momento="momento"
              class="my-12"
            />
          </div>
        </v-col>
        <v-col cols="3">
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
                  @click="item.funcao"
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
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="modalMomento" max-width="600">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12">

          </v-col>
        </v-row>

        <v-row class="mx-6" justify="center" no-gutters>
          <v-col cols="5" class="mt-4">
            <v-text-field
              placeholder="Ex. Natal com a familia"
              label="Título do momento"
              v-model="novo_momento.titulo"
            />
          </v-col>
          <v-col cols="5" class="ml-8 mt-4">
            <v-file-input
              :rules="rulesMomento"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Selecione uma foto"
              prepend-icon="mdi-camera"
              label="Foto do momento"
              v-model="novo_momento.pre_imagem"
              @change="fotoSelecionada(novo_momento.pre_imagem)"
            />
          </v-col>

          <v-col cols="11" class="ml-2">
             <v-text-field
              placeholder="Ex. Salve Geral"
              label="Descrição do momento"
              v-model="novo_momento.descricao"
            ></v-text-field>
          </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="10">
          <Momento
            :momento="novo_momento"
          />
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="10">
          <v-btn block class="my-2" color="success">
            Publicar
          </v-btn>
        </v-col>
      </v-row>

      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Momento from '../components/Momento.vue';

export default {
  name: 'inicio',
  components: {
    Momento
  },
  data: function() {
    return {
      modalMomento: false,
      rulesMomento: [
        value => !value || value.size < 2000000 || 'A foto deve ter menos de 2 mb.',
      ],
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
          icone: "mdi-card-plus",
          funcao:() => this.modalMomento = !this.modalMomento
        }
      ],
      novo_momento: {
        pre_imagem: null,
        imagem: "",
        titulo: "Exemplo",
        descricao: "Descrição de exemplo, apenas isso.",
        usuario: "@matheus_santos",
      }
    }
  },
  methods: {
    fotoSelecionada(foto) {
      const file = foto;
      this.novo_momento.imagem = URL.createObjectURL(file);
    }
  }
}
</script>

<style scoped>
  .menu-fixed {
    width: 100%;
    min-height: 92vh;
  }

  .lista-titulo {
    text-align: left;
  }

  .lista-momentos {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .canvas-momento {
    border: solid 1px black;
    width: 400px;
    height: 400px;
  }
</style>