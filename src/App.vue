<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(localStorage.token);
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
