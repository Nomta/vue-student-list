<template>
  <button 
    :id="'by-' + prop"
    type="button"
    class="sorting__sort-by"
    @click="sortData($event)"
    >
      {{ titleText }}
  </button>
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
        this.type === 'string'
          ? (a, b) => a[this.prop].localeCompare(b[this.prop])
          : this.type === 'number'
            ? (a, b) => a[this.prop] - b[this.prop]
            : () => {}
    }
  },

  methods: {
    sortData(event) {
      this.$emit('sort', this.sorter, event.target.id)
    }
  }
}
</script>
<style>
.sorting__sort-by {
  width: 12em;
}
.sorting__sort-by--active {
  outline: 2px solid var(--main-color);
}
</style>
