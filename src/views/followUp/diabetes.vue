<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
    <followUpCardItem
      v-for="item in mainListData"
      :key="item.id"
      :data="item"
      @detail="handleDetail"
    />
  </van-list>
</template>

<script>
import {
  getDiabetesPage
} from '@/api/followUpDiabetes/index'
import followUpCardItem from '@/components/followUpCardItem'
import { getStore } from '@/utils/store'

export default {
  name: 'diabetes',
  components: {
    followUpCardItem
  },
  data () {
    return {
      mainListData: [],
      params: { current: 1, size: 10 },
      loading: false,
      finished: false
    }
  },
  computed: {
    peopleId () {
      return getStore({ name: 'peopleId' })
    }
  },
  methods: {
    onLoad () {
      this.loading = true
      getDiabetesPage({ ...this.params, peopleId: this.peopleId }).then(({ data }) => {
        this.mainListData = this.mainListData.concat(data.data.records)
        this.loading = false
        this.params.current++
        if (this.params.current > data.data.pages) {
          this.finished = true
        }
      })
    },
    handleDetail ({ diabetesFormId }) {
      this.$router.push({
        path: `/diabetesFollowUp/${diabetesFormId}`,
        query: {
          type: 'detail'
        }
      })
    }
  },

  created () {

  }
}
</script>
