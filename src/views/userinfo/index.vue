<template>
  <div class="user-info">
    <div class="head">
      <div class="avatar">
        <img v-if="user_info.avatar" :src="`/api/admin/file/${user_info.avatar}`">
        <img v-else src="./img/avatar.jpg">
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
        <div class="avatar"><img :src="item.icon" alt=""></div>
        <div class="item">
          <div class="title">{{item.name}}</div>
        </div>
        <div class="icon"><van-icon name="arrow" /></div>
      </div>
      <div class="logout" @click="handleLogout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import './style.scss'

export default {
  computed: {
    ...mapGetters(['user_info'])
  },
  data () {
    return {
      list: [
        {
          name: '手机号认证',
          icon: '../img/archives-min.png',
          pathName: 'archives'
        }, {
          name: '身份证认证',
          icon: '../img/signing-min.png',
          pathName: 'signing'
        }, {
          name: '医保卡认证',
          icon: '../img/signing-min.png',
          pathName: 'signing'
        }, {
          name: '我的预约',
          icon: '../img/signing-min.png',
          pathName: '我的预约'
        }
      ]
    }
  },
  methods: {
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
