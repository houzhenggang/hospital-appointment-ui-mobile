<template>
  <van-tabs v-model="active">
    <van-tab v-for="item in tabs" :name="item.value" :key="item.id" :title="item.label"></van-tab>
  </van-tabs>
</template>

<script>
import {
  getDict
} from '@/utils/index'

export default {
  name: 'tabsBar',
  data () {
    return {
      active: '',
      tabs: getDict('INFORMATION_TYPE')
    }
  },
  watch: {
    active (newVal) {
      console.log(this.tabs[newVal])
      this.$emit('change', this.tabs[newVal])
    }
  },
  created () {
    console.log(this.tabs)
  }
}
</script>
