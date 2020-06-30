export default {
  computed: {
    mobile() {
      let bp =  this.$vuetify.breakpoint.name;    
      if(bp == 'xs' || bp == 'sm') return true;
      return false;
    }
  }
}