<template>
  <div>
    <div>
      <ul class="space-y-3 mt-3">
        <li
          v-for="(episode, index) in episodes"
          :key="index"
          class="flex flex-col lg:flex-row pr-4 lg:items-center bg-white shadow overflow-hidden sm:rounded-md"
        >
          <!-- Your content -->
          <EpisodeItem
            :episode="episode"
            :show="show"
            :displayTitle="favoriteList"
          />
          <div class="px-8 pb-4">
            <HeartIconSolid
              @click="removeFavorite(index)"
              v-if="isFavorited(episode.imdbID)"
              class="favorite-icon text-red-500"
            />
            <HeartIconOutline
              @click="addFavorite(index, show.Title)"
              v-else
              class="favorite-icon"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/solid";
import firebase from "@/firebaseConfig";
import { mapState } from "vuex";
import EpisodeItem from "@/components/EpisodeItem.vue";

const db = firebase.firestore();

export default defineComponent({
  components: {
    HeartIconOutline,
    HeartIconSolid,
    EpisodeItem,
  },
  props: {
    episodes: {
      type: Array,
      default: [],
    },
    show: {
      type: Object,
      default: {},
    },
    favoriteList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["favorites"]),
    favoriteSet() {
      return new Set(this.favorites.map((favorite) => favorite.imdbID));
    },
  },
  methods: {
    isFavorited(imdbID) {
      return this.favoriteSet.has(imdbID);
    },
    async addFavorite(episodeId, showTitle) {
      this.episodes[episodeId]["favorite"] = true;
      const addEpisode = this.episodes[episodeId];
      db.collection("favorites")
        .add({ ...addEpisode, showTitle })
        .then(() => {
          console.log("Document Succesfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    async removeFavorite(episodeId) {
      this.episodes[episodeId]["favorite"] = false;
      const removeEpisode = this.episodes[episodeId];
      const deleteDocID = "";
      await db
        .collection("favorites")
        .where("imdbID", "==", removeEpisode.imdbID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.deleteDocID = doc.id;
          });
        })
        .then(() => {
          db.collection("favorites")
            .doc(this.deleteDocID)
            .delete()
            .then(() => {
              console.log("Document Succesfully deleted");
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
});
</script>