<template>
  <div class="w-full lg:max-w-full lg:flex">
    <div
      class="h-80 lg:h-auto lg:w-52 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="{
        backgroundImage: `url(${
          episode.Poster === 'N/A' ? show.Poster : episode.Poster
        })`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }"
    ></div>
    <div
      class="my-4 lg:my-8 border-gray-400 lg:border-l-0 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="pl-4 mb-4">
        <p class="text-gray-600 mb-2" v-if="displayTitle">
          {{ episode.showTitle }}
        </p>
        <div class="text-gray-900 font-bold text-2xl mb-4">
          Episode {{ episode.Episode }}: {{ episode.Title }}
        </div>
        <p class="font-bold text-base mb-2">
          {{ episode.Year }} ‧ {{ episode.imdbRating }} IMDB Rating ‧
          {{ episode.Runtime }}
        </p>
        <p class="text-gray-600 overflow-ellipsis">
          {{ episode.Plot }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    episode: {
      type: Object,
      default: {},
    },
    show: {
      type: Object,
      default: {},
    },
    displayTitle: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
