<template>
  <Navbar></Navbar>

  <!-- <RouterLink to="/" class="button">Notes</RouterLink> |
  <RouterLink to="/stats" class="button">Stats</RouterLink> -->
  <div class="container is-max-desktop px-2 py-4">
    <RouterView></RouterView>
  </div>
</template>


<script setup>
/* 
  import
*/
import Navbar from '@/components/layout/Navbar.vue';
import { onMounted } from 'vue';
import { useStoreAuth } from './stores/storeAuth';

const storeAuth = useStoreAuth();


onMounted(() => {
  storeAuth.init();
})


</script>


<style>
@import '../node_modules/bulma/css/bulma.min.css';
</style>
