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
          id="searchBar"
          :class="`${searchActive || isSearchView ? 'w-60 border-1' : 'w-0'} text-white rounded-md pl-12 border-white`"
          type="text"
          placeholder="Search for show..."
          v-model="searchInput"
          @focus="setSearchActive(true)"
          @blur="setSearchActive(false)"
          @keyup="search"
        />
      </div>
      <RouterLink to="/" class="py-2 mx-10 my-6" exact-active-class="border-b-4 border-b-red-500">
        <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import debounce from 'lodash.debounce';
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import router from '@/router';

const route = useRoute();
const searchActive = ref(false);
const searchInput = ref('');
const isSearchView = ref(route.name === 'search');

const search = debounce(() => {
  if (!searchInput.value.trim()) {
    router.push(`/`);
  } else {
    router.push(`/search/${searchInput.value}`);
  }
}, 500);

const setSearchActive = (bool: boolean) => {
  searchActive.value = bool;
};

router.afterEach(() => {
  if (route.name === 'search') {
    isSearchView.value = true;
  } else {
    searchInput.value = '';
    isSearchView.value = false;
  }
});
</script>

<style scoped>
input#searchBar {
  background-image: url('../assets/searchicon.png');
  background-size: contain;
  background-repeat: no-repeat;
  transition: width 0.4s ease-in-out;
}
</style>
