<template>
  <!-- <div class="search__form"> -->
  <form>
    <input 
      v-model.trim="value" 
      type="search" 
      class="search__input" 
      @input="filterData(value)"
    />
    <slot/>
    <button 
      class="search__search-button"
      @click.prevent="filterData(value)"
    >
      
    </button>
    <p v-if="warning" class="search__warning-message">
      Совпадений не найдено
    </p>
  </form>
  <!-- </div> -->
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
    }
  }
}

function filter(str, value) {
  return str.toLowerCase().startsWith(value.toLowerCase())
}
</script>
<style>
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.search__input {
  flex-grow: 3;
  max-width: calc(100% - 3rem);
  border: 2px solid var(--muted-color);
  border-right: none;
  padding: 0.5em;
  font-size: 1.25em;
}
.search__search-button {
  width: 3rem;
  min-height: 3rem;
  padding: 0;
  border: 1px solid var(--main-color);
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPBAMAAADNDVhEAAAAAXNSR0IB2cksfwAAAB5QTFRFAAAAMTExMTExMTExMTExMTExMTExMTExMTExMTEx9uHNTgAAAAp0Uk5TACKq7v9Ed2Yzu+xo4YUAAABQSURBVHicY2CAASETIwEgxWri4mIKpIWd05OdgQIqhgyMJgoMDCYJDAwpBgwMLgUMDCUOCD5MHqQeJAfS72IBMa/YuQFsNIeJAcSO5gkw2wA2YA48PmvomwAAAABJRU5ErkJggg==')
    center center no-repeat;
}
.search__warning-message {
  width: 100%;
}
</style>
