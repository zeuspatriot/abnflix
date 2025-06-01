<template>
  <div v-if="movie" class="w-full z-50 flex flex-row justify-between h-[660px] gap-6">
    <div class="sm:w-[65%] w-full mt-80 sm:mt-0">
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
      <div class="text-white relative mt-4" v-html="movie?.summary"></div>
    </div>
    <img
      v-if="movie.image?.original"
      :src="movie.image.original"
      alt=""
      class="right-8 top-8 min-w-max max-w-[50%] max-h-[600px]"
    />
    <img
      v-else
      src="../assets/no_cover_vertical.svg"
      alt=""
      class="right-8 top-8 min-w-max max-w-[50%] max-h-[600px]"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Movie } from '../types/movie';

const { movie } = defineProps<{ movie: Movie }>();
</script>
