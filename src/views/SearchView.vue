<template>
  <main class="h-full mt-16">
    <div class="flex row gap-8 flex-wrap">
      <div
        class="min-w-[210px] h-[340px] relative snap-start flex items-center"
        :data-testid="`show${selectedMovie?.id === show.id ? ' selected' : ''}`"
        v-for="show in shows"
        :key="show.id"
        @mouseenter="setSelectedMovie(show)"
      >
        <RouterLink
          :to="`/movie/${show.id}`"
          :class="`${show.id === selectedMovie?.id ? 'scale-110 transition' : ''} h-[295px]`"
        >
          <img v-if="show.image" :src="show.image.medium" :alt="show.name" />
          <img v-else src="../assets/no_cover_vertical.svg" :alt="show.name" />
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
const shows = ref<Movie[]>([]);
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
    shows.value = response.data.map((result) => result.show);
    selectedMovie.value = shows.value[0];
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
