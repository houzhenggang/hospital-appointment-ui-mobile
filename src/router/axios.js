// import Vue from "vue"
import axios from 'axios'
import store from '@/store'
import errorCode from '@/const/errorCode'
import router from '@/router/index'
import { Notify } from 'vant'

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}

// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  const isToken = (config.headers || {}).isToken === false

  let token = store.getters.access_token

  if (!config.headers.Authorization) {
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + token// token
    }
  }

  config.headers['TENANT_ID'] = 1

  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = Number(res.status) || 200
  const message = res.data.msg || errorCode[status] || errorCode['default']

  if (status === 401) {
    Notify({
      message: errorCode[401],
      background: '#ff4444'
    })
    store.dispatch('FedLogOut').then(() => {
      router.push({ name: 'login' })
    })
    return
  }

  if (status !== 200 || res.data.code === 1) {
    Notify({
      message: message,
      background: '#ff4444'
    })
    return Promise.reject(new Error(message))
  }
  return res
}, error => {
  return Promise.reject(new Error(error))
})

export default axios
