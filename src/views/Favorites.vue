
<template>
  <main>
    <div class="main-container">
      <h1 class="main-heading">My Favorites</h1>
      <div>
        <EpisodeList :episodes="favorites" :favoriteList="true" />
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