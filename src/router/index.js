import Vue from 'vue'
import VueRouter from 'vue-router'
import toolkit from '../utils/_toolkit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue')
  },
  {
    path: '/detail/:postId',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail/Detail.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "Mine" */ '../views/Mine/Mine.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "Create" */ '../views/Create/Create.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // const timestamp = localStorage.getItem('timestamp')
  // const nonceStr = localStorage.getItem('nonceStr')
  // const signature = localStorage.getItem('signature')
  // toolkit.wxConfig({ timestamp, nonceStr, signature })
  if (toolkit.isWeChatUrl()) {
    window.location.href = toolkit.getProjectUrl()
  }
  next()
})
export default router
