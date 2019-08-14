/* eslint-disable */
<template>
  <div class="user-info">
    <div class="head">
      <div class="avatar">
        <img v-if="user_info.avatar" :src="`/api/admin/file/${user_info.avatar}`">
        <img v-else src="./../../../public/image/me/defaultAvatar@2x.png">
        <!-- <img src="./../../../public/image/me/defaultAvatar@2x.png"> -->
        
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
      <div class="logout" @click="handleLogout">退出登录</div>
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
          pathName: 'archives'
        }, {
          name: '身份证认证',
          icon: require('./../../../public/image/me/credentials_icon@2x.png'),
          pathName: 'signing'
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
      formData: []
    }
  },
  watch: {
    '$route': 'getInfo'
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getUserInfo(this.user_info.userId).then(res => {
        this.formData = res.data.data

        if (res.data.data.idCard) {
          let result = this.formData.idCard.substring(4,14)
          this.formData.idCard =  this.formData.idCard.replace(result,'**********')
        }
        // console.log(this.formData)
      })
    },
    jumpPage (pathName) {
      this.$router.push({ name: pathName })
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
