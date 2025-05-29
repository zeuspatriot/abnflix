<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import type { Movie } from '@/types/movie';

const movies = ref<Movie[]>([]);
onMounted(async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows');
    movies.value = response.data;
  } catch (error) {
    console.error('Error fetching movies', error);
  }
});
</script>

<template>
  <main class="flex flex-col">
    <div v-for="movie in movies" :key="movie.id" class="text-white relative">
      <RouterLink :to="`/movie/${movie.id}`">
        {{ movie.name }}
      </RouterLink>
    </div>
  </main>
</template>
