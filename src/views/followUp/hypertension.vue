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
import followUpCardItem from '@/components/followUpCardItem'
import {
  getHypertensionFormPage
} from '@/api/followUpHypertension/index'
import { getStore } from '@/utils/store'
export default {
  name: 'followUpHypertension',
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
  components: {
    followUpCardItem
  },
  methods: {
    onLoad () {
      this.loading = true
      console.log(this.peopleId)
      getHypertensionFormPage({ ...this.params, peopleId: this.peopleId }).then(({ data }) => {
        this.mainListData = this.mainListData.concat(data.data.records)
        this.loading = false
        this.params.current++
        if (this.params.current > data.data.pages) {
          this.finished = true
        }
      })
    },
    handleDetail ({ hypertensionFormId }) {
      this.$router.push({
        path: `/hypertensionFollowUp/${hypertensionFormId}`,
        query: {
          type: 'detail'
        }
      })
    }
  }
}
</script>
