<template>
  <div id="login">
    <div class="banner">
      <img src="./../../../public/image/me/loginbg@2x.png" alt="">
    </div>
    <div class="login-form">
      <div class="login-input">
        <div class="label">手机号</div>
        <div class="span">
          <input
            class="input username"
            type="text"
            v-model="formData.phone"
            autocomplete="off"
            autofocus
            placeholder="请输入您的手机号" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">短信验证码</div>
        <div class="span code">
          <input
            class="input"
            @focus="() => codeFocus = true"
            @blur="() => codeFocus = false"
            type="text"
            v-model="formData.code"
            autocomplete="off"
            placeholder="请输入短信验证码"
            maxlength="4" />
          <van-button slot="button" size="small" v-if="flag" class="login-code" type="info" @click="pushCode">获取验证码</van-button>
          <van-button slot="button" size="small" v-if="!flag" class="login-code" disabled type="info" @click="pushCode">{{time}}s</van-button>
        </div>
      </div>

      <div class="toPhoneLogin" @click="toLogin">使用用户名密码登录</div>
    </div>
    <div class="login-btn" @click="submit">登录</div>
    <div class="change-login-register">
      <div class="router-link" @click="toRegister">没有账号？<span>立即注册</span></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { randomLenNum } from '@/utils/index'
import {
  getUserInfo as getPeopleInfo
} from '@/api/doctorpeopleinfo/index'
import { mapGetters } from 'vuex'
import './index.scss'

export default {
  data () {
    return {
      title: '用户登录',
      codeFocus: false,
      formData: {
        phone: '',
        code: '',
        randomStr: ''
      },
      code: {
        src: `/api/code`,
        len: 17
      },
      flag: true,
      time: 59
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  watch: {
    '$route': 'reset'
  },
  methods: {
    reset() {
      this.flag = true
      this.time = 59
    },
    pushCode() {
      // 置灰
      // 倒计时60秒
      this.flag = false
      const val = setInterval(() => {
        if (this.time > 0) {
          this.time = this.time - 1
        } else {
          this.flag = true
          clearInterval(val)
        }
      }, 1000);
    },
    submit () {
      if (this.formData.phone === '') {
        this.$notify({
          message: '请输入手机号',
          background: '#ff4444'
        })
      } else if (this.formData.code === '' || this.formData.code.length < 4) {
        this.$notify({
          message: '请输入正确的验证码',
          background: '#ff4444'
        })
      } else {
        this.$store.dispatch('LoginByUsername', this.formData).then(() => {
          this.$store.dispatch('getUserInfo').then(() => {
            this.$store.dispatch('GetDictAll').then(async () => {
              let result = await getPeopleInfo(this.user_info.userId)
              if (!(result.data.data && result.data.data.peopleId)) {
                this.$notify({
                  message: '非居民用户',
                  background: '#ff4444'
                })
                return
              } else {
                this.formData = {
                  phone: '',
                  password: '',
                  code: ''
                }
                this.$notify({
                  message: '登录成功',
                  background: '#00cc33'
                })
                this.$router.push({ name: 'userinfo' })
              }
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
          this.refreshCode()
        })
      }
    },
    toRegister () {
      this.$router.push({ name: 'registerFirst' })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    let { phone } = this.$route.params
    if (phone) {
      this.$set(this.formData, 'phone', phone)
    }
  },
  activated () {
    let { phone } = this.$route.params
    if (phone) {
      this.$set(this.formData, 'phone', phone)
    }
  }
}
</script>
