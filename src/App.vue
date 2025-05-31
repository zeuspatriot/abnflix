<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="w-full min-h-full bg-black p-8 px-8 lg:px-[180px]">
    <NavBar />
    <RouterView />
  </div>
</template>
