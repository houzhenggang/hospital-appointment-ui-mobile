<template>
  <div id="login">
    <div class="banner">
      <img src="./../../../public/image/me/loginbg@2x.png" alt="">
    </div>
    <div class="login-form">
      <div class="login-input">
        <div class="label">用户名</div>
        <div class="span">
          <input
            class="input username"
            type="text"
            v-model="formData.username"
            autocomplete="off"
            autofocus
            placeholder="请输入您的用户名" />
        </div>
      </div>
      <div class="login-input">
        <div class="label">密码</div>
        <div class="span">
          <input
            class="input password"
            type="password"
            v-model="formData.password"
            autocomplete="off"
            placeholder="请输入您的登录密码" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">图形验证码</div>
        <div class="span code">
          <input
            class="input"
            @focus="() => codeFocus = true"
            @blur="() => codeFocus = false"
            type="text"
            v-model="formData.code"
            autocomplete="off"
            placeholder="请输入右侧图形验证码"
            maxlength="4" />
          <img slot="button" :src="code.src" class="login-code-img" @click="refreshCode" />
        </div>
      </div>

      <div class="toPhoneLogin" @click="toPhoneLogin">使用手机号登录</div>
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
        username: '',
        password: '',
        code: '',
        randomStr: ''
      },
      code: {
        src: `/api/code`,
        len: 17
      }
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  methods: {
    refreshCode () {
      this.formData.code = ''
      // this.formData.randomStr = randomLenNum(this.code.len, true)
      this.$set(this.formData, 'randomStr', randomLenNum(this.code.len, true))
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `/api/code?randomStr=${this.formData.randomStr}`)
    },
    submit () {
      if (this.formData.username === '' || this.formData.password === '') {
        this.$notify({
          message: '请输入用户名密码',
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
                  username: '',
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
      this.$router.push({ path: '/main/registerFirst', query: { name: '注册' } })
    },
    toPhoneLogin () {
      this.$router.push({ name: 'phoneLogin' })
    }
  },
  created () {
    let { username, password } = this.$route.params
    if (username && password) {
      this.$set(this.formData, 'username', username)
      this.$set(this.formData, 'password', password)
    }
  },
  mounted () {
    this.refreshCode()
  },
  activated () {
    let { username, password } = this.$route.params
    if (username && password) {
      this.$set(this.formData, 'username', username)
      this.$set(this.formData, 'password', password)
    }
    this.refreshCode()
  }
}
</script>
