import Vue from 'vue'
import Vuex from 'vuex'
import { userLogin, getUserInfo, userLoginNoCode, mobileLogin } from '@/api/user/'
import { encryption } from '@/utils/'
import { setStore, getStore } from '@/utils/store'
import getters from './getters'
import { getDictAll as getAdminDictAll } from '@/api/admin/dict'
import {
  getUserInfo as getArchivesInfo
} from '@/api/archives/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title_info: getStore({ name: 'title_info' }) || {},
    refresh_token: getStore({ name: 'refresh_token' }) || '',
    access_token: getStore({ name: 'access_token' }) || '',
    user_info: getStore({ name: 'user_info' }) || {}
  },
  mutations: {
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refresh_token = refreshToken
      setStore({
        name: 'refresh_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.access_token = accessToken
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_TITLE_INFO: (state, titleInfo) => {
      state.title_info = titleInfo
      setStore({
        name: 'title_info',
        content: state.title_info,
        type: 'session'
      })
    },
    GET_USER_INFO: (state, userInfo) => {
      state.user_info = userInfo
      setStore({
        name: 'user_info',
        content: state.user_info,
        type: 'session'
      })
    },
    SET_DICT_ALL: (state, dictList) => {
      state.dictList = dictList
      setStore({
        name: 'dictList',
        content: state.dictList,
        type: 'session'
      })
    },
    SET_WXLOGIN_STATUS: (state, wxloginStatus) => {
      state.wxlogin_status = wxloginStatus
      setStore({
        name: 'wxloginStatus',
        content: state.wxlogin_status,
        type: 'session'
      })
    }
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'pigxpigxpigxpigx',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        userLogin(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response.data

          commit('SET_WXLOGIN_STATUS', 0)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginByMobile ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'pigxpigxpigxpigx',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        mobileLogin(user.mobile, user.code, user.grant_type).then(response => {
          const data = response.data
          commit('SET_WXLOGIN_STATUS', 0)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    userLoginNoCode ({ commit }, code) {
      return new Promise((resolve, reject) => {
        userLoginNoCode(code).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetToken ({ commit }, access_token, refresh_token) {
      commit('SET_ACCESS_TOKEN', access_token)
      commit('SET_REFRESH_TOKEN', refresh_token)
    },
    // 底部tab值存储
    footerTabSetting ({ commit }, titleInfo) {
      commit('SET_TITLE_INFO', titleInfo)
    },
    // 注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_TITLE_INFO', {})
        resolve()
      })
    },
    saveWxLoginStatus({ commit }) {
      return new Promise(resolve => {
        commit('SET_WXLOGIN_STATUS', 1)
        resolve()
      })
    },
    // 获取用户信息
    getUserInfo ({ commit }) {
      return new Promise(resolve => {
        getUserInfo().then(({ data }) => {
          console.log(data)
          commit('GET_USER_INFO', { ...data.data.sysUser, permissions: data.data.permissions, roles: data.data.roles })
          resolve()
        })
      })
    },
    getArchivesInfo ({ commit }) {
      let userId = getStore({ name: 'user_info' }).userId
      return new Promise(resolve => {
        getArchivesInfo(userId).then(({ data }) => {
          if (data.data && data.data.id) {
            setStore({
              name: 'peopleId',
              content: data.data.id,
              type: 'session'
            })
          }
          resolve(data.data)
        })
      })
    },
    GetDictAll ({ commit }) {
      return new Promise((resolve) => {
        getAdminDictAll().then((values) => {
          let data = values.data.data
          commit('SET_DICT_ALL', { ...data })
          resolve()
        })
      })
    }
  },
  getters
})
