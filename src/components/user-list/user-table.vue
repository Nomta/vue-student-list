<template>
  <table class="user-table">
    <tr>
      <th colspan="2">Имя</th>
      <th>Фамилия</th>
      <th>Возраст</th>
      <th colspan="2">Группа</th>
    </tr>
    <tr 
      v-for="user in data" 
      :key="user.id" 
      class="user-table__row"
      :class="{'user-table__row--active': isChecked(user.id)}"
      @click="select(user.id)"
    >
      <td>
        <input 
          type="checkbox" 
          :checked="isChecked(user.id)"
        />
      </td>
      <td> {{ user.firstName  }} </td>
      <td> {{ user.lastName   }} </td>
      <td> {{ user.age        }} </td>
      <td> {{ user.group      }} </td>
      <td>
        <button type="button" @click.stop="change(user)">Изменить</button>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'UserTable',

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
    // выбор строки
    // при повторном клике - отмена выбора
    select(id) {
      this.isChecked(id)
        ? this.selected.splice(this.selected.indexOf(id), 1)
        : this.selected.push(id)
    },

    change(user) {
      this.$emit('click', user)
    },

    isChecked(id) {
      return this.selected.includes(id)
    }
  }
}
</script>
<style>
.user-table__row--active {
  color: red;
}
</style>
