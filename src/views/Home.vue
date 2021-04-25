<script>
import { defineComponent } from "vue";
import ButtonRepo from "@/components/ButtonRepo.vue";
import Episodes from "@/components/Episodes.vue";

export default defineComponent({
  components: {
    Episodes,
  },
});
</script>

<template>
  <main>
    <div class="">
      <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-10"
        >
          Search your Favorite TV Shows
        </h2>
        <div>
          <Episodes />
        </div>
      </div>
    </div>
  </main>
</template>