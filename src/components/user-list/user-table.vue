<template>
  <table class="user-table">
    <tr class="user-table__head">
      <th></th>
      <th>Имя</th>
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
          class="user-table__checkbox"
          :checked="isChecked(user.id)"
          @keyup.delete="remove"
        />
      </td>
      <td> {{ user.firstName  }} </td>
      <td> {{ user.lastName   }} </td>
      <td> {{ user.age        }} </td>
      <td> {{ user.group      }} </td>
      <td>
        <button 
          type="button" 
          class="user-table__button"
          @click.stop="change(user)"
        >
          Изменить
        </button>
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

    remove() {
      this.$emit('remove')
    },

    isChecked(id) {
      return this.selected.includes(id)
    }
  }
}
</script>
<style>
.user-table {
  width: 100%;
  border: 1px solid #ccc;
}
.user-table__row:nth-of-type(2n + 1) {
  background-color: var(--light-color);
}
.user-table__row:hover {
  background-color: var(--accent-color);
}
.user-table__head,
.user-table__row--active td {
  background-color: var(--main-color);
  color: white;
}
.user-table__head th {
  padding: 0.75em 0;
  text-align: left;
}
.user-table__row td {
  padding: 0.5em 0;
}
.user-table__row,
.user-table__row td {
  transition: 0.2s all;
}
.user-table__checkbox {
  margin-left: 1em;
  margin-right: 0;
}
.user-table__button {
  float: right;
  margin-right: 1em;
  font-size: 0.875em;
  background-color: rgba(255, 255, 255, 0);
  color: var(--main-color);
}

@media screen and (max-width: 479px) {
  .user-table__checkbox {
    margin-right: 1em;
  }
}
</style>
