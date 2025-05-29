<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="w-full h-screen bg-black p-8 flex flex-col">
    <!-- <NavBar /> -->
    <div class="h-full">
      <RouterView />
    </div>
  </div>
</template>
