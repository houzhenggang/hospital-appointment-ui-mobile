<template>
  <div class="information-card" @click="handleDetail">
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="descn">
        {{ data.simple }}
      </div>
      <div class="info">
        <div v-if="data.author">作者：{{ data.author }}</div>
      </div>
    </div>
    <div class="img-box" v-if="data.smallImage">
      <img class="img" :src="data.smallImage">
    </div>
  </div>
</template>

<script>
export default {
  name: 'informationCard',
  props: {
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
    handleDetail () {
      this.$emit('detail', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.information-card {
  display: flex;
  flex-direction: row;
  padding: 10px;
  > .content {
    width: calc(100vw - 30px - 100px);
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    > .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > .descn {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 12px;
      margin-top: 5px;
      color: #5d5d5d;
    }
    > .info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex: 1;
      align-items: center;
      font-size: 14px;
      color: #666666;
    }
  }
  > .img-box {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
}
</style>
