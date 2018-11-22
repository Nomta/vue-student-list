<template>
  <div class="sorting">
    <div class="page-button-group">
      <sorter-item
        title-text="по фамилии"
        prop="lastName"
        type="string"
        class="page-button-group__item"
        :class="{'sorting__sort-by--active': selected['by-lastName']}"
        @sort="sortData"
      />
      <sorter-item
        title-text="по возрасту"
        prop="age"
        type="number"
        class="page-button-group__item"
        :class="{'sorting__sort-by--active': selected['by-age']}"
        @sort="sortData"
      />
    </div>
  </div>
</template>

<script>
import SorterItem from './sorter-item.vue'

export default {
  name: 'SearchSorter',

  components: {
    SorterItem
  },

  data() {
    return {
      selected: {}
    }
  },

  methods: {
    sortData(sorter, id) {
      this.showActiveItem(id)
      this.$emit('sort', sorter)
    },
    // выделить активную кнопку по id
    showActiveItem(id) {
      this.selected = {}
      this.selected[id] = true
    }
  }
}
</script>
<style>
.sorting {
  display: inline-block;
}

@media screen and (max-width: 479px) {
  .sorting {
    width: 100%;
  }
}
</style>
