<template>
  <div
    class="absolute top-0 right-0 flex justify-between z-40 w-full lg:items-center bg-transparent"
  >
    <RouterLink to="/">
      <div class="py-2 mx-10 my-6 flex gap-8">
        <img src="../assets/ABN_SMALL.svg" height="40" width="40" :size="40" alt="Home" />
        <h1 class="text-white text-4xl font-semibold font-serif">ABN-Flix</h1>
      </div>
    </RouterLink>
    <div class="flex flex-row h-[120px]">
      <div :class="`py-2 mx-10 my-6 flex`">
        <input
          class="w-60 rounded-md p-2 border-2 border-white bg-gray-500"
          src="../assets/searchicon.png"
          type="text"
          v-model="search"
        />
        <Magnify
          @click="toggleSearchActive"
          fillColor="#FFFFFF"
          :size="40"
          class="cursor-pointer"
        />
      </div>
      <RouterLink to="/" class="py-2 mx-10 my-6" exact-active-class="border-b-4 border-b-red-500">
        <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import debounce from 'lodash.debounce';
import { RouterLink, Router } from 'vue-router';
import { ref, watch } from 'vue';
import router from '@/router';

const searchActive = ref(false);
const search = ref('');

watch(
  search,
  debounce(() => {
    if (!search.value.trim()) {
      router.push(`/`);
    } else {
      router.push(`/search/${search.value}`);
    }
  }, 500),
);

const toggleSearchActive = () => {
  searchActive.value = !searchActive.value;
};
</script>
