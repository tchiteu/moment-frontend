<template>
  <v-app>
    <v-app-bar
      color="deep-purple accent-4"
      fixed
      elevate-on-scroll
      dark
    >
      <v-app-bar-nav-icon
        @click="menuLateral = !menuLateral"
      />

      <v-spacer></v-spacer>

      <Logo :fontSize="(mobile) ? '30px' : '42px'" color="#474290"/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    
    <!-- Menu lateral -->
    <v-navigation-drawer v-model="menuLateral" fixed temporary>
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
          
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="lista-titulo">
                Início
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="abreModalMomento()">
            <v-list-item-icon>
              <v-icon>mdi-card-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="lista-titulo">
                Novo momento
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

    <!-- Lista de momentos -->
    <v-container fluid class="mt-md-12 mt-6">
      <v-row justify="center">
        <v-col cols="12">
          <div class="lista-momentos">
            <Momento
              v-for="(momento, index) in momentos"
              :key="index"
              :momento="momento"
              class="mt-12"
            />
          </div>
        </v-col>
      </v-row>
      
    </v-container>
    
    <!-- Modal de publicação de momentos -->
    <v-dialog v-model="modalMomento" max-width="600">
      <v-card>
        <v-icon class="modal-close pa-1" @click="modalMomento = false">
          mdi-close
        </v-icon>
        
        <v-form ref="form_momento" lazy-validation>
          <v-row class="mx-6" justify="center" no-gutters>
            <v-col cols="12" md="5" class="mt-4 mr-md-10">
              <v-text-field
                placeholder="Ex. Natal com a familia"
                label="Título do momento"
                v-model="novo_momento.titulo"
                :rules="rulesObrigatorio"
              />
            </v-col>

            <v-col cols="12" md="5" class="mt-4">
              <v-file-input
                :rules="rulesFoto"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Selecione uma foto"
                prepend-icon="mdi-camera"
                label="Foto do momento"
                v-model="novo_momento.pre_imagem"
                @change="fotoSelecionada(novo_momento.pre_imagem)"
              />
            </v-col>

            <v-col cols="12" md="11">
              <v-text-field
                placeholder="Ex. Salve Geral"
                label="Descrição do momento"
                v-model="novo_momento.descricao"
                :rules="rulesObrigatorio"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row no-gutters justify="center">
          <v-col cols="10">
            <Momento
              :momento="novo_momento"
            />
          </v-col>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="10">
            <v-btn 
              @click="publicar()"
              block
              class="my-2"
              color="success"
            >
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
import Logo from '../components/Logo.vue';
import mixinGlobal from '../plugins/mixinGlobal';

export default {
  name: 'inicio',
  components: {
    Momento,
    Logo
  },
  mixins: [mixinGlobal],
  data: function() {
    return {
      modalMomento: false,
      menuLateral: false,

      rulesFoto: [
        v => !!v || "Selecione uma foto",
        v => !v || v.size < 2000000 || "A foto deve ter menos de 2 mb"
      ],
      rulesObrigatorio: [ v => !!v || "Campo obrigatório" ],

      momentos:[],
      novo_momento: {
        pre_imagem: null,
        imagem: "",
        base64: "",
        titulo: "Exemplo",
        descricao: "Descrição de exemplo, apenas isso.",
        usuario: "@matheus_santos",
      }
    }
  },
  methods: {
    async publicar() {
      if(!this.$refs.form_momento.validate()) return false;

      let {titulo, descricao, base64} = this.novo_momento;

      const options = {
        titulo,
        descricao,
        base64
      }

      const retorno = await this.$axios.post("/momentos", options).catch(false);

      if(retorno) {
        this.modalMomento = false;
        this.$toasted.success("Momento publicado!");

        this.getMomentos();
      }
    },

    async getMomentos() {
      const retorno = await this.$axios.get("/momentos")
        .catch(err => {
          if(err) this.$toasted.error("Erro ao buscar os momentos.")
        });
      
      if(retorno) {
        this.momentos = retorno.data;
      }
    },

    abreModalMomento() {
      this.modalMomento = !this.modalMomento;
      this.menuLateral = false;
    },

    fotoSelecionada(foto) {
      const file = foto;
      
      if(!foto) { 
        this.novo_momento.imagem = "";
        return;
      }
      
      this.novo_momento.imagem = URL.createObjectURL(file);

      var reader = new FileReader();
      reader.readAsDataURL(foto); 

      reader.onloadend = () => {
        var base64data = reader.result;                
        this.novo_momento.base64 = base64data;
      }
    }
  },
  mounted() {
    this.getMomentos();
  }
}
</script>

<style scoped>
  .modal-close {
    right: 10px;
    top: 10px;
    position: absolute;
  }

  .lista-titulo {
    text-align: left;
  }

  .lista-momentos {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>