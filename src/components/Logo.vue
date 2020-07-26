<template>
  <h1 :style="css">Moment</h1>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: "white",
    },
    fontSize: {
      type: String,
      default: "40px"
    }
  },
  data() {
    return {
      css: `
        --cor:${this.color};
        --fontSize: ${this.fontSize};
      `
    }
  }
}
</script>

<style scoped>
  h1 {
    font-family: 'Pacifico', cursive;
    color: var(--cor);
    font-size: var(--fontSize);
    text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
  }
</style>