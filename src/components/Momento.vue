<template>
  <div>
    <v-card outlined class="momento-card">
      <v-img 
        v-if="momento.imagem"
        height="400px"
        :src="momento.imagem"
      >
        <div class="momento-usuario">{{ momento.usuario }}</div>
      </v-img>

      <v-img 
        v-else
        height="350px"
        src="../../public/photo_icon.png"
      >
        <div class="momento-usuario">{{ momento.usuario }}</div>
      </v-img>
      

      <v-card-title>{{ momento.titulo }}</v-card-title>

      <v-card-subtitle class="text-left">{{ momento.descricao }}</v-card-subtitle>

      <v-card-actions v-if="momento.curtidas">
        <v-icon class="mr-1">mdi-heart</v-icon>
        <span class="subheading mr-2">{{ momento.curtidas }}</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Momento",
  data: () => ({

  }),
  props: {
    momento: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
  .momento-card {
    width: 500px;
  }
  .momento-usuario {
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
</style>