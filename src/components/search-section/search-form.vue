<template>
  <form class="search-section__form">
    <input 
      type="search" 
      class="search-section__input" 
      v-model.trim="value" 
      @input="filterData(value)"
    />
    <slot/>
    <button 
      type="button"
      class="search-section__button"
      @click="filterData(value)"
    >
      
    </button>
    <!-- <input type="submit" class="search-section__button"> -->
    <p class="search-section__warning-message" v-if="warning">
      Совпадений не найдено
    </p>
  </form>
</template>

<script>

export default {
  name: 'SearchForm',

  props: {
    warning: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      value: '',
      prop: 'lastName'
    }
  },

  methods: {
    filterData() {
      this.$emit('filter', item => filter(item[this.prop], this.value))
      // this.$emit('filter', item => {
      //   return filter(item[this.key], this.value) ? item : null
      // })
    }
  }
}

function filter(str, value) {
  return str.toLowerCase().startsWith(value.toLowerCase())
}
</script>
<style>
.search-section__button {
  width: 1rem;
  height: 1rem;
  padding: 0;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPBAMAAADNDVhEAAAAAXNSR0IB2cksfwAAAB5QTFRFAAAAMTExMTExMTExMTExMTExMTExMTExMTExMTEx9uHNTgAAAAp0Uk5TACKq7v9Ed2Yzu+xo4YUAAABQSURBVHicY2CAASETIwEgxWri4mIKpIWd05OdgQIqhgyMJgoMDCYJDAwpBgwMLgUMDCUOCD5MHqQeJAfS72IBMa/YuQFsNIeJAcSO5gkw2wA2YA48PmvomwAAAABJRU5ErkJggg==')
    no-repeat;
}
</style>
