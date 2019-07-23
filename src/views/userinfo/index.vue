<template>
  <div class="user-info">
    <div class="head">
      <div class="avatar">
        <img v-if="user_info.avatar" :src="`/api/admin/file/${user_info.avatar}`">
        <img v-else src="./img/avatar.jpg">
      </div>
      <div class="info">
        <div class="name">{{user_info.username}}</div>
        <div class="phone">我的账号：{{user_info.phone}}</div>
      </div>
    </div>
    <div class="list">
      <div class="user-list" v-for="(item, index) in list" :key="index"  @click="jumpPage(item.pathName)">
        <div class="avatar"><img :src="item.icon" alt=""></div>
        <div class="item">
          <div class="title">{{item.name}}</div>
          <div class="doc">{{item.doc}}</div>
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
          name: '我的档案',
          icon: '../img/archives-min.png',
          pathName: 'archives',
          doc: '查看您的健康档案'
        }, {
          name: '我的签约',
          icon: '../img/signing-min.png',
          pathName: 'signing',
          doc: '查看你的医生签约和自主签约'
        }, {
          name: '个人自助建档签约',
          icon: '../img/self-min.png',
          pathName: '自助签约',
          doc: '编辑您的个人签约信息'
        }, {
          name: '我的随访',
          icon: '../img/follow-min.png',
          pathName: '随访',
          doc: '查看您的个人随访信息'
        }, {
          name: '服务计划',
          icon: '../img/plan-min.png',
          pathName: '服务计划',
          doc: '查看您的个人服务计划'
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
    }
  }
}
</script>
