<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },
  beforeCreate(){
    this.$store.dispatch('getAcount')
  },
  methods: {
    
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>