<template>
  <header class="sticky top-0 z-10 bg-white shadow">
    <div class="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 flex items-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.7441 0.993194C16.575 0.996326 16.4119 1.05655 16.2812 1.16409L11.7666 4.7764L8.73828 2.18069C8.66367 2.11547 8.57688 2.06567 8.48291 2.03419C8.38895 2.0027 8.28967 1.99014 8.19083 1.99725C8.09198 2.00435 7.99552 2.03097 7.90703 2.07557C7.81853 2.12017 7.73975 2.18186 7.67523 2.25709C7.61072 2.33231 7.56175 2.41958 7.53115 2.51384C7.50056 2.6081 7.48895 2.70749 7.49699 2.80626C7.50503 2.90503 7.53257 3.00124 7.57801 3.08931C7.62345 3.17738 7.68589 3.25557 7.76172 3.31937L9.72266 5.00003H5.75C3.958 5.00003 2.5 6.45803 2.5 8.25003V17.25C2.5 19.042 3.958 20.5 5.75 20.5H18.25C20.042 20.5 21.5 19.042 21.5 17.25V8.25003C21.5 6.45803 20.042 5.00003 18.25 5.00003H13.8887L17.2188 2.33597C17.3434 2.23936 17.4344 2.10592 17.4789 1.95462C17.5234 1.80331 17.519 1.64184 17.4664 1.49315C17.4139 1.34447 17.3158 1.21613 17.1861 1.12637C17.0565 1.03662 16.9018 0.990018 16.7441 0.993194ZM17.75 10C18.164 10 18.5 10.336 18.5 10.75C18.5 11.164 18.164 11.5 17.75 11.5C17.336 11.5 17 11.164 17 10.75C17 10.336 17.336 10 17.75 10ZM17.75 13.5C18.164 13.5 18.5 13.836 18.5 14.25C18.5 14.664 18.164 15 17.75 15C17.336 15 17 14.664 17 14.25C17 13.836 17.336 13.5 17.75 13.5Z"
          fill="black"
        />
      </svg>
      <div class="ml-8 sm:ml-16">
        <router-link to="/" class="mr-4 header-link">Home</router-link>
        <router-link to="/favorites" class="mr-4 header-link"
          >Favorites</router-link
        >
        <router-link to="/words" class="header-link">Top Words</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.router-link-active {
  @apply border-b-2 pb-2 border-blue-500;
}
a:not(.router-link-active) {
  @apply text-gray-500;
}
</style>