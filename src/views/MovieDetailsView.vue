<template>
  <div class="min-h-full">
    <section v-if="movie" class="h-[70%]">
      <MovieDescription :movie></MovieDescription>
    </section>
    <div></div>
    <section>
      <div class="text-white z-50 mt-8 h-[30%]" v-if="seasons">
        <div class="my-4">
          <select class="mb-4 bg-gray-700 rounded-md p-2" v-model="selectedSeason">
            <option
              class="bg-gray-700 p-2"
              v-for="(episodes, season) in seasons"
              :key="season"
              :value="season"
            >
              Season {{ season }}
            </option>
          </select>
          <div
            class="flex gap-4 flex-row overflow-x-hidden scroll-smooth snap-x"
            v-horizontalScroll
          >
            <div
              class="min-w-[250px] h-[140px] relative snap-start"
              v-for="episode in seasons[selectedSeason]"
              :key="episode.id"
            >
              <span class="absolute p-1 m-1 right-0 top-0 text-white bg-black opacity-75">{{
                `${episode.number} : ${episode.name}`
              }}</span>
              <img v-if="episode.image" :src="episode.image?.medium" :alt="episode.name" />
              <img v-else src="../assets/no_cover.svg" :alt="episode.name" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Movie } from '@/types/movie';
import type { Episode } from '@/types/episode';
import MovieDescription from '@/components/MovieDescription.vue';

const route = useRoute();

const movie = ref<Movie>();
const seasons = ref<{ [key: string]: Episode[] }>({});
const selectedSeason = ref<number>(1);

onMounted(async () => {
  try {
    const moviesResp = await axios.get(`https://api.tvmaze.com/shows/${route.params.id}`);
    movie.value = moviesResp.data;
    const episodesResp = await axios.get<Episode[]>(
      `https://api.tvmaze.com/shows/${route.params.id}/episodes`,
    );
    seasons.value = episodesResp.data.reduce(
      (accum, currentEpisode) => {
        if (accum[currentEpisode.season]) {
          accum[currentEpisode.season].push(currentEpisode);
        } else {
          accum[currentEpisode.season] = [currentEpisode];
        }
        return accum;
      },
      {} as { [key: string]: Episode[] },
    );
  } catch (error) {
    console.error('Error fetching movie.', error);
  }
});
</script>
