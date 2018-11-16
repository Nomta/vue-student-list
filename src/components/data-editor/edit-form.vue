<template>
   <form class="edit-form">
       <h2> {{ person.firstName }} {{ person.lastName }} </h2>
       <input type="text"
        v-model="person.firstName"
        />
       <input type="text"
        v-model="person.lastName"
        />
       <input type="text"
        v-model="person.age"
        />
       <input type="text"
        v-model="person.group"
        />
       <input type="submit" @click.prevent="saveData(person)" value="Изменить">
   </form>
</template>

<script>
export default {
  name: 'edit-form',
    
    props: {
        data: {
            type: Object,
            required: true
        }
    },

    data() {
      return {
        person: Object.assign({}, this.data)
      }
    },

    methods: {
        saveData(person) {
            this.$emit('submit', person)
        }
    }
}
</script>
