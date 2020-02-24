import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'

import 'lib-flexible'

import '@/assets/css/common.less'
import 'vant/lib/index.css'
import { Button, Form, Field, ActionSheet, Icon, Area, List } from 'vant'

Vue.use(VueCompositionApi)
Vue.use(Button)
  .use(Form)
  .use(Field)
  .use(ActionSheet)
  .use(Icon)
  .use(Area)
  .use(List)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
