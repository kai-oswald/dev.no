<template>
  <div class="article-list">
    <h2>Recently blocked articles</h2>
    <div class="article" v-for="(item, index) in recentItems" :key="index">
      <span class="tag">#{{ item.tag }}</span>
      <a :href="'https://dev.to/' + item.element.href" target="blank">{{ item.element.title }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items"],
  created() {
    console.log(this.items);
  },
  computed: {
    recentItems() {
      let sorted = this.items.sort(function(a, b) {
        return a.time - b.time;
      });

      return sorted.slice(Math.max(sorted.length - 5, 1));
    }
  }
};
</script>
<style>
.article {
  padding: 0.5rem;
}
.tag {
  padding: 0.4rem;
  background: rgba(0,0,0,.2);
}
</style>
