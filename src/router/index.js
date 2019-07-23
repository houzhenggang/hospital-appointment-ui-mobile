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
      redirect: { name: 'signing' }
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
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('@/views/userinfo/index')
        }, {
          path: 'archives',
          name: 'archives',
          component: () => import('@/views/archives/index')
        }, {
          path: 'signing',
          name: 'signing',
          meta: {
            $keepAlive: true
          },
          component: () => import('@/views/signing/index/index')
        }, {
          path: 'information',
          name: 'information',
          meta: {
            $keepAlive: true
          },
          component: () => import('@/views/information/index')
        }
      ]
    }, {
      path: '/main',
      name: 'main',
      component: () => import('@/pages/main/index'),
      children: [
        {
          path: 'ordinarySigning/:id',
          name: '签约详情',
          component: () => import('@/views/signing/detail/')
        }, {
          path: 'selfHelpSigning/:id',
          name: '签约详情',
          component: () => import('@/views/signing/detail/')
        }, {
          path: 'personsigning',
          name: '自助签约',
          component: () => import('@/views/signing/forms/')
        }, {
          path: 'followUp',
          name: '随访',
          component: () => import('@/views/followUp/index')
        }, {
          path: 'service',
          name: '服务计划',
          component: () => import('@/views/service/index')
        }, {
          path: '/hypertensionFollowUp/:id',
          name: 'followUpHypertension',
          component: () => import('@/views/followUp/views/hypertensionDetail'),
          meta: {
            title: '高血压随访详情'
          }
        }, {
          path: '/diabetesFollowUp/:id',
          name: 'diabetesFollowUp',
          component: () => import('@/views/followUp/views/diabetesDetail'),
          meta: {
            title: '糖尿病随访详情'
          }
        }, {
          path: '/commonFollowUp/:id',
          name: 'commonFollowUp',
          component: () => import('@/views/followUp/views/commonDetail'),
          meta: {
            title: '健康服务详情'
          }
        }, {
          path: '/information/:id',
          name: 'informationDetail',
          component: () => import('@/views/information/detail')
        }
      ]
    }, {
      path: '*',
      redirect: { name: 'archives' }
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
