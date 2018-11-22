<template>
    <edit-form 
        :data="data" 
        button-text="Изменить"
        @submit="postData"
    />
</template>
<script>
import axios from '@/axios.js'
import EditForm from './edit-form.vue'

export default {
  name: 'EditUser',

  components: {
    EditForm
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      default: '/'
    }
  },

  methods: {
    postData(user) {
      this.$emit('submit', user)
      axios.put(this.url + user.id, user).catch(error => console.error(error))
    }
  }
}
</script>
