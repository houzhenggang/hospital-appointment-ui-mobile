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
            v-model="formData.mobile"
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
          <van-button slot="button" size="small" v-if="!flag" class="login-code" disabled type="info">{{time}}s</van-button>
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
import {
  getLoginMobileCode
} from '@/api/user/index'
import { mapGetters } from 'vuex'
import './index.scss'

export default {
  data () {
    return {
      title: '用户登录',
      codeFocus: false,
      formData: {
        mobile: '',
        code: '',
        randomStr: ''
      },
      code: {
        src: `/api/code`,
        len: 17
      },
      flag: true,
      now: 0,
      last: 0,
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
      if (!/^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[6]([8|6])\d{5}$/.test(this.formData.mobile)) {
        this.$notify({
          message: '手机号不正确',
          background: '#ff4444'
        })
        return
      }
      this.now = +new Date()
      if (this.now - this.last < 1000 * 60) {
        this.$notify({
          message: '请勿频繁获取验证码',
          background: '#ff4444'
        })
        return
      }
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
      this.last = +new Date()
      getLoginMobileCode(this.formData.mobile).then(res => {
        console.log(res.data)
        // if (res.data.code === 0) {
        //   this.$notify({
        //     message: res.data.msg,
        //     background: '#ff4444'
        //   })
        // }
      })
    },
    submit () {
      if (this.formData.mobile === '') {
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
        // LoginByMobile
        this.$store.dispatch('LoginByMobile', this.formData).then(() => {
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
                  mobile: '',
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
        })
      }
    },
    toRegister () {
      this.$router.push({ path: '/main/registerFirst', query: { name: '注册' } })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    let { mobile } = this.$route.params
    if (mobile) {
      this.$set(this.formData, 'mobile', mobile)
    }
  },
  activated () {
    let { mobile } = this.$route.params
    if (mobile) {
      this.$set(this.formData, 'mobile', mobile)
    }
  }
}
</script>
