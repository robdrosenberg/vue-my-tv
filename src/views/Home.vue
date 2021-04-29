<template>
  <main>
    <div class="max-w-screen-lg px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-10 text-center"
      >
        Search your Favorite TV Shows
      </h2>
      <div class="">
        <form @submit.prevent="getShow" class="mt-8 mb-16 sm:mx-auto sm:flex">
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
          console.log("Show found?", this.show);
        } else {
          this.error = showSearch.Error;
          console.log("Show search error");
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
      console.log("Season?", seasonSearch);
      if (seasonSearch.Response === "True") {
        console.log("BEFRE?", this.season);
        this.season = { ...seasonSearch };
        this.episodes = await Promise.all(
          this.season.Episodes.map(async (episode) => {
            const episodeData = await this.getEpisode(episode.imdbID);
            console.log("EP DATA::??", episodeData);
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