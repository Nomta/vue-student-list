<template>
  <div class="search-filter page-button-group__item">
    <button 
      type="button"
      class="search-filter__filter-by"
      @click="openList"
    >
      {{ title }} 
    </button>
    <ul v-show="listOpened" class="search-filter__list">
      <li>
        <button 
          type="button"
          class="search-filter__option"
          @click="selectItem(resetText)" 
        >
          {{ resetText }} 
        </button>
      </li>
      <li v-for="item in data" :key="item">
        <button 
          type="button"
          class="search-filter__option"
          @click="selectItem(item)" 
        >
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',

  props: {
    data: {
      type: Array,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    titleText: {
      type: String,
      default: ''
    },
    resetText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      listOpened: false,
      title: this.titleText || this.resetText
    }
  },

  methods: {
    selectItem(item) {
      this.$emit('select', item)
      this.title = item
      this.openList()
    },

    openList() {
      this.listOpened = !this.listOpened
    }
  }
}
</script>
<style>
.search-filter {
  width: 50%;
  outline: 2px solid var(--main-color);
}
.search-filter__filter-by {
  display: block;
  width: 100%;
  min-width: 9rem;
  height: 100%;
}
.search-filter__list {
  position: relative;
  width: 100%;
  margin-top: 2px;
  padding: 0.5rem 0;
  border: 2px solid var(--muted-color);
  border-top: none;
  background-color: #fff;
}
.search-filter__option {
  width: 100%;
  padding: 0.25rem 1.5rem;
  padding-right: 0;
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
}
.search-filter__option:hover {
  background-color: var(--light-color);
}
</style>
