<template>
    <div class="person-list">
        <person-table 
            v-model="selected"
            :data="data"
            @click="linkToEdit"
        />
        <button class="person-list__button" @click="removeItems">
            Удалить
        </button>
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

        removeItems() {
            this.$emit('remove', this.selected)
        }
    }
}
</script>

