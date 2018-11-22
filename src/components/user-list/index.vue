<template>
    <div class="user-list">
      <header class="user-list__controls">
        <button class="user-list__button" @click="addItem">
            Добавить
        </button>
      </header>
      <user-table 
        v-model="selected"
        class="user-list__table"
        :data="data"
        @click="linkToEdit"
        @remove="removeItems"
      />
      <footer class="user-list__controls">
        <button class="user-list__button" @click="removeItems">
            Удалить
        </button>
      </footer>
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
<style>
.user-list__controls {
  padding: 1.5rem 0;
  display: flex;
  justify-content: flex-end;
}
.user-list__button {
  width: 15em;
  height: 2.75rem;
  font-size: 0.875em;
  outline: 2px solid var(--muted-color);
}
.user-list__button:hover {
  outline-color: var(--main-color);
}
.user-list__table {
  margin-bottom: 0.5em;
}

@media screen and (max-width: 639px) {
  .user-list__button {
    width: 50%;
  }
}
</style>
