<template>
    <edit-person v-if="data" :data="data" :url="url" @submit="exit"/>
    <add-person v-else :url="url" @submit="exit"/>
</template>

<script>

export default {
    name: 'DataEditor',

    components: {
        EditPerson: () => import('./edit-person.vue'),
        AddPerson: () => import('./add-person.vue')
    },
    
    props: {
        data: {
            type: Object,
            required: false
        },
        url: {
            type: String,
            default: '/'
        }
    },

    methods: {
        exit(person) {
            this.$emit('submit', person)
        }
    }
}
</script>
