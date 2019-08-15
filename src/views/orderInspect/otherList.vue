/* eslint-disable */
<template>
    <div id="otherList">
        <section class="box">
            <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
                <div class="left">
                    <img src="./../../../public/image/order/hospitalBanner.png" alt="">
                </div>
                <div class="right">
                    <span class="inspItemName">{{item.inspItemName}}</span>
                    <div class="remark">{{item.remark}}</div>
                    <div class="r-bottom">
                        <span class="p-text">项目费用</span>
                        <span class="unitPrice" v-if="item.maxUnitPrice > item.unitPrice">¥{{item.unitPrice}}-{{item.maxUnitPrice}}</span>
                        <span class="unitPrice" v-else>¥{{item.unitPrice}}</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
/* eslint-disable */
import {
  getInslList
} from '@/api/doctorinspectresource/index'

export default {
    data() {
        return {
            list: []
        }
    },
    async created() {
        await this.getInslListValue()
    },
    watch: {
        '$route': 'getInslListValue'
    },
    methods: {
        async getInslListValue() {
            let res = await getInslList()
            this.list = res.data.data
        },
        toDetail(item) {
            this.$router.push({ path: '/main/orderSearch', query: { data: item.inspItemName } })
        }
    }
}
</script>

<style lang="scss" scoped>
#otherList {
    position: relative;
    width: 100%;
    height: 100%;
    .box {
        padding-top: 20px;
        margin-bottom: 40px;
        .list {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(151,151,151,0.11);
            padding: 15px 18px;
            position: relative;
            .left {
                flex: 0 0 24%;
                width: 24%;
                img {
                    width: 90px;
                    height: 110px;
                    border-radius: 6px;
                }
            }
            .right {
                flex: 1;
                margin-left: 13px;
                .inspItemName {
                    display: block;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0.78px;
                }
                .remark {
                    // display: block;
                    margin-top: 6px;
                    // font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #9B9B9B;
                    letter-spacing: 0.72px;
                    text-align: justify;
                    font-family: PingFangSC-Regular;
                    max-height: 48px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                }
                .r-bottom {
                    margin-top: 10px;
                    .p-text {
                        margin-right: 6px;
                        font-family: PingFangSC-Medium;
                        font-size: 11px;
                        color: #9B9B9B;
                        letter-spacing: 0.72px;
                    }
                    .unitPrice {
                        font-size: 15px;
                        color: #ca1249;
                    }
                }
            }
        }
    }
    .van-popup {
        top: 60px;
    }
    .timeBox {
        padding: 18px 27px;
        .timeText {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0.71px;
        }
        .timeContent {
            margin-top: 9px;
            margin-bottom: 17px;
            background: #F3F3F3;
            border: 1px solid rgba(151,151,151,0.15);
        }
        .btnGroup {
            display: flex;
            justify-content: space-between;
            margin-top: 33px;
            .btn {
                width: 38.4vw;
                height: 10vw;
                text-align: center;
                line-height: 10vw;
                border-radius: 8px;
            }
            .cancelBtn {
                background: #FFFFFF;
                border: 1px solid rgba(151,151,151,0.51);
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.94px;
            }
            .okBtn {
                background: #235FE3;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0.94px;


            }
        }
    }
    .page {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #FFF;
    }
}
</style>

