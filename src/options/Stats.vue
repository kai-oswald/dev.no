<template>
  <div class="stats">
    <span>Total of {{ items.length }} articles blocked.</span>
    <apexchart
      v-if="tags.length > 0 && items.length > 0"
      width="500"
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: ["items", "tags"],
  computed: {
    series() {
      let series = [];
      this.tags.forEach(tag => {
        let tagItems = this.items.filter(c => c.tag === tag);
        series.push(tagItems.length);
      });
      console.log(series);
      return series;
    },
    chartOptions() {
      return {
        labels: this.tags,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }
  }
};
</script>

