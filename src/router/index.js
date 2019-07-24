import Vue from 'vue'
import Router from 'vue-router'
// import axios from '@/router/axios'

Vue.use(Router)

let OLDPEPLE_ROUTER = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'userinfo' }
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index')
    }, {
      path: '/quickLogin',
      name: 'quickLogin',
      component: () => import('@/pages/login/quickLogin')
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register/index')
    }, {
      path: '/home',
      name: 'layout',
      component: () => import('@/pages/layout/home'),
      redirect: { name: 'userinfo' },
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('@/views/userinfo/index')
        }
      ]
    }, {
      path: '*',
      redirect: { name: 'userinfo' }
    }
  ]
})

const whitePageList = ['login', 'register', 'quickLogin']

OLDPEPLE_ROUTER.beforeEach((to, from, next) => {
  let session_token = JSON.parse(sessionStorage.getItem('access_token'))

  if (whitePageList.includes(to.name)) {
    return next()
  }
  if (session_token !== null) {
    let tokenDate = session_token.datetime
    let currentDate = new Date().getTime()
    if (currentDate - tokenDate > 43200000) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next({ name: 'login' })
  }
})

export default OLDPEPLE_ROUTER
