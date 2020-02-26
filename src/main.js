import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import Clipboard from 'vue-clipboard2'

import 'lib-flexible'

import '@/assets/css/common.less'
import 'vant/lib/index.css'
import { Button, Form, Field, ActionSheet, Icon, Area, List, Swipe, SwipeItem, Overlay, Toast, Dialog } from 'vant'

Vue.use(VueCompositionApi)
Vue.use(Clipboard)
Vue.use(Button)
  .use(Form)
  .use(Field)
  .use(ActionSheet)
  .use(Icon)
  .use(Area)
  .use(List)
  .use(Swipe)
  .use(SwipeItem)
  .use(Overlay)
  .use(Toast)
  .use(Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
