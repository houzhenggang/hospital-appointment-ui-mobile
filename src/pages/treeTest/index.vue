<template>
  <div id="treeTest">
    <van-button type="primary" @click="handlePackageSelect">选择套餐</van-button>
    <treeSelect
      ref="treeSelect"
      title="套餐选择"
    />
  </div>
</template>

<script>
import treeSelect from '@/components/treeSelect'

export default {
  name: 'treeTest',
  components: {
    treeSelect
  },
  data () {
    return {

    }
  },
  methods: {
    handlePackageSelect () {
      this.$refs['treeSelect'].open()
    }
  }
}
</script>

<style lang="scss">
#treeTest {
}
</style>
