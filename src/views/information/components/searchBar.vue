<template>
  <div class="z-search-bar">
    <div class="search-content">
      <i class="iconfont zmt-sousuo-copy"></i>
      <input type="search" autocomplete="off" autofocus v-model="searchText" @keyup.enter="handleSubmit" ref="searchInput">
      <i class="clear-btn iconfont zmt-guanbi2" v-if="searchText" @click="handleClear"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-search-bar',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    handleClear () {
      this.searchText = ''
    },
    handleSubmit () {
      this.$toast(this.searchText)
      this.$emit('search', this.searchText)
    }
  }
}
</script>

<style lang="scss" scoped>
.z-search-bar {
  height: 46px;
  background: #2458ff;
  display: flex;
  align-items: center;
  justify-content: center;
  .search-content {
    position: relative;
    background: #ffffff;
    height: 35px;
    width: 85vw;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    border-radius: 5px;
    * {
      padding: 0;
      margin: 0;
    }
    input[type="search"] {
      border: none;
    }
    .iconfont {
      display: block;
      height: 100%;
      width: 35px;
      text-align: center;
      line-height: 35px;
    }
    input[type="search"] {
      -webkit-appearance: none;
    }
    input::-webkit-search-cancel-button {
      display: none;
    }
    input {
      line-height: 35px;
      height: 100%;
      flex: 1;
    }
    .clear-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgb(105, 105, 105);
      color: #ffffff;
      height: 15px;
      width: 15px;
      line-height: 15px;
      font-size: 12px;
      border-radius: 50%;
    }
  }
}
</style>
