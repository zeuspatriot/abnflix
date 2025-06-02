<template>
  <main class="h-full">
    <section v-if="selectedMovie" class="h-[70%]">
      <MovieDescription :movie="selectedMovie" :height="600"></MovieDescription>
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
              :data-testid="`movie${selectedMovie?.id === movie.id ? ' selected' : ''}`"
              @mouseenter="setSelectedMovie(movie)"
            >
              <RouterLink
                :to="`/movie/${movie.id}`"
                :class="`${movie.id === selectedMovie?.id ? 'scale-110 transition' : ''} h-[295px]`"
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
import type { Movie } from '@/types/movie';
import MovieDescription from '@/components/MovieDescription.vue';

const genres = ref<{ [key: string]: Movie[] }>({});
const selectedMovie = ref<Movie>();

const setSelectedMovie = (movie: Movie) => {
  selectedMovie.value = movie;
};

onMounted(async () => {
  try {
    const response = await axios.get<Movie[]>('https://api.tvmaze.com/shows');
    selectedMovie.value = response.data[0];
    genres.value = Object.entries(
      response.data.reduce(
        (accum, currentMovie) => {
          const genre = currentMovie.genres[0] || 'Uncategorised';
          if (!accum[genre]) {
            accum[genre] = [currentMovie];
          }
          accum[genre].push(currentMovie);

          return accum;
        },
        {} as { [key: string]: Movie[] },
      ),
    ).reduce(
      (accum, [genre, movies]) => {
        accum[genre] = movies
          .sort((a, b) => {
            return b.rating.average - a.rating.average;
          })
          .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
        return accum;
      },
      {} as { [key: string]: Movie[] },
    );
  } catch (error) {
    console.error('Error fetching movies', error);
  }
});
</script>
