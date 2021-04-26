<template>
  <div>
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
            @click="removeFavorite(index)"
            v-if="episode.favorite"
            class="h-5 w-5 cursor-pointer text-red-500"
          />
          <HeartIconOutline
            @click="addFavorite(index)"
            v-else
            class="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/solid";
import firebase from "@/firebaseConfig";

const db = firebase.firestore();

export default defineComponent({
  components: {
    HeartIconOutline,
    HeartIconSolid,
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
  },
  methods: {
    async addFavorite(episodeId) {
      this.episodes[episodeId]["favorite"] = true;
      const addEpisode = this.episodes[episodeId];
      db.collection("favorites")
        .add({ ...addEpisode })
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
            console.log(this.deleteDocID, " =>", doc.data());
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