<template>
  <Header />
  <main>
    <router-view class="bg-gray-50 min-h-screen" />
  </main>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  mounted() {
    this.$store.dispatch("getFavorites");
  },
};
</script>

