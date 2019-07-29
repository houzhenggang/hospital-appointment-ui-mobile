/* eslint-disable no-unused-vars */
<template>
  <div id="register">
    <div class="title">{{ title }}</div>
    <!-- 设计稿没有上传照片，先隐藏 -->
    <!-- <div class="uploader">
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
        <img :src="'../img/register-photo-min.png'" alt="" v-if="!formData.avatar">
        <img class="img-2" v-else :src="`/api/admin/file/${formData.avatar}`">
      </van-uploader>
    </div> -->
    <div class="login-form">
      <div class="login-input">
        <div class="label">姓名</div>
        <div class="span">
          <input
            ref="name"
            class="input username"
            type="text"
            v-model="formData.name"
            autocomplete="off"
            placeholder="请填写您的真实姓名" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">性别</div>
        <div class="span">
          <div class="otherBox">
            <van-field
              readonly
              clickable
              :value="formData.sex === 1 ? '男' : '女'"
              placeholder="请选择您的性别"
              @click="showPicker = true"
              class="sexField"
            />
            <div class="icon"><van-icon name="arrow" /></div>
          </div>
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="sexColumns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>
      </div>

      <div class="login-input">
        <div class="label">手机号</div>
        <div class="span">
          <input
            class="input phone"
            type="text"
            v-model="formData.phone"
            autocomplete="off"
            placeholder="请填写您的手机号" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">用户名<span class="tag">(仅支持英文、数字)</span></div>
        <div class="span">
          <input
            ref="username"
            class="input username"
            type="text"
            v-model="formData.username"
            autocomplete="off"
            autofocus
            @blur="hasUserName()"
            placeholder="请设置您的用户名" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">密码<span class="tag">（仅支持英文，数字，特殊符号）</span></div>
        <div class="span">
          <input
            class="input password"
            type="password"
            v-model="formData.password"
            autocomplete="off"
            placeholder="请设置您的登录密码" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">确认密码<span class="tag">（仅支持英文，数字，特殊符号）</span></div>
        <div class="span">
          <input
            class="input password"
            type="password"
            v-model="formData.qrPassword"
            autocomplete="off"
            placeholder="请再次输入您的登录密码" />
        </div>
      </div>

    </div>
    <div class="login-btn" @click="submit">注&nbsp;&nbsp;册</div>
    <div class="change-login-register">
      <!-- <router-link :to='{name: "login"}'>已有账号？<span>立即登陆</span></router-link> -->
      <div class="router-link" @click="toLogin">已有账号？<span>立即登录</span></div>
    </div>
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
  name: 'register',
  mixins: [ mixin ],
  data () {
    return {
      title: '注册',
      validateName: true,
      formData: {
        // avatar: '',
        username: '',
        name: '',
        sex: 1,
        password: '',
        qrPassword: '',
        phone: ''
      },
      showPicker: false,
      sexColumns: ['男', '女']
    }
  },
  methods: {
    onRead (file) {
      // let formData = new FormData()
      // formData.append('file', file.file, file.file.name)
      // 在上传前需要将图片进行压缩处理
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '上传中...'
      })
      this.imgPreview(file.file)
    },
    imageUpload (file) {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      this.axios.post('/api/admin/file/upload', file, config).then(({ data }) => {
        this.$set(this.formData, 'avatar', `${data.data.bucketName}-${data.data.fileName}`)
        this.$toast.clear()
      })
    },
    hasUserName (cb = () => {}) {
      if (this.formData.username === '') {
        return
      }
      hasUserName(this.formData.username).then(({ data }) => {
        if (data.data === true) {
          this.$notify({
            message: '用户名已存在请修改',
            background: '#FF0036'
          })
          this.validateName = false
        } else {
          this.validateName = true
        }
      })
    },
    validate (cb) {
      let formData = this.formData
      if (!formData.username) {
        cb(false, '用户名不能为空')
      } else if (!(/^[A-Za-z0-9]+$/.exec(formData.username))) {
        cb(false, '用户名不符合规范，仅支持英文、数字')
      } else if (formData.username.length < 5) {
        cb(false, '用户名长度不能少于5位')
      } else if (!formData.password) {
        cb(false, '密码不能为空')
      } else if (formData.password.length < 6) {
        cb(false, '密码长度不能少于6位')
      } else if (formData.password !== formData.qrPassword) {
        cb(false, '密码和确认密码不一致')
      } else if (!formData.phone) {
        cb(false, '请输入您的联系电话')
      } else {
        cb(true)
      }
    },
    submit () {
      if (!this.validateName) {
        this.$notify({
          message: '用户名已存在请修改',
          background: '#FF0036'
        })
        return
      }
      this.validate((valid, msg) => {
        if (valid) {
          userRegister(this.formData).then(({ data }) => {
            if (data.code === 0) {
              if (!data.data.data) {
                this.$notify({
                  message: '未知异常，注册失败',
                  background: '#FF4444'
                })
              } else {
                this.formData = {
                  // avatar: '',
                  username: '',
                  password: '',
                  qrPassword: '',
                  phone: '',
                  name: '',
                  sex: ''
                }
                this.$toast.loading({
                  mask: true,
                  message: '注册成功\n正在前往登陆页',
                  duration: 2000
                })
                setTimeout(() => {
                  this.$router.push({
                    name: 'login',
                    params: {
                      username: this.formData.username,
                      password: this.formData.password
                    }
                  })
                })
              }
            } else {
              this.$notify({
                message: '未知异常，注册失败',
                background: '#FF4444'
              })
            }
          })
        } else {
          this.$notify({
            message: msg || '请规范填写表单后提交',
            background: '#FF4444'
          })
        }
      })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    onConfirm(value) {
      if (value === '男'){
        this.formData.sex = 1;
      } else if (value === '女') {
        this.formData.sex = 2;
      }
      this.showPicker = false;
    }
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
