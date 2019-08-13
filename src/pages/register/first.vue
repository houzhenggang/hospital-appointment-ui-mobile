/* eslint-disable no-unused-vars */
<template>
  <div id="register">
    <div class="title">{{ title }}</div>

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
    </div>

    <div class="login-btn" @click="toRegister">下一步</div>
  </div>
</template>

<script>
/* eslint-disable */
import '../login/index.scss'
import mixin from '@/mixin/image'

import {
  userRegister,
  hasUserName
} from '@/api/user/index'
import { setTimeout } from 'timers'

export default {
  name: 'registerFist',
  mixins: [ mixin ],
  data () {
    return {
      title: '注册',
      validateName: true,
      formData: {
        phone: '',
        code: ''
      },
      showPicker: false,
      flag: true,
      time: 59
    }
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
    toRegister () {
      this.$router.push({ name: 'register' })
    },
  }
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 15px;
  color: #333;
  .tag {
    font-size: 9px;
    color: #9B9B9B;
    margin-left: 8px;
  }
}
.sexField {
  margin-left: -15px;
  margin-top: -10px;
  margin-bottom: -12px;
}
.otherBox {
  display: flex;
}
</style>
