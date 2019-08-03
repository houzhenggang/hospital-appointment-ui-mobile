/* eslint-disable */
<template>
    <div id="orderRecord">
        <van-tabs @click="onClick" color='#235FE3'>
            <van-tab v-for="(item,index) in tabList" :title="item.title" :key="index">
                <div v-if="list.length > 0">
                    <div v-for="(lItem, lIndex) in list" :key="lIndex" class="list">
                        <div class="top" @click="toDetails(lItem.applyOrderId)">
                            <div class="part">
                                <div class="left">预约项目</div>
                                <div class="right">{{lItem.inspItemName}}</div>
                            </div>
                            <div class="part">
                                <div class="left">预约时间</div>
                                <div class="right">{{lItem.applyTime}}</div>
                            </div>
                            <div class="part">
                                <div class="left">预约机构</div>
                                <div class="right">{{lItem.hospitalName}}</div>
                            </div>
                            <div class="part">
                                <div class="left">预约人</div>
                                <div class="right">{{lItem.peopleName}}</div>
                            </div>
                        </div>
                        <div class="bottom">
                            <span class="left">项目费用</span>
                            <span class="middle">¥{{lItem.feeTotal}}</span>
                            <button class="right" @click="cancelOrder(lItem)" v-if="tabNum === 0">取消</button>
                        </div>
                    </div>
                </div>
                <div v-else class="tips">暂无数据</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
/* eslint-disable */
import { Dialog, Toast } from 'vant';
import {
  getOrders, updateOrder
} from '@/api/doctorapplyorder/index'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            tabList: [{
                title: '已预约',
                orderState: 10,
            }, {
                title: '已检查',
                orderState: 50,
            }, {
                title: '已过期',
                orderState: 30,
            }, {
                title: '已取消',
                orderState: 40
            }],
            list: [],
            peopleId: '',
            tabNum: 0
        }
    },
    async created() {
        await this.getInfo()
        await this.getOrdersList(this.peopleId, 10)
    },
    computed: {
        ...mapGetters(['user_info'])
    },
    methods: {
        async getOrdersList(peopleId, id) {
            let res = await getOrders(this.peopleId, id)
            // console.log(res.da)
            this.list = res.data.data.records
        },
        async getInfo() {
            let value = await getUserInfo(this.user_info.userId)
            this.peopleId = value.data.data.peopleId
            console.log(this.peopleId)
            // .then(res => {
            //     this.formData = res.data.data
            // })
        },
        onClick(name, title) {
            console.log(name)
            console.log(title)

            this.tabNum = name
            if (title === '已检查') {
                this.getOrdersList(this.peopleId, 50)
            } else {
                this.getOrdersList(this.peopleId, (name +1) * 10)
            }
            // 更改条件，显示不同的列表
        },
        cancelOrder(value) {
            // applyOrderId 和 orderState
            const data = {
                applyOrderId: value.applyOrderId,
                orderState: 40
            }
            Dialog.confirm({
                message: '是否要取消预约'
            }).then(() => {
            // on confirm
                updateOrder(data).then(res => {
                    this.getOrdersList(this.peopleId, 10)
                    Toast('取消成功');
                }).catch(err => {
                    Toast('取消失败');
                })
                
            }).catch(() => {
            // on cancel
            });
        },
        toDetails(applyOrderId) {
            this.$router.push({ name: '预约详情', query: {applyOrderId: applyOrderId}})
            // this.$router.push({ name: '预约详情', params: { formData: this.formData, inspResourceId: this.$route.query.inspResourceId } })
        }
    }
}
</script>

<style lang="scss" scoped>
#orderRecord {
    background: #F7F7F7;
    height: 100%;
    .list {
        height: 44vw;
        margin: 0 auto;
        background: #FDFDFD;
        margin: 20px;
        border-radius: 4px;
        box-shadow: 0 0 12px #8e8d8da3;
        .top {
            padding-left: 21px;
            padding-top: 14px;
            .part {
                display: flex;
                margin-top: 5px;
                .left {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #9B9B9B;
                    letter-spacing: 0.89px;
                    flex: 0 0 60px;
                    margin-right: 28px;
                }
                .right {
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0.89px;
                    text-align: center;
                }
            }
        }
        .bottom {
            display: flex;
            margin-top: 14px;
            padding-top: 10px;
            border-top: 1px dashed #afaeb0;
            .left {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #9B9B9B;
                letter-spacing: 0.89px;
                text-align: center;
                padding-left: 21px;
                flex: 0 0 60px;
                margin-right: 28px;
            }
            .middle {
                flex: 1;
                text-align: left;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #D0021B;
                letter-spacing: 0.89px;
            }
            .right {
                background: #FFFFFF;
                border: 1px solid #235FE3;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #235FE3;
                letter-spacing: 0.89px;
                text-align: center;
                flex: 0 0 67px;
                margin-right: 30px;
                text-align: center;
                border-radius: 4px;
            }
        }
    }
    .tips {
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #9B9B9B;
        letter-spacing: 0.72px;
        text-align: center;
        margin-top: 40%;
    }
}
</style>


