<template>
  <div id="wxLogin">
    <!-- 微信公众号登录... -->
  </div>
</template>

<script>

import {
        hasUserName,
        userRegister
    } from '@/api/user/index'

export default {
  name: 'wxLogin',
  data () {
    return {
      appId: 'cs_jtys',
      accessToken: null,
      formData: {
        username: '',
        password: '',
        remeberMe: false
      }
    }
  },
  methods: {

      getWXLoginParam(){
          console.log("getWXLoginParam:"+JSON.stringify(this.$route.query))
          let name = this.$route.query.name
          let mobile = this.$route.query.mobile
          let idcard= this.$route.query.idcard

          let params = {
              // avatar: '',
              username: name,
              password: '',
              qrPassword: '',
              phone: mobile,
              name: name,
              sex: ''
          }
          //1 检查用户状态
          hasUserName(name).then(({ data }) => {
              console.log("hasUserName:"+JSON.stringify(data))
              if (data.data === true) {
                  //用户存在，登录系统
                  this.quickLogin(params)
              } else {
                  //用户不存在，进行注册
                  this.registerUser(params)
              }
          })
      },
      registerUser(params){
          userRegister(params).then(({ data }) => {
                  console.log("userRegister:"+JSON.stringify(data))
                  if (data.code === 0) {
                      if (!data.data.data) {
                          this.$notify({
                              message: '未知异常，注册失败',
                              background: '#FF4444'
                          })
                      } else {
                          //注册成功
                          this.quickLogin(params)
                      }
                  }
                  })
      },
      quickLogin(params){
          console.log("quickLogin:"+JSON.stringify(params))
          this.$store.dispatch('userLoginNoCode', params.phone).then(() => {
              this.$notify({
                  message: '登录成功',
                  background: '#00cc33'
              })
              this.$store.dispatch('getUserInfo').then(() => {
                  this.$store.dispatch('GetDictAll').then(() => {
                      this.$router.push({ name: 'userinfo' })
                  })
              }).catch(() => {
                  this.$notify({
                      message: '获取用户信息失败！',
                      background: '#ff4444'
                  })
              })
          }).catch(() => {
              this.$notify({
                  message: '登录失败',
                  background: '#ff4444'
              })
          })
      }

  },
  created () {
      //http://127.0.0.1:8081/wxlogin?mobile=15371019835&name=taohaibing&idcard=3405211
      this.getWXLoginParam()
  }
}
</script>
