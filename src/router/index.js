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
      redirect: { name: 'orderInspect' }
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
      redirect: { name: 'orderInspect' },
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('@/views/userinfo/index')
        },
        {
          path: 'orderInspect',
          name: 'orderInspect',
          component: () => import('@/views/orderInspect/index')
        }
      ]
    }, {
      path: '/main',
      name: 'main',
      component: () => import('@/pages/main/index'),
      children: [
        {
          path: 'userMessage',
          name: '个人信息',
          component: () => import('@/views/userMessage/index')
        },
        {
          path: 'orderSearch',
          component: () => import('@/views/orderSearch/index')
        },
        {
          path: 'hospitalDetails',
          component: () => import('@/views/hospitalDetails/index')
        },
        {
          path: 'orderApplyFor',
          name: '预约申请',
          component: () => import('@/views/orderApplyFor/index')
        },
        {
          path: 'orderApplyForWait',
          name: '预约申请等待',
          component: () => import('@/views/orderApplyFor/wait')
        },
        {
          path: 'orderRecord',
          name: '我的预约',
          component: () => import('@/views/orderRecord/index')
        },
        {
          path: 'orderDetails',
          name: '预约详情',
          component: () => import('@/views/orderDetails/index')
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
