<template>
  <div id="main-layout">
    <van-nav-bar :title="title" fixed @click-left="clickLeft" v-if="$route.name === '预约申请等待'"></van-nav-bar>
    <van-nav-bar :title="title" left-arrow fixed @click-left="clickLeft" v-else></van-nav-bar>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      route: this.$route
    }
  },
  computed: {
    // ...mapGetters(['user_info']),
    title () {
      return this.$route.query.name || this.$route.meta.title || this.$route.name
    }
  },
  methods: {
    clickLeft () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.route = this.$route
  }
}
</script>

<style lang="scss" scoped>
#main-layout {
  > .van-nav-bar {
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    .van-nav-bar__left i:before {
      color: #282828;
    }
    .van-nav-bar__title {
      color: #282828;
    }
  }
  .content {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
}
</style>
