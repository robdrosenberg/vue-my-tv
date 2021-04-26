<template>
  <main>
    <header class="sticky top-0 bg-white shadow" v-if="$route.meta.title">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center"
      >
        <router-link to="/" class="mr-8 text-2xl hover:underline">
          Home
        </router-link>
        <router-link to="/favorites" class="hover:underline"
          >Favorites</router-link
        >
      </div>
    </header>

    <router-view class="bg-gray-50 min-h-screen" />
  </main>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("getFavorites");
  },
};
</script>