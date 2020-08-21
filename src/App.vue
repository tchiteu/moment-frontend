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
    async mounted() {
      await this.verificaToken();

      this.callback();
    },
    methods: {
      async verificaToken() {
        let redirect = true;

        for(let page of this.pages_liberadas) {
          if(window.location.pathname == page) {
            redirect = false;
          }
        }
        
        if(redirect) await this.$axios.get("/")
          .catch(() => {
            this.$toasted.error("Inicie uma sessão para entrar!")
            this.$router.push('/login');
            return;
          })
      },
      callback() {
        if(this.$route.query.callback_error) {
          this.$toasted.error(this.$route.query.callback_error);
        }
        else if(this.$route.query.callback_success) {
          this.$toasted.success(this.$route.query.callback_success);
        }
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
