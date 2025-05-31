<template>
  <main class="h-full mt-16">
    <div class="flex flex row gap-8 flex-wrap">
      <div
        class="min-w-[210px] h-[340px] relative snap-start flex items-center"
        v-for="movie in shows"
        :key="movie.show.id"
        @mouseenter="setSelectedMovie(movie.show)"
      >
        <RouterLink
          :to="`/movie/${movie.show.id}`"
          :class="`${movie.show.id === selectedMovie?.id ? 'scale-110 transition' : ''} h-[295px]`"
        >
          <img v-if="movie.show.image" :src="movie.show.image?.medium" :alt="movie.show.name" />
          <img v-else src="../assets/no_cover_vertical.svg" :alt="movie.show.name" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { Movie } from '@/types/movie';
import axios from 'axios';
import { onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const shows = ref<{ score: number; show: Movie }[]>([]);
const lastQuery = ref(route.params.query);
const selectedMovie = ref<Movie>();

const setSelectedMovie = (movie: Movie) => {
  selectedMovie.value = movie;
};
const search = async () => {
  try {
    const response = await axios.get<{ score: number; show: Movie }[]>(
      `https://api.tvmaze.com/search/shows?q=${route.params.query}`,
    );
    shows.value = response.data;
    selectedMovie.value = shows.value[0]?.show;
  } catch (error) {
    console.error('Error fetching routes', error);
  }
};
onUpdated(() => {
  if (route.params.query !== lastQuery.value) {
    search();
    lastQuery.value = route.params.query;
  }
});
onMounted(search);
</script>
