import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import Clipboard from 'vue-clipboard2'

// 根据环境使用mockjs
// process.env.NODE_ENV === 'development' && require('./mock/mock.js')

import 'lib-flexible'

import '@/assets/css/common.less'
import vant from 'vant'

Vue.use(vant)
Vue.use(VueCompositionApi)
Vue.use(Clipboard)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
