<template>
    <div class="search-section">
        <search-form
            :warning="warning"
            @filter="filterData"
        >
            <search-filter
              :data="groups"
              prop="group"
              title-text="Выбрать группу"
              reset-text="Все группы"
              @select="filterByGroup"
            />
            <search-filter
              :data="ages"
              prop="age"
              title-text="Выбрать возраст"
              reset-text="Любой возраст"
              @select="filterByAge"
            />
        </search-form>
        <div class="search-section__sorting">
            <search-sorter
              title-text="по фамилии"
              prop="lastName"
              type="string"
              @sort="sortData"
            />
            <search-sorter
              title-text="по возрасту"
              prop="age"
              type="number"
              @sort="sortData"
            />
        </div>
    </div>
</template>

<script>
import SearchForm from './search-form.vue'
import SearchFilter from './search-filter.vue'
import SearchSorter from './search-sorter.vue'

import { combineFilters } from '@/helpers.js'

export default {
  name: 'SearchSection',

  components: {
    SearchForm,
    SearchSorter,
    SearchFilter
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    // количество найденных совпадений
    size: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      filterMap: {
        byGroup: null,
        byAge: null,
        search: null
      },
      agesMap: {
        'младше 18': x => x < 18,
        '18 - 21': x => x >= 18 && x <= 21,
        '22 - 23': x => x >= 22 && x <= 23,
        'старше 23': x => x > 23
      },
      sorter: () => {}
    }
  },

  computed: {
    // названия групп
    groups() {
      //проверить, что быстрее
      //return [...new Set(this.data.map(item => item.group).sort())]
      return this.data
        .map(item => item.group)
        .sort()
        .filter((item, index, data) => item !== data[index - 1])
    },
    // возрастные категории
    ages() {
      return Object.keys(this.agesMap)
    },
    // все фильтры, которые будут применены при выводе списка пользователей
    filters() {
      return Object.values(this.filterMap).filter(item => typeof item === 'function')
    },
    // предупреждение, если пользователи не найдены
    warning() {
      return !this.size
    }
  },

  methods: {
    updateData() {
      this.$emit('update', this.combinedFilter(), this.sorter)
    },

    filterByGroup(group) {
      this.filterMap.byGroup = this.groups.includes(group) ? 
        item => item.group === group : null
      this.updateData()
    },

    filterByAge(age) {
      this.filterMap.byAge = this.ages.includes(age) ? 
        item => this.agesMap[age](item.age) : null
      this.updateData()
    },

    filterData(filter) {
      this.filterMap.search = filter
      this.updateData()
    },

    sortData(sorter) {
      this.sorter = sorter
      this.updateData()
    },
    // объединенный фильтр для фильтрации списка пользователей
    combinedFilter() {
      return combineFilters(this.filters)
    }
  }
}
</script>

<style>
.search-section button {
  border: 3px solid var(--muted-color);
  padding: 0.5rem 2.5rem;
}
</style>

