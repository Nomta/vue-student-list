<template>
    <edit-form 
        :data="user"
        button-text="Добавить"
        @submit="postData"
    />
</template>
<script>
import axios from '@/axios.js'
import EditForm from './edit-form.vue'

export default {
  name: 'AddUser',

  components: {
    EditForm
  },

  props: {
    url: {
      type: String,
      default: '/'
    }
  },

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        age: 0,
        birthDate: '01.01.2000',
        group: ''
      }
    }
  },

  methods: {
    postData(user) {
      this.$emit('submit', user)
      axios.post(this.url, user).catch(error => console.error(error))
    }
  }
}
</script>
