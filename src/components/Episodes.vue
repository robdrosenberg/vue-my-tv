<script lang="ts">
import { defineComponent } from "vue";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    HeartIconOutline,
    HeartIconSolid,
  },
  data() {
    return {
      title: "",
      season: "",
      show: {},
      episodes: [],
      error: "",
    };
  },
  methods: {
    async getEpisodes() {
      const searchedShow = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&t=${
          this.title
        }&Season=${this.season}`
      ).then((response) => response.json());
      if (searchedShow.Response) {
        this.show = { ...searchedShow };
        this.episodes = searchedShow.Episodes.map((episode) => {
          return { ...episode, favorite: false };
        });
      } else {
        this.error = searchedShow.Error;
      }
    },
    toggleFavorite(episodeId) {
      this.episodes[episodeId]["favorite"] = !this.episodes[episodeId][
        "favorite"
      ];
    },
  },
});
</script>

<template>
  <div>
    <label for="title">TV Title: </label>
    <input
      type="text"
      class="mr-8"
      name="title"
      v-model="title"
      placeholder="Name of TV Show"
    />
    <label for="season">Season: </label>
    <input type="text" name="season" v-model="season" placeholder="Season #" />
    <button @click="getEpisodes" class="rounded ml-8 p-4 hover:bg-gray-200">
      Search
    </button>
  </div>
  <div>
    <h2 v-if="error">{{ error }}</h2>
    <div>
      <h1
        class="mt-16 text-2xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-10"
      >
        Season {{ show.Season }} Episodes
      </h1>
      <div
        :key="index"
        v-for="(episode, index) in episodes"
        class="p-4 bg-gray-100 mb-4 grid grid-cols-3 items-center w-1/2 rounded-md"
      >
        <div class="col-span-2">
          <h1>Episode {{ episode.Episode }}: {{ episode.Title }}</h1>
          <p>{{ episode.Released }}</p>
          <p>{{ episode.imdbRating }} IMDB Rating</p>
        </div>
        <div class="col-start-3">
          <HeartIconSolid
            @click="toggleFavorite(index)"
            v-if="episode.favorite"
            class="h-5 w-5 cursor-pointer text-red-500"
          />
          <HeartIconOutline
            @click="toggleFavorite(index)"
            v-else
            class="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>