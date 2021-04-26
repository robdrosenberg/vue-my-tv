
<template>
  <main>
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <h1>Favorite Episodes</h1>
      <div>
        <p>Favs</p>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      episodes: [],
    };
  },
});
</script>