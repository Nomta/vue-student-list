<template>
    <div class="search-panel">
        <search-form
            class="search search-panel__form"
            :warning="warning"
            @filter="filterData"
          >
          <div class="search__search-filters page-button-group">
            <search-filter
              class="search__search-filter"
              :data="groups"
              prop="group"
              title-text="Выбрать группу"
              reset-text="Все группы"
              @select="filterByGroup"
            />
            <search-filter
              class="search__search-filter"
              :data="ages"
              prop="age"
              title-text="Выбрать возраст"
              reset-text="Любой возраст"
              @select="filterByAge"
            />
          </div>
        </search-form>
      
        <search-sorter 
          class="search-panel__sorting"
          @sort="sortData"
        />
    </div>
</template>

<script>
import SearchForm from './search-form.vue'
import SearchFilter from './search-filter.vue'
import SearchSorter from './search-sorter/index.vue'

import { combineFilters } from '@/helpers.js'

export default {
  name: 'SearchPanel',

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
      this.filterMap.byGroup = this.groups.includes(group) ? item => item.group === group : null
      this.updateData()
    },

    filterByAge(age) {
      this.filterMap.byAge = this.ages.includes(age) ? item => this.agesMap[age](item.age) : null
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
.search-panel {
  padding: 0.5rem 0;
  border-bottom: 2px solid var(--muted-color);
}
.search__search-filters {
  flex-grow: 2;
  border: 2px solid var(--main-color);
}
.search-panel__sorting {
  margin: 1.5rem auto 1rem;
}

@media screen and (max-width: 639px) {
  .search-panel__form,
  .search-panel__sorting {
    width: 100%;
  }
  .search__search-filters {
    width: 100%;
    order: 1;
    margin-top: -2px;
  }
}
</style>
