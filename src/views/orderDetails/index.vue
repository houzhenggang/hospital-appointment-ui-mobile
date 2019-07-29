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
                    <span class="value">{{addressStreet}}</span>
                </van-cell>
                <van-cell title="检查项目" title-class="leftTitle">
                    <span class="value">{{orderValue.inspItemName}}</span>
                </van-cell>
                <van-cell title="检查费用" title-class="leftTitle">
                    <span class="value">{{orderValue.feeTotal}}</span>
                </van-cell>
                <van-cell title="预约人" title-class="leftTitle">
                    <span class="value">{{orderValue.peopleName}}</span>
                </van-cell>
                <van-cell title="手机号" title-class="leftTitle">
                    <span class="value">{{orderValue.peoplePhone}}</span>
                </van-cell>
                <van-cell title="身份证号" title-class="leftTitle">
                    <span class="value">{{peopleIdcard}}</span>
                </van-cell>
                <van-cell title="预约时间" title-class="leftTitle">
                    <span class="value">{{orderValue.detailTime}}</span>
                </van-cell>
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
            }
            .value {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.78px;
                text-align: center;
            }
        }
    }
}
</style>
