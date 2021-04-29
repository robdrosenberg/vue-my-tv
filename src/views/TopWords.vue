<template>
  <main>
    <div class="main-container">
      <h1 class="main-heading">Most Frequent Plot Words</h1>
      <apexchart
        class="mx-auto"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </main>
</template>
<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      test: "",
    };
  },
  computed: {
    ...mapState(["favorites"]),
    topWords() {
      const mostFrequent = {};
      let reg = new RegExp("[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]$");
      const combinedPlots = this.favorites.map((favorite, index) => {
        const wordArray = favorite.Plot.split(" ").map((word) => {
          return reg.test(word) ? word.slice(0, -1) : word;
        });
        wordArray.forEach((word) =>
          mostFrequent[word] ? mostFrequent[word]++ : (mostFrequent[word] = 1)
        );
        // const test = wordArray.reduce((word) => {
        //   if (punctuations.includes(word.charAt(word.length - 1))) {
        //     console.log(word)
        //     return word.slice(0, -1);
        //   }
        //   return word;
        // });
      });
      let keyValues = Object.entries(mostFrequent);
      let sortedTopWords = keyValues.sort((a, b) => b[1] - a[1]).slice(0, 10);

      return sortedTopWords;
    },
    chartOptions() {
      return {
        chart: {
          id: "top-wordss",
        },
        xaxis: {
          categories: this.topWords.map((word) => word[0]),
        },
      };
    },
    series() {
      return [
        {
          name: "count",
          data: this.topWords.map((word) => word[1]),
        },
      ];
    },
  },
});
</script>
