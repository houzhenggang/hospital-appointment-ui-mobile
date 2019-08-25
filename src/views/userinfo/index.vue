/* eslint-disable */
<template>
  <div class="user-info">
    <div class="head">
      <div class="avatar">
        <img src="" alt="" id="headImg" v-if="dataImage">
        <img v-if="!dataImage && formData.headImg" :src="`/api/admin/sys-file/register-${formData.headImg}?access_token=${token}`" id="headImg">
        <img v-if="!dataImage && !formData.headImg" src="./../../../public/image/me/defaultAvatar@2x.png">
      </div>
      <div class="info">
        <div class="name">{{user_info.username}}</div>
        <div class="phone">{{user_info.phone}}</div>
      </div>
      <div class="userMessage" @click="toUserMessage()">
        <span>个人信息</span>
        <van-icon name="arrow" class="u-icon" />
      </div>
    </div>
    <div class="list">
      <div class="user-list" v-for="(item, index) in list" :key="index"  @click="jumpPage(item.pathName)">
        <div class="leftIcon"><img :src="item.icon" alt=""></div>
        <div class="item">
          <div class="title">{{item.name}}</div>
        </div>
        <div v-if="index === 0">
          <div class="rightText" v-if="formData.phone">已认证</div>
          <div class="rightText" v-else>未认证</div>
        </div>
        <div v-if="index === 1">
          <div class="rightText">{{formData.idCard}}</div>
        </div>
        <div class="icon" v-if="index === 2 || index === 3"><van-icon name="arrow" /></div>
      </div>
      <div class="logout" @click="handleLogout" v-if=" show === true">退出登录</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import './style.scss'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import store from '@/store'

import { getStore } from '@/utils/store'
import { setTimeout } from 'timers';

export default {
  computed: {
    ...mapGetters(['user_info'])
  },
  data () {
    return {
      list: [
        {
          name: '手机号认证',
          icon: require('./../../../public/image/me/phone@2x.png'),
        }, {
          name: '身份证认证',
          icon: require('./../../../public/image/me/credentials_icon@2x.png'),
        // }, {
        //   name: '医保卡认证',
        //   icon: require('./../../../public/image/me/medicare_card@2x.png'),
        //   pathName: 'signing'
        }, {
          name: '就诊人管理',
          icon: require('./../../../public/image/me/medicare_card@2x.png'),
          pathName: '就诊人管理'
        }, {
          name: '我的预约',
          icon: require('./../../../public/image/me/medicare_card@2x.png'),
          pathName: '我的预约'
        }
      ],
      formData: [],
      show: true,
      token: '',
      dataImage: ''
    }
  },
  created() {
    this.getInfo()
      let wxloginStatus = getStore({ name: 'wxloginStatus' })
      if (wxloginStatus===1) {
          this.show = false
      } else {
          this.show = true
      }
    this.token = store.getters.access_token
    this.dataImage = localStorage.getItem('imgData')
    this.$nextTick(() => {
      if (this.dataImage) {
        let headImg = document.getElementById('headImg')
        headImg.src = this.dataImage
      }
    })
  },
  methods: {
    getInfo() {
      getUserInfo(this.user_info.userId).then(res => {
        this.formData = res.data.data

        if (res.data.data.idCard) {
          let result = this.formData.idCard.substring(4,14)
          this.formData.idCard =  this.formData.idCard.replace(result,'**********')
        }
        this.formData.headImg = res.data.data.headImg

        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.dataImage) {
              let canvas = document.createElement('canvas')
              canvas.width = 100
              canvas.height = 100
  
              var ctx = canvas.getContext('2d')
              ctx.drawImage(document.getElementById('headImg'), 0, 0, 100, 100)
              let dataURL = canvas.toDataURL('image/png')
              localStorage.setItem('imgData', dataURL)
            }
          }, 1000)
        })
      })
    },
    jumpPage (pathName) {
      if (pathName) {
        this.$router.push({ name: pathName })
      }
    },
    handleLogout () {
      this.$dialog.confirm({
        title: '你确定要退出登录吗？'
      }).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.push({ name: 'login' })
        }).catch(() => {
          this.$router.push({ name: 'login' })
        })
      }).catch(() => {})
    },
    toUserMessage () {
      this.$router.push({ name: '个人信息' })
    }
  }
}
</script>
