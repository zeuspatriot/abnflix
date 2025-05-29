<script setup lang="ts">
import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import Television from 'vue-material-design-icons/Television.vue';
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
</script>

<template>
  <div class="flex z-40 lg:items-center bg-transparent relative">
    <div class="flex flex-col lg:flex-row lg:h-[120px]">
      <div class="py-2 mx-10 my-6">
        <img src="../assets/ABN_SMALL.svg" height="40" width="40" :size="40" alt="Home" />
      </div>
      <div class="py-2 mx-10 my-6">
        <Magnify fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
      <div class="py-2 mx-10 my-6 border-b-4 border-b-red-500">
        <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
      <div class="py-2 mx-10 my-6">
        <TrendingUp fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
      <div class="py-2 mx-10 my-6">
        <Television fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
      <div class="py-2 mx-10 my-6">
        <MovieOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
      <div class="py-2 mx-10 my-6">
        <Plus fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>
