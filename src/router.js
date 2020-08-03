import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('./views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Home.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/transporters',
      name: 'transporters',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Transporters.vue')
    },
    {
      path: '/sites',
      name: 'sites',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Sites.vue')
    },
    {
      path: '/utilizators',
      name: 'utilizators',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Utilizators.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/limits',
      name: 'limits',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Limits.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Record.vue')
    },
    {
      path: '/converters',
      name: 'converters',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Converters.vue')
    },
    {
      path: '/*',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/FourOhFour.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})


export default router
