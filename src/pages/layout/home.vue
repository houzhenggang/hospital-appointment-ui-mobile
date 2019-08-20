<template>
  <div id="home-layout">
    <van-nav-bar :title="title" fixed v-if="active !== 2"></van-nav-bar>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.$keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.$keepAlive" />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" v-for="(item, key) in tabList" :key="key" :to="{ name: key }">
        <span>{{item.name}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.imgAvtive : item.img"
        >
      </van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
import { tabList } from '@/const/tab'
import './home.scss'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      active: 0,
      tabList,
      title: ''
    }
  },
  watch: {
    $route (to) {
      this.$store.dispatch('footerTabSetting', tabList[to.name]).then(() => {
        if (tabList[to.name]) {
          this.title = tabList[to.name].name
        } else {
          this.title = ''
        }
      })
    }
  },
  computed: {
    ...mapGetters(['tab'])
  },
  mounted () {
    this.title = tabList[this.$route.name].name
  }
}
</script>
