/* eslint-disable no-unused-vars */
<template>
<div id="orderApplyFor">
    <div>
        <div class="card-list">
            <van-list>
                <van-cell v-for="(item, index) in cardList" :key="index" :title="item.name">
                    <span>{{item.value}}</span>
                </van-cell>
            </van-list>
            <div @click="sumbit" class="btn">提交</div>
        </div>
    </div>
</div>
</template>

<script>
import {
  cardList,
} from './const'

export default {
  data () {
    return {
      cardList: cardList
    }
  },
  methods: {
    sumbit () {
        console.log('提交')
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.btn {
    width: 80px;
    border: 1px solid;
    margin: 0 auto;
    text-align: center;
}
</style>
