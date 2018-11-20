<template>
    <div class="user-list">
        <button class="user-list__button" @click="addItem">
            Добавить
        </button>
        <button class="user-list__button" @click="removeItems">
            Удалить
        </button>
        <user-table 
            v-model="selected"
            :data="data"
            @click="linkToEdit"
            @keyup.delete="removeItems"
        />
    </div>
</template>

<script>

import UserTable from './user-table.vue'

export default {
    name: 'UserList',

    components: {
        UserTable
    },

    props: {
        data: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            selected: []
        }
    },

    methods: {
        // переход на редактирование пользователя
        linkToEdit(user) {
            this.$emit('link', user)
        },
        // добавить пользователя
        addItem() {
            this.$emit('add')
        },
        // удалить выбранных пользователей
        removeItems() {
            this.$emit('remove', this.selected)
        }
    }
}
</script>

