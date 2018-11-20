<template>
    <edit-user v-if="data" :data="data" :url="url" @submit="saveUser"/>
    <add-user v-else :url="url" @submit="saveUser"/>
</template>

<script>

export default {
    name: 'DataEditor',

    components: {
        EditUser: () => import('./edit-user.vue'),
        AddUser: () => import('./add-user.vue')
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
        saveUser(user) {
            this.$emit('submit', user)
        }
    }
}
</script>
