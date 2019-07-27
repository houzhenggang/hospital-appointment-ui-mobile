/* eslint-disable */
<template>
<div id="orderApplyFor">
    <div>
        <div class="card-list">
            <van-list class="list">
                <van-cell v-for="(item, index) in cardList" :key="index" :title="item.name" title-class="leftTitle">
                    <span class="value">{{item.value}}</span>
                </van-cell>
            </van-list>
            <div @click="sumbit" class="btn">提交申请</div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import {
  cardList
} from './const'

export default {
  data () {
    return {
      cardList: cardList
    }
  },
  methods: {
    sumbit () {
      this.$router.push({ path: '/main/orderApplyForWait' })
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
#orderApplyFor {
    background: #F3F3F3;
    height: 100%;
    .card-list {
        padding-top: 15px;
        .list {
            background: #FFF;
            .leftTitle {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0.78px;
            }
            .value {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.78px;
                text-align: center;
            }
        }
        .btn {
            width: 61vw;
            height: 10vw;
            line-height: 10vw;
            border-radius: 8px;
            margin: 0 auto;
            text-align: center;
            background: #235FE3;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0.94px;
            margin-top: 31px;
        }
    }
}
</style>
