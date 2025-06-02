<template>
  <main class="h-full">
    <section v-if="selectedShow" class="h-[70%]">
      <MovieDescription :show="selectedShow" :height="600"></MovieDescription>
    </section>
    <section>
      <div class="text-white z-50 mt-8" v-if="genres">
        <div
          class="my-8 max-w-max"
          data-testid="genre"
          :data-genre="genre"
          v-for="(movies, genre) in genres"
          :key="genre"
        >
          <h1>{{ genre }}</h1>
          <div
            class="flex gap-12 flex-row overflow-x-hidden scroll-smooth snap-x"
            v-horizontalScroll
          >
            <div
              class="min-w-[210px] h-[340px] relative snap-start flex items-center"
              v-for="movie in movies"
              :key="movie.id"
              :data-testid="`movie${selectedShow?.id === movie.id ? ' selected' : ''}`"
              @mouseenter="setSelectedShow(movie)"
            >
              <RouterLink
                :to="`/movie/${movie.id}`"
                :class="`${movie.id === selectedShow?.id ? 'scale-110 transition' : ''} h-[295px]`"
              >
                <span
                  class="absolute p-1 m-1 right-0 top-0 text-white bg-black opacity-75"
                  v-if="movie.rating?.average"
                  >Rating: {{ movie.rating.average }}</span
                >
                <img v-if="movie.image" :src="movie.image?.medium" :alt="movie.name" />
                <img v-else src="../assets/no_cover_vertical.svg" :alt="movie.name" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import type { Show } from '@/types/movie';
import MovieDescription from '@/components/MovieDescription.vue';

const genres = ref<{ [key: string]: Show[] }>({});
const selectedShow = ref<Show>();

const setSelectedShow = (movie: Show) => {
  selectedShow.value = movie;
};

onMounted(async () => {
  try {
    const response = await axios.get<Show[]>('https://api.tvmaze.com/shows');
    selectedShow.value = response.data[0];

    const genreMap: { [key: string]: Show[] } = {};
    for (const show of response.data) {
      const genre = show.genres[0] || 'Uncategorised';
      if (!genreMap[genre]) {
        genreMap[genre] = [];
      }

      if (!genreMap[genre].some((m) => m.id === show.id)) {
        genreMap[genre].push(show);
      }
    }

    Object.keys(genreMap).forEach((genre) => {
      genreMap[genre].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    });

    genres.value = genreMap;
  } catch (error) {
    console.error('Error fetching shows', error);
  }
});
</script>
