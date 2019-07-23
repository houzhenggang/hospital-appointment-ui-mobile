<template>
  <div id="servicepackage">
    <van-cell v-for="(t, i) in formList" :key="i" :title="t.name">
      <span v-if="t.dict">{{transformatDict(data[t.value], t.dict)}}</span>
      <span v-else>{{data[t.value]}}</span>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    dictMap: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    transformatDict (value, type) {
      for (let item of this.dictMap[type]) {
        if (value === item.id) {
          return item.name
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#servicepackage {
  .servicepackage-item {
    padding:  10px 0 15px 20px;
    border-bottom: 1px solid #ddd;
    .head {
      margin-bottom: 10px;
      display: flex;
      .title {
        flex: 1;
        div {
          font-size: 14px;
          font-weight: 100;
          margin-bottom: 5px;
          color: #000;
        }
      }
      .success {
        color: #f44;
        width: 30px;
        display: none;
      }
      .show {
        display: block;
      }
    }
    .attention {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
