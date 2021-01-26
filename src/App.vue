<template>
  <Navigation />
  
  <router-view/>
</template>

<script>
  import Navigation from './views/Navigation.vue'

  export default {
    components: {
      Navigation
    }
  }
</script>
