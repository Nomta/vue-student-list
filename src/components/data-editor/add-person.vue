<template>
    <edit-form :data="person" @submit="postData"/>
</template>
<script>

import axios from '@/axios.js'
import EditForm from './edit-form.vue'

export default {
    name: 'AddPerson',

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
            person: {
                firstName: '', 
                lastName: '', 
                age: 0, 
                group: ''
            }
        }
    },

    methods: {
        postData(person) {
            this.$emit('submit')
            axios
              .post(this.url, person)
              .then(response => console.log(response.statusText, person))
              .catch(error => console.error(error)) 
        }
    }
    
}
</script>
