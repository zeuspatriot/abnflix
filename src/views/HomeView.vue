<template>
  <main class="h-full">
    <section v-if="selectedMovie" class="h-[70%]">
      <MovieDescription :movie="selectedMovie" :height="600"></MovieDescription>
    </section>
    <section>
      <div class="text-white z-50 mt-8" v-if="genres">
        <div class="my-8 max-w-max" v-for="(movies, genre) in genres" :key="genre">
          <h1>{{ genre }}</h1>
          <div
            class="flex gap-12 flex-row overflow-x-hidden scroll-smooth snap-x"
            v-horizontalScroll
          >
            <div
              class="min-w-[210px] h-[340px] relative snap-start flex items-center"
              v-for="movie in movies"
              :key="movie.id"
              @mouseenter="setSelectedMovie(movie)"
            >
              <RouterLink
                :to="`/movie/${movie.id}`"
                :class="`${movie.id === selectedMovie?.id ? 'scale-110 transition' : ''} h-[295px]`"
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
import type { Movie } from '@/types/movie';
import MovieDescription from '@/components/MovieDescription.vue';

const genres = ref<{ [key: string]: { [key: string]: Movie } }>({});
const selectedMovie = ref<Movie>();

const setSelectedMovie = (movie: Movie) => {
  selectedMovie.value = movie;
};

onMounted(async () => {
  try {
    const response = await axios.get<Movie[]>('https://api.tvmaze.com/shows');
    selectedMovie.value = response.data[0];
    genres.value = response.data.reduce(
      (accum, currentMovie) => {
        const genre = currentMovie.genres[0] || 'Uncategorised';
        if (!accum[genre]) {
          accum[genre] = { [currentMovie.name]: currentMovie };
        }
        accum[genre][currentMovie.name] = currentMovie;

        return accum;
      },
      {} as { [key: string]: { [key: string]: Movie } },
    );
  } catch (error) {
    console.error('Error fetching movies', error);
  }
});
</script>
