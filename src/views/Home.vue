<template>
  <main>
    <div class="main-container">
      <h1 class="main-heading">Search Your Favorite TV Shows</h1>
      <div class="">
        <form
          @submit.prevent="getShow"
          class="mt-8 mb-4 sm:mb-16 sm:mx-auto sm:flex"
        >
          <div class="min-w-0 flex-1">
            <label for="title" class="sr-only">Enter Show Title</label>
            <input
              id="title"
              type="text"
              v-model="title"
              class="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus: focus:ring-offset-2 focus:ring-black"
              placeholder="Enter Show Title"
            />
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              class="block w-full rounded-md border border-transparent px-5 py-3 bg-black text-base font-medium text-white shadow hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:px-10"
            >
              Search
            </button>
          </div>
        </form>

        <Alert v-if="error" :error="error" />
        <ShowCard v-if="Object.keys(show).length > 0" :show="show" />
        <SeasonTab :tabs="tabs" @get-season="getSeason" />
        <EpisodeList :show="show" :episodes="episodes" />
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import EpisodeList from "@/components/EpisodeList.vue";
import ShowCard from "@/components/ShowCard.vue";
import SeasonTab from "@/components/SeasonTab.vue";
import Alert from "@/components/Alert.vue";
import firebase from "@/firebaseConfig";
import { mapState } from "vuex";

const db = firebase.firestore();

export default defineComponent({
  components: {
    Alert,
    EpisodeList,
    SeasonTab,
    ShowCard,
  },
  data() {
    return {
      episodes: [],
      show: {},
      error: null,
      title: "",
      season: {},
      testing: "",
    };
  },
  computed: {
    ...mapState(["favorites"]),
    tabs() {
      if (this.show.totalSeasons) {
        return [...Array(parseInt(this.show.totalSeasons))].map(
          (_, i) => i + 1
        );
      }
      return [];
    },
  },
  methods: {
    async getShow() {
      this.error = null;
      this.show = {};
      if (this.title) {
        const showSearch = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&t=${
            this.title
          }&type=series`
        ).then((response) => response.json());
        if (showSearch.Response === "True") {
          this.show = { ...showSearch };
        } else {
          this.error = showSearch.Error;
        }
      } else {
        this.error = "Invalid Search, Please Try again";
      }
    },
    async getEpisode(imdbID) {
      const episode = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}
        &i=${imdbID}&type=episode`
      ).then((response) => response.json());
      return episode;
    },
    async getSeason(seasonNumber) {
      this.error = null;
      const seasonSearch = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&t=${
          this.title
        }&Season=${seasonNumber}`
      ).then((response) => response.json());
      if (seasonSearch.Response === "True") {
        this.season = { ...seasonSearch };
        this.episodes = await Promise.all(
          this.season.Episodes.map(async (episode) => {
            const episodeData = await this.getEpisode(episode.imdbID);
            return episodeData;
          })
        );
      } else {
        this.error = seasonSearch.Error;
      }
    },
  },
});
</script>