<template>
  <div class="search-section__filter">
    <button 
      type="button"
      class="search-section__filter-by"
      @click="openList"
    >
      {{ title }} 
    </button>
    <ul class="search-section__filter-list" v-show="listOpened">
      <li>
        <button 
          type="button"
          class="search-section__filter-by-item"
          @click="selectItem(resetText)" 
        >
          {{ resetText }} 
        </button>
      </li>
      <li v-for="item in data" :key="item">
        <button 
          type="button"
          class="search-section__filter-by-item"
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