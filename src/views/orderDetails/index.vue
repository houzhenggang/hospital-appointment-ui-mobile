/* eslint-disable */
<template>
<div id="orderApplyFor">
    <div>
        <div class="card-list">
            <van-list class="list">
                <van-cell title="预约机构" title-class="leftTitle">
                    <span class="value">{{orderValue.hospitalName}}</span>
                </van-cell>
                <van-cell title="机构电话" title-class="leftTitle">
                    <span class="value">{{orderValue.hospitalPhone}}</span>
                </van-cell>
                <van-cell title="机构地址" title-class="leftTitle">
                    <span class="value">{{orderValue.hospitalAddr}}</span>
                </van-cell>
                <van-cell title="检查项目" title-class="leftTitle">
                    <span class="value">{{orderValue.inspItemName}}</span>
                </van-cell>
                <van-cell title="检查费用" title-class="leftTitle">
                    <span class="value">{{orderValue.feeTotal}}</span>
                </van-cell>
                <van-cell title="注意禁忌症" title-class="leftTitle" :class="{close: flag === true, open: flag === false}">
                    <div class="text" :class="{choosed: flag === true}">{{orderValue.inspItemTaboo}}</div>
                    <div class="openBtn" @click="flag = false" v-if="flag">展开</div>
                </van-cell>
                <van-cell title="就诊人" title-class="leftTitle">
                    <span class="value">{{orderValue.peopleName}}</span>
                </van-cell>
                <van-cell title="手机号" title-class="leftTitle">
                    <span class="value">{{orderValue.peoplePhone}}</span>
                </van-cell>
                <van-cell title="身份证号" title-class="leftTitle">
                    <span class="value">{{orderValue.idCard}}</span>
                </van-cell>
                <van-cell title="预约时间" title-class="leftTitle">
                    <span class="value">{{orderValue.applyTime}}</span>
                </van-cell>
                <!-- <van-cell title="详细时间" title-class="leftTitle">
                    <span class="value">{{orderValue.detailTime}}</span>
                </van-cell> -->
            </van-list>
        </div>
    </div>
</div>
</template>

<script>
import {
  getOrderValue
} from '@/api/doctorapplyorder/index'

import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
        orderValue: {},
        addressStreet: 'addressStreet',
        peopleIdcard: '',
        flag: true
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  created() {
    const applyOrderId = this.$route.query.applyOrderId
    console.log(this.$route)
    this.getOrder(applyOrderId)
  },
  methods: {
    //   open() {
    //       this.flag = false
    //   },
    getOrder(applyOrderId) {
        getOrderValue(applyOrderId).then(res => {
            this.orderValue = res.data.data
        })
    }
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
                flex: 0 0 100px;
            }
            .value {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.78px;
                text-align: center;
            }
            .open {
                position: relative;
                height: 200px;
            }
            .close {
                position: relative;
                height: 100px;
            }
            .text {
                position: fixed;
                left: 0;
                margin-top: 30px;
                padding: 0 20px;
                text-align: justify;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4A4A4A;
                letter-spacing: 0.78px;
            }
            .choosed {
                height: 50px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
            }
            .openBtn {
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #235FE3;
                letter-spacing: 0.66px;
            }
        }
    }
}
</style>
