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
            </van-list>
            <div class="careful">
                <div class="label">注意禁忌症</div>
                <div class="text" :class="{choosed: flag === true}" ref='care'>{{orderValue.inspItemTaboo}}</div>
                <div class="openBtn" @click="flag = false" v-if="flag">展开</div>
            </div>
            <van-list>
                <van-cell title="就诊人" title-class="leftTitle">
                    <span class="value">{{orderValue.peopleName}}</span>
                </van-cell>
                <van-cell title="手机号" title-class="leftTitle">
                    <span class="value">{{orderValue.peoplePhone}}</span>
                </van-cell>
                <van-cell title="身份证号" title-class="leftTitle">
                    <span class="value">{{orderValue.peopleIdcard}}</span>
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
        flag: false
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
            this.$nextTick(() => {
                setTimeout(() => {
                    if (this.$refs.care.offsetHeight > 50) {
                        this.flag = true
                    }
                }, 100)
            })
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
        }
        .careful {
            padding-bottom: 10px;
            margin-bottom: 10px;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid #eaeaea;
            background: #FFF;
            position: relative;
            .label {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0.78px;
                padding-top: 16px;
            }
            .text {
                margin-top: 10px;
                text-align: justify;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4A4A4A;
                letter-spacing: 0.78px;
            }
            .open {
                position: relative;
                height: 200px;
            }
            .close {
                position: relative;
                height: 100px;
            }
            .choosed {
                height: 50px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .openBtn {
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #235FE3;
                letter-spacing: 0.66px;
                position: absolute;
                top: 18px;
                right: 10px;
            }
        }
    }
}
</style>
