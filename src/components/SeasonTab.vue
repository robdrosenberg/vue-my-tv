<template>
  <div>
    <div v-if="theTabs.length" class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
        v-model="currentTab"
        @change="$emit('get-season', currentTab)"
      >
        <option>Select Season</option>
        <option
          v-for="tab in theTabs"
          :key="tab"
          :selected="currentTab"
          :value="tab"
        >
          {{ tab }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="relative rounded-b z-0 shadow flex" aria-label="Tabs">
        <a
          v-for="(tab, tabIdx) in theTabs"
          :key="tabIdx"
          :class="[
            tab === currentTab
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            'group cursor-pointer relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          @click="setCurrentTab(tab)"
        >
          <span>S{{ tab }}</span>
          <span
            aria-hidden="true"
            :class="[
              tab === currentTab ? 'bg-blue-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
          />
        </a>
      </nav>
    </div>
  </div>
</template>

<script >
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      theTabs: [],
      currentTab: 0,
    };
  },
  watch: {
    tabs: {
      handler(newValue) {
        this.theTabs = [...newValue];
      },
    },
  },
  methods: {
    setCurrentTab(tab) {
      this.currentTab = tab;
      this.$emit("get-season", tab);
    },
  },
});
</script>
