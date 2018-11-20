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
      <user-list 
        v-if="data"
        :data="selected"
        @add="openEditor" 
        @link="openEditor" 
        @remove="removeItems"
      />
      <modal-window v-if="opened" @close="hideModal">
        <data-editor 
          :data="user" 
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
import UserList from '@/components/user-list'

export default {
  name: 'App',

  components: {
    SearchSection,
    UserList,
    ModalWindow: () => import('@/components/modal-window'),
    DataEditor: () => import('@/components/data-editor')
  },

  data() {
    return {
      opened: false,
      user: null,
      data: null,
      url: '/users/',
      filter(item) {
        return item
      },
      sort() {}
    }
  },

  computed: {
    // отсортированные данные
    selected() {
      return this.data
        .filter(this.filter)
        .sort(this.sort)
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    // открыть форму на редактирование
    openEditor(user) {
      if (user) {
        this.user = user
      }
      this.opened = true
    },
    // скрыть форму
    hideModal() {
      this.opened = false
      this.user = null
    },
    // удаление выбранных пользователей
    removeItems(selected) {
      selected.forEach(id => {
        axios
          .delete('/users/' + id)
          .then(() => (this.data = this.data.filter(user => user.id !== id)))
          .catch(error => console.error(error))
      })
    },
    // фильтрация вывода
    filterData(filter, sort) { 
      this.filter = filter
      this.sort = sort
    },
    // загрузка данных
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
    // обновление списка после добавления или редактирования пользователя
    updateData(user) {
      let index = this.data.indexOf(this.user)
      if (index > -1) {
        this.data.splice(index, 1, user)
      } else {
        this.data.push(user)
      }
      this.hideModal()
    }
  }
}

</script>

<style>
</style>
