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
    name: 'EditPerson',

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
        postData(person) {
            this.$emit('submit', person)
            axios
              .put(this.url + person.id, person)
              .catch(error => console.error(error)) 
            }
    }
    
}
</script>
