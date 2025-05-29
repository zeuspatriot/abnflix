<template>
  <div class="h-full flex flex-col justify-around">
    <div class="absolute w-full h-full flex right-0 top-0">
      <div class="flex-1"></div>
      <img class="flex right-0 top-0" :src="movie?.image.original" alt="" />
      <div
        class="absolute z-30 h-[600px] left-[120px] w-[77%] right-0 top-0 bg-gradient-to-r from-black via-black"
      />
      <div
        class="absolute z-30 h-[70%] w-full right-0 bottom-0 bg-gradient-to-t from-black via-black"
      />
    </div>
    <div v-if="movie" class="w-full z-50">
      <div class="left-0 top-0 w-[50%]">
        <div class="z-40 text-white pt-20">
          <div class="text-[55px] font-semibold font-serif">{{ movie.name }}</div>
          <div class="flex items-center text-lg pt-4">
            <div>{{ new Date(movie.premiered).getUTCFullYear() }}</div>
            <div v-for="genre in movie.genres" :key="genre" class="relative">
              <span class="absolute left-[4px] -top-[28px] text-[40px]">.</span>
              <span class="pl-4">{{ genre }}</span>
            </div>
          </div>
        </div>
        <div class="text-white relative mt-4">{{ movie?.summary }}</div>
      </div>
    </div>

    <div class="text-white z-50 mt-8" v-if="seasons">
      <div class="my-4">
        <select class="mb-4 bg-gray-700 rounded-md p-2">
          <option
            class="bg-gray-700 p-2"
            v-for="(episodes, season) in seasons"
            :key="season"
            :value="season"
          >
            Season {{ season }}
          </option>
        </select>
        <div class="flex gap-4 flex-row overflow-x-hidden scroll-smooth snap-x" v-horizontalScroll>
          <div
            class="min-w-[250px] h-[140px] relative snap-start"
            v-for="episode in seasons[selectedSeason]"
            :key="episode.id"
          >
            <span class="absolute p-1 m-1 right-0 top-0 text-white bg-black opacity-75">{{
              `${episode.number} : ${episode.name}`
            }}</span>
            <img :src="episode.image.medium" :alt="episode.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Movie } from '@/types/movie';
import type { Episode } from '@/types/episode';

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

<style>
body {
  -webkit-overflow-scrolling: touch;
}
</style>
