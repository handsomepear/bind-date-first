import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import Clipboard from 'vue-clipboard2'

// 根据环境使用mockjs
// process.env.NODE_ENV === 'development' && require('./mock/mock.js')

import 'lib-flexible'

import '@/assets/css/common.less'
import {
  Loading,
  Icon,
  Form,
  Field,
  Cell,
  ActionSheet,
  Popup,
  Picker,
  Area,
  Swipe,
  SwipeItem,
  Overlay,
  List
} from 'vant'

import loading from './plugins/loading'

Vue.use(Loading)
  .use(Icon)
  .use(Form)
  .use(Field)
  .use(Cell)
  .use(ActionSheet)
  .use(Popup)
  .use(Picker)
  .use(Area)
  .use(Picker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Overlay)
  .use(List)
Vue.use(VueCompositionApi)
Vue.use(Clipboard)
Vue.use(loading)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
