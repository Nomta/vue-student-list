<template>
  <!-- <div class="search-section__sorter"> -->
    <button 
      type="button"
      class="search-section__sort-by"
      @click="sortData"
    >
      {{ titleText }}
    </button>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'SearchSorter',

  props: {
    titleText: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // функция сортировки, в зависимости от типа данных для сравнения
      sorter: 
        this.type === 'string' ?
          (a, b) => a[this.prop].localeCompare(b[this.prop]) :
        this.type === 'number' ?
          (a, b) => a[this.prop] - b[this.prop] :
          () => {}
    }
  },

  methods: {
    sortData() {
      this.$emit('sort', this.sorter)
    }
  }
}
</script>