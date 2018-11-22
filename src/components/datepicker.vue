<template>
    <div class="datepicker">
        <input ref="datepicker" 
            type="text" 
            class="form-control" 
            :value="value" 
            :placeholder="placeholder">
    </div>
</template>

<script>
import flatpickr from 'flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'Datepicker',

  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Выберите дату'
    }
  },

  data() {
    return {
      datepicker: null
    }
  },

  mounted() {
    this.initCalendar()
  },

  beforeDestroy() {
    this.datepicker.destroy()
  },

  methods: {
    initCalendar() {
      this.datepicker = flatpickr(this.$refs.datepicker, {
        locale: Russian,
        dateFormat: 'd.m.Y',
        onChange: (_, dateString) => this.$emit('input', dateString)
      })
    }
  }
}
</script>
<style>
.datepicker {
  min-width: 60%;
  padding: 0;
}
.form-control {
  min-width: 100%;
  height: 2em;
  padding: 0 0.25em;
  color: var(--main-color);
}
</style>
