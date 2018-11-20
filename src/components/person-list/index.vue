<template>
    <div class="person-list">
        <button class="person-list__button" @click="addItem">
            Добавить
        </button>
        <button class="person-list__button" @click="removeItems">
            Удалить
        </button>
        <person-table 
            v-model="selected"
            :data="data"
            @click="linkToEdit"
            @keyup.delete="removeItems"
        />
    </div>
</template>

<script>

import personTable from './person-table.vue'

export default {
    name: 'PersonList',

    components: {
        personTable
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
        linkToEdit(person) {
            this.$emit('link', person)
        },
        
        addItem() {
            this.$emit('add')
        },

        removeItems() {
            this.$emit('remove', this.selected)
        }
    }
}
</script>

