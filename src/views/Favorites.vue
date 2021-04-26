
<template>
  <main>
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <h1>Favorite Episodes</h1>
      <div>
        <p>Favs</p>
        <EpisodeList :episodes="favorites" />
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import EpisodeList from "@/components/EpisodeList.vue";

export default defineComponent({
  components: {
    EpisodeList,
  },
  data() {
    return {
      episodes: [],
    };
  },
  computed: {
    ...mapState(["favorites"]),
  },
});
</script>