
<template>
  <main>
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <h1
        class="text-2xl text-center font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-10"
      >
        My Favorites
      </h1>
      <div>
        <EpisodeList :episodes="favorites" favoriteList="true" />
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