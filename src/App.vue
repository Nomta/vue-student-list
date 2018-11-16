<template>
  <div id="app">
    <div class="page-container">
      <h1>Студенты</h1>
      <person-list 
        :data="data"
        @link="openEditor" 
        @remove="removeItems"
      />
      <modal-window v-if="opened" @close="hideModal">
        <data-editor 
          :data="person" 
          :url="url"
          @submit="upload"
        />
      </modal-window>
    </div>
  </div>
</template>

<script>
import axios from '@/axios.js'
import PersonList from '@/components/person-list'

export default {
    name: 'App',

    components: {
        PersonList, 
        ModalWindow: () => import('@/components/modal-window'),
        DataEditor: () => import('@/components/data-editor')
    },

    data() {
        return {
            opened: false,
            person: {},
            data: [],
            url: '/users/'
        }
    },

    created() {
        this.loadData()
    },

    methods: {
      openEditor(person) {
        this.person = person
        this.opened = true
      },

      hideModal() {
        this.opened = false
      },

      removeItems(selected) {
        selected.forEach(id => {
          axios       
            .delete('/users/' + id)
            .then(() => this.data = this.data.filter(person => person.id !== id))
            .catch(error => console.log(error))
            
        })
      },

      upload(person) {
        if (person) {
          let index = this.data.indexOf(this.person)
          this.data.splice(index, 1, person)
        }
        else {
          this.data.push(person)
        }
        this.hideModal()
      },
   
      loadData() {
        axios
          .get('/users')
          .then(response => {
            this.data = response.data
            console.log(
              response.status, 
              response.statusText
            )
          })
          .catch(error => console.error(error))
      }
    }
}
</script>

<style>
</style>
