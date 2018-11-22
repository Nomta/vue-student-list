<template>
   <form class="edit-form" :class="{ 'edit-form--active': isActive }">
       <h2 class="edit-form__heading"> {{ headingText }} </h2>
       <ul class="edit-form__outer">
       
           <li class="edit-form__item">
                <label for="">Имя*</label>
                <input v-model.trim="user.firstName"
                    type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.firstName.$invalid 
                    }"
                />
                <div class="edit-form__error-message">
                    <span v-show="!$v.user.firstName.required"> 
                        Поле "Имя" обязательно для заполнения 
                    </span>
                    <span v-show="!$v.user.firstName.alpha">
                        Проверьте правильность написания имени 
                    </span>
                </div>
            </li>

            <li class="edit-form__item">
                <label for="">Фамилия*</label>
                <input v-model.trim="user.lastName"
                    type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.lastName.$invalid 
                    }"
                />
                <div class="edit-form__error-message">
                    <span v-show="!$v.user.lastName.required"> 
                        Поле "Фамилия" обязательно для заполнения 
                    </span>
                    <span v-show="!$v.user.lastName.alpha">
                        Проверьте правильность написания фамилии 
                    </span>
                </div>
            </li>

            <li class="edit-form__item edit-form__datapicker">
                <label for="">Дата рождения*</label>
                <datepicker 
                    v-model="user.birthDate"
                    class="edit-form__input"
                />
            </li>

            <li class="edit-form__item">
                <label for="">Группа*</label>
                <input v-model.trim="user.group"
                    type="text"
                    class="edit-form__input"
                    :class="{ 
                        'edit-form__input--invalid':  $v.user.group.$invalid 
                    }"
                />
                <div class="edit-form__error-message">
                    <span v-show="!$v.user.group.required"> 
                        Поле "Группа" обязательно для заполнения 
                    </span>
                    <span v-show="!$v.user.group.group">
                        Название группы задано некорректно 
                    </span>
                </div>
            </li>

        </ul>
       <input type="submit" 
            class="edit-form__button"
            :value="buttonText" 
            @click.prevent="saveData(user)"
        />
   </form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, helpers } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

// validation patterns
const group = helpers.regex('', /^[A-ZА-Я]{2,4}-\d{1,2}-\d{2}$/)
const alpha = helpers.regex('', /^[A-zА-я\-'ёЁ]+$/)

import { getAge, capitalize } from '@/helpers.js'

export default {
  name: 'EditForm',

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

  computed: {
    heading() {
      return this.user.firstName || this.user.lastName
    },
    headingText() {
      return this.heading ? `${this.user.firstName} ${this.user.lastName}` : 'Заполните форму'
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
        this.user.age = getAge(this.user.birthDate)
        this.$emit('submit', user)
      }
    }
  }
}
</script>

<style>
.edit-form {
}
.edit-form__heading {
  height: 2em;
  color: var(--main-color);
}
.edit-form__outer {
  width: 27em;
  max-width: calc(100vw - 8em);
}
.edit-form__item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.edit-form__input {
  min-width: 60%;
  height: 2em;
  padding: 0 0.25em;
  font-size: 0.875em;
  outline: none;
  color: var(--main-color);
}
.edit-form__datapicker {
  margin-bottom: 1.375em;
}
.edit-form--active .edit-form__input--invalid {
  border: 1px solid red;
}
.edit-form__error-message {
  width: 100%;
  height: 1.5em;
  visibility: hidden;
  font-size: 0.875em;
}
.edit-form--active .edit-form__error-message {
  visibility: visible;
  color: red;
}
.edit-form__button {
  width: 9em;
  height: 2.5em;
  margin: 1em 0;
  float: right;
  border: 2px solid var(--main-color);
  color: var(--main-color);
  background-color: white;
  cursor: pointer;
}

@media screen and (max-width: 479px) {
  .edit-form__outer {
    width: 11.25em;
  }
}
</style>
