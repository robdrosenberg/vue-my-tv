<template>
  <main>
    <div class="">
      <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-10"
        >
          Search your Favorite TV Shows
        </h2>
        <div>
          <form @submit.prevent="getEpisodes">
            <label for="title">TV Title: </label>
            <input
              type="text"
              class="mr-8"
              name="title"
              v-model="title"
              placeholder="Name of TV Show"
            />
            <label for="season">Season: </label>
            <input
              type="text"
              name="season"
              v-model="season"
              placeholder="Season #"
            />
            <button
              type="submit"
              class="bg-black text-white rounded ml-8 p-4 hover:bg-gray-200"
            >
              Search
            </button>
          </form>
          <h2 v-if="error">{{ error }}</h2>
          <EpisodeList :show="show" :episodes="episodes" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import EpisodeList from "@/components/EpisodeList.vue";
import firebase from "@/firebaseConfig";
import { mapState } from "vuex";

const db = firebase.firestore();

export default defineComponent({
  components: {
    EpisodeList,
  },
  data() {
    return {
      episodes: [],
      show: {},
      error: null,
      title: "",
      season: "",
    };
  },
  computed: {
    ...mapState(["favorites"]),
  },
  methods: {
    async getEpisodes() {
      const searchedShow = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&t=${
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
  },
});
</script>