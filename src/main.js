import Vue from 'vue'
import App from '@/App.vue'
import '@/styles/style.css'

Vue.config.productionTip = false

var app = new Vue({
  render: h => h(App)
}).$mount('#app')

export default app
