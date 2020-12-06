import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify';
import vuelidate from '@/plugins/vuelidate';
import title from '@/mixins/title'

Vue.config.productionTip = false
Vue.mixin(title)

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')
