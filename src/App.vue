<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data: () => ({
      pages_liberadas: ["/login", "/cadastro"],
    }),
    mounted() {
      this.verificaToken();
    },
    methods: {
      async verificaToken() {
        await this.$axios.get("/")
          .catch(() => {
            let redirect = true;

            for(let page of this.pages_liberadas) {
              if(window.location.pathname == page) {
                redirect = false;
              }
            }
          
            if(redirect) window.location.href = "/login";
          })
      }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Baloo+2&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('./style/global.css');

#app {
  font-family: 'Baloo 2', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
