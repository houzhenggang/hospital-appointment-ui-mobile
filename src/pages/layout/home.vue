<template>
  <div id="home-layout">
    <van-nav-bar :title="title" fixed v-if="activeIndex !== 2"></van-nav-bar>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.$keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.$keepAlive" />
    </div>
    <!-- <van-tabbar v-model="activeIndex" route active-color="#2458FF" inactive-color="#CACACA">
      <van-tabbar-item
        replace
        :icon="item.icon"
        :to="{ name: key }"
        v-for="(item, key) in tabList"
        :key="key">
          <span>{{item.name}}</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? item.imgAvtive : item.img"
          >
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
import { tabList } from '@/const/tab'
import './home.scss'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      activeIndex: 1,
      tabList,
      title: ''
    }
  },
  watch: {
    $route (to) {
      this.$store.dispatch('footerTabSetting', tabList[to.name]).then(() => {
        if (tabList[to.name]) {
          this.activeIndex = tabList[to.name].value
          this.title = tabList[to.name].name
        } else {
          this.activeIndex = 0
          this.title = ''
        }
      })
    }
  },
  computed: {
    ...mapGetters(['tab'])
  },
  mounted () {
    this.activeIndex = tabList[this.$route.name].value
    this.title = tabList[this.$route.name].name
  }
}
</script>
