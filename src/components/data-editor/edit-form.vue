<template>
   <form class="edit-form" :class="{ 'edit-form--active': isActive }">
       <h2> {{ person.firstName }} {{ person.lastName }} </h2>
       <ul class="edit-form__outer">
       
           <li class="edit-form__item">
                <label for="">Имя*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.person.firstName.$invalid 
                    }"
                    v-model.trim="person.firstName"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.firstName.required"
                > Поле "Имя" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.firstName.alpha"
                > Проверьте правильность написания имени </p>
            </li>

            <li class="edit-form__item">
                <label for="">Фамилия*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.person.lastName.$invalid 
                    }"
                    v-model.trim="person.lastName"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.lastName.required"
                > Поле "Фамилия" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.lastName.alpha"
                > Проверьте правильность написания фамилии </p>
            </li>

            <li class="edit-form__item">
                <label for="">Дата рождения*</label>
                <datepicker 
                    v-model="person.birthDate"
                />
            </li>

            <li class="edit-form__item">
                <label for="">Группа*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.person.group.$invalid 
                    }"
                    v-model.trim="person.group"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.group.required"
                > Поле "Группа" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.person.group.group"
                > Название группы задано некорректно. </p>  
            </li>

        </ul>
       <input type="submit" @click.prevent="saveData(person)" :value="buttonText">
   </form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

const group = helpers.regex('', /^[A-ZА-Я]{2,4}-\d{1,2}-\d{2}$/)
const alpha = helpers.regex('', /^[A-zА-я\-\'ёЁ]+$/)

import { getAge } from '@/helpers.js'

export default {
  name: 'edit-form',

  components: {
    datepicker: () => import('@/components/datepicker.vue')
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    buttonText: {
        type: String,
        required: true
    }
  },

  data() {
    return {
      person: Object.assign({}, this.data),
      isActive: false
    }
  },

  validations: {
      // валидируемые поля
      person: { 
        firstName: { required, alpha },
        lastName: { required, alpha },
        group: { required, group }
      }
  },

    methods: {
        saveData(person) {
            this.isActive = true
            if (!this.$v.$invalid) {
                this.isValid = true
                this.person.age  = getAge(this.person.birthDate)
                this.$emit('submit', person)
            }
        }
    }
}

</script>

<style>
.edit-form__input {
    flex: 1;
}
.edit-form--active .edit-form__input--invalid {
    border-color: red;
}
.edit-form--active .edit-form__input--valid {
    border-color: green;
}.edit-form__error-message {
    display: none;
}
.edit-form--active .edit-form__error-message {
    display: block;
    color: red;
}
</style>

