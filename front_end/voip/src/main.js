import Vue from 'vue'
import App from './App.vue'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
window.$ = window.jQuery =require('jquery')
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

