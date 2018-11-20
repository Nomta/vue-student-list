<template>
   
</template>

<script>
import SearchForm from '/search-form.vue'
import SearchFilter from '/search-filter.vue'
import SearchSorter from '/search-sorter.vue'

export default {
    name: 'SearchSection',

    components: {
        //SearchForm, SearchFilter, SearchSorter
    },

    // model: {
    //     prop: ''
    // },
    
    props: {
        data: {
            type: Array,
            required: true
        }
    },

    // data() {
    //     return {}
    // },

    // computed: {},

    // watch: {},

    // created() {},

    // methods: {}
}
</script>
