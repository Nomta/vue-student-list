<template>
   <form class="edit-form" :class="{ 'edit-form--active': isActive }">
       <h2> {{ user.firstName }} {{ user.lastName }} </h2>
       <ul class="edit-form__outer">
       
           <li class="edit-form__item">
                <label for="">Имя*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.firstName.$invalid 
                    }"
                    v-model.trim="user.firstName"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.firstName.required"
                > Поле "Имя" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.firstName.alpha"
                > Проверьте правильность написания имени </p>
            </li>

            <li class="edit-form__item">
                <label for="">Фамилия*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.lastName.$invalid 
                    }"
                    v-model.trim="user.lastName"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.lastName.required"
                > Поле "Фамилия" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.lastName.alpha"
                > Проверьте правильность написания фамилии </p>
            </li>

            <li class="edit-form__item">
                <label for="">Дата рождения*</label>
                <datepicker 
                    v-model="user.birthDate"
                />
            </li>

            <li class="edit-form__item">
                <label for="">Группа*</label>
                <input type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.group.$invalid 
                    }"
                    v-model.trim="user.group"
                />
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.group.required"
                > Поле "Группа" обязательно для заполнения </p>
                <p 
                    class="edit-form__error-message" 
                    v-show="!$v.user.group.group"
                > Название группы задано некорректно. </p>  
            </li>

        </ul>
       <input type="submit" @click.prevent="saveData(user)" :value="buttonText">
   </form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

// validation patterns
const group = helpers.regex('', /^[A-ZА-Я]{2,4}-\d{1,2}-\d{2}$/)
const alpha = helpers.regex('', /^[A-zА-я\-\'ёЁ]+$/)

import { getAge, capitalize } from '@/helpers.js'

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
    // локальный пользователь
      user: Object.assign({}, this.data),
    // форма неактивна до первого submit
      isActive: false
    }
  },

  validations: {
      // валидируемые поля
      user: { 
        firstName: { required, alpha },
        lastName: { required, alpha },
        group: { required, group }
      }
  },

    methods: {
        saveData(user) {
            this.isActive = true
            if (!this.$v.$invalid) {
                this.isValid = true
                this.user.firstName = capitalize(this.user.firstName)
                this.user.lastName = capitalize(this.user.lastName)
                this.user.age  = getAge(this.user.birthDate)
                this.$emit('submit', user)
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

