<template>
  <table class="person-table">
    <tr>
      <th colspan="2">Имя</th>
      <th>Фамилия</th>
      <th>Возраст</th>
      <th colspan="2">Группа</th>
    </tr>
    <tr 
      v-for="person in data" 
      :key="person.id" 
      class="person-table__row"
      :class="{'person-table__row--active': isChecked(person.id)}"
      @click="select(person.id)"
    >
      <td>
        <input 
          type="checkbox" 
          :checked="isChecked(person.id)"
        />
      </td>
      <td> {{ person.firstName  }} </td>
      <td> {{ person.lastName   }} </td>
      <td> {{ person.age        }} </td>
      <td> {{ person.group      }} </td>
      <td>
        <button type="button" @click.stop="change(person)">Изменить</button>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'PersonTable',

  model: {
    prop: 'selected'
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      required: true
    }
  },

  methods: {
    select(id) {
      this.isChecked(id)
        ? this.selected.splice(this.selected.indexOf(id), 1)
        : this.selected.push(id)
    },

    change(person) {
      this.$emit('click', person)
    },

    isChecked(id) {
      return this.selected.includes(id)
    }
  }
}
</script>
<style>
.person-table__row--active {
  color: red;
}
</style>
