<template>
  <div class="container">
    <h1>Dev.no - options</h1>
    <form @submit="onSubmit">
      <input v-model="currentTag" type="text" placeholder="Please enter a tag to ignore" />
      <span v-if="isInvalid" style="color:red;display:block">Tag is already being ignored.</span>
      <span style="display:block" v-else>&nbsp;</span>
    </form>
    <div v-if="tags.length === 0">You don't ignore any tags yet. Add some:)</div>
    <div v-else class="taglist">
      <h2>Ignored tags</h2>
      <ul>
        <li v-for="tag in tags" :key="tag">
          #{{tag}}
          <span @click="removeTag(tag)" class="remove">remove</span>
        </li>
      </ul>
    </div>
    <hr/>
    <div class="stats-list">
      <div>
        <h2>Stats total</h2>
        <Stats :items="blockedItems" :tags="tags" />
      </div>
      <div>
        <h2>Stats today</h2>
        <Stats :items="todayItems" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import Stats from "./Stats";

export default {
  name: "App",
  components: {
    Stats
  },
  data() {
    return {
      tags: [],
      currentTag: null,
      blockedItems: []
    };
  },
  created() {
    let self = this;
    chrome.storage.sync.get(
      {
        tags: [],
        blockedItems: []
      },
      function(items) {
        self.tags = items.tags;
        self.blockedItems = items.blockedItems;
      }
    );
  },
  methods: {
    addTag(tag) {
      let self = this;
      let newTags = Array.from(this.tags);
      newTags.push(tag);
      chrome.storage.sync.set(
        {
          tags: newTags
        },
        function() {
          self.tags = newTags;
        }
      );
    },
    removeTag(tag) {
      let self = this;
      let newTags = Array.from(this.tags);
      newTags = newTags.filter(c => c !== tag);

      chrome.storage.sync.set(
        {
          tags: newTags
        },
        function() {
          self.tags = newTags;
        }
      );
    },
    onSubmit(e) {
      e.preventDefault();
      this.addTag(this.currentTag);
      this.currentTag = null;
    }
  },
  computed: {
    isInvalid() {
      return this.tags.indexOf(this.currentTag) !== -1;
    },
    todayItems() {
      return this.blockedItems.filter(c => isToday(new Date(c.time)));
    }
  }
};

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

p {
  font-size: 20px;
}

.remove {
  color: red;
  text-decoration: underline;
  padding: 0 1rem;
  cursor: pointer;
}

.taglist {
  margin-top: 0.2rem;
}
.taglist ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.taglist ul li {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.taglist ul li:nth-child(2n) {
  background: rgba(0, 0, 0, 0.05);
}

.taglist ul li:hover {
  background: rgba(0, 0, 0, 0.2);
}
input {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.stats-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

hr {
  margin: 1rem 0;
  border: none;
  border-top: 1px solid rgba(0,0,0,.2);
}
</style>
