<template>
  <div v-if="movie" :class="`w-full z-50 flex flex-row justify-between h-[${height || 600}px]`">
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
      :src="movie.image.original"
      alt=""
      class="right-8 top-8 min-w-[300px] max-w-[50%] max-h-[800px]"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Movie } from '../types/movie';

const { movie } = defineProps<{ movie: Movie; height?: number }>();
</script>
