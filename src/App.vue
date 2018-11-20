<template>
  <div id="app">
    <div class="page-container">
      <h1>Студенты</h1>
      <search-section
        v-if="data"
        :data="data"
        :size="selected.length"
        @update="filterData"
      />
      <person-list 
        v-if="data"
        :data="selected"
        @add="openEditor" 
        @link="openEditor" 
        @remove="removeItems"
      />
      <modal-window v-if="opened" @close="hideModal">
        <data-editor 
          :data="person" 
          :url="url"
          @submit="updateData"
        />
      </modal-window>
    </div>
  </div>
</template>

<script>
import axios from '@/axios.js'
import { getAge } from '@/helpers.js'

import SearchSection from '@/components/search-section'
import PersonList from '@/components/person-list'

export default {
  name: 'App',

  components: {
    SearchSection,
    PersonList,
    ModalWindow: () => import('@/components/modal-window'),
    DataEditor: () => import('@/components/data-editor')
  },

  data() {
    return {
      opened: false,
      person: null,
      data: null,
      url: '/users/',
      filter(item) {
        return item
      },
      // search(item) {
      //   return item
      // },
      sort() {}
    }
  },

  computed: {
    selected() {
      //console.log('FILTER')
      return this.data
        .filter(this.filter)
        .sort(this.sort)
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    openEditor(person) {
      if (person) {
        this.person = person
      }
      this.opened = true
    },

    hideModal() {
      this.opened = false
      this.person = null
    },

    removeItems(selected) {
      selected.forEach(id => {
        axios
          .delete('/users/' + id)
          .then(() => (this.data = this.data.filter(person => person.id !== id)))
          .catch(error => console.log(error))
      })
    },

    filterData(filter, sort) {    // (search, filter, sort)
      //this.search = search
      this.filter = filter
      this.sort = sort
    },

    loadData() {
      axios
        .get('/users')
        .then(response => {
          response.data.forEach(item => (item.age = getAge(item.birthDate)))
          this.data = response.data
          console.log(response.status, response.statusText)
        })
        .catch(error => console.error(error))
    },

    updateData(person) {
      let index = this.data.indexOf(this.person)
      if (index > -1) {
        this.data.splice(index, 1, person)
      } else {
        this.data.push(person)
      }
      this.hideModal()
    }
  }
}

</script>

<style>
</style>
