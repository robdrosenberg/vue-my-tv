<template>
  <div class="w-full lg:max-w-full lg:flex">
    <div
      class="h-96 lg:h-auto lg:w-52 flex-none bg-cover rounded-tr rounded-bl-none rounded-br-none rounded-tl lg:rounded-tr-none text-center overflow-hidden"
      :style="{ backgroundImage: `url(${show.Poster})` }"
    ></div>
    <div
      class="py-16 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b-none lg:rounded-tr p-4 flex flex-col justify-between leading-normal"
    >
      <div class="pl-4 mb-8">
        <div class="text-gray-900 font-bold text-2xl mb-4">
          {{ show.Title }}
        </div>
        <p class="font-bold text-base mb-2">
          {{ show.Year }} ‧ {{ show.Genre }} ‧ {{ show.totalSeasons }} Seasons
        </p>
        <p class="text-gray-600">{{ show.Plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: Object,
    default: {},
  },
});
</script>
