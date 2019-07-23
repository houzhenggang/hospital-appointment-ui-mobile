<template>
  <div>
    <!-- <zSearchBar /> -->
    <tabsBar @change="handleChange"></tabsBar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <informationCard
        class="informationCard"
        v-for="item in mainListData"
        :key="item.id"
        :data="item"
        @detail="handleDetail" />
    </van-list>
  </div>
</template>

<script>
// import zSearchBar from './components/searchBar'
import {
  getInformationList
} from '@/api/information/index'
import informationCard from './components/informationCard'
import tabsBar from './components/tabsbar'

export default {
  name: 'information',
  components: {
    // zSearchBar,
    tabsBar,
    informationCard
  },
  data () {
    return {
      params: {
        current: 1,
        size: 10
      },
      loading: true,
      finished: false,
      mainListData: []
    }
  },
  methods: {
    getList () {
      this.loading = true
      if (!this.params.informationType) return
      getInformationList(this.params).then(({ data }) => {
        this.mainListData = this.mainListData.concat(data.data.records)
        this.loading = false
        this.params.current++
        if (this.params.current > data.data.pages) {
          this.finished = true
        }
      })
    },
    handleDetail ({ id, title }) {
      this.$router.push({
        name: 'informationDetail',
        params: {
          id
        },
        query: {
          name: title
        }
      })
    },
    handleChange ({ label, value }) {
      this.params.informationType = value
      this.params.current = 1
      this.mainListData = []
      if (this.params.informationType) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.informationCard + .informationCard {
  margin-top: 10px;
}
</style>
