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
    <div v-if="count">Total {{ count }} blocked.</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tags: [],
      currentTag: null,
      count: null
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
        self.count = items.blockedItems.length;
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
    }
  }
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

.container {
  max-width: 400px;
}
</style>
