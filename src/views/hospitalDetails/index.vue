/* eslint-disable */
<template>
    <div id="hospitalDetails">
        <div class="TopTitle">{{formData.hospitalName}}</div>
        <div class="banner">
            <img src="./../../../public/image/order/hospitalBanner.png" alt="" class="bitmap">
        </div>
        <div class="message">
                <img src="./../../../public/image/order/map.png" alt="" class="left">
                <span class="right">{{hospitalValue.address}}</span>
        </div>
        <div class="message">
            <img src="./../../../public/image/order/phone.png" alt=""  class="left">
            <span class="right">{{formData.hospitalPhone}}</span>
        </div>
        <div class="project">
            <div class="left">
                <div class="title">
                    <div class="flag"></div>
                    <span class="title-t">检查项目及费用</span>
                </div>
                <span class="p-name">{{formData.inspItemName}}</span>
            </div>
            <div class="right">
                <span class="r-text">项目费用</span>
                <span class="r-price">¥{{formData.unitPrice}}</span>
                <!-- <img src="./../../../public/image/order/rightArrow.png" alt="" class="r-arrow"> -->
            </div>
        </div>
        <div class="orderTime">
            <div class="project">
                <div class="left">
                    <div class="title">
                        <div class="flag"></div>
                        <span class="title-t">选择预约时间</span>
                    </div>
                </div>
                <div class="right">
                    <span class="r-text">{{this.currentTime}}</span>
                </div>
            </div>

            <van-tabs @click="onClick" color='#245EE5' :line-width=24>
                <van-tab v-for="(item,index) in tabList" :title="item.title" :key="index">
                    <van-collapse v-model="activeNames">
                        <van-collapse-item :name="lIndex" v-for="(lItem, lIndex) in thisWeek" :key="lIndex" class="list">
                            <div slot="title" class="v-title">
                                <div class="left">{{lItem.title}}</div>
                                <div class="right" v-if="lItem.num === 0">已满</div>
                                <div class="right exist" v-if="lItem.num > 0">有空缺</div>
                            </div>
                            <div class="content">
                                <div v-for="(tItem, tIndex) in timeList" :key="tIndex" class="tList">
                                    <div class="timeSlot">{{tItem.timeSlot}}</div>
                                    <div class="noNum" v-if="tItem.num === 0">已满</div>
                                    <div class="seatNum" v-if="tItem.num > 0" @click="order">预约</div>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </van-tab>
            </van-tabs> 
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  hospitalDetail
} from '@/api/doctorinspectresource/index'
import {
  hospitalData, getHospitalDict
} from '@/api/doctorhospital/index'
export default {
    data() {
        return {
            formData: {},
            currentTime: '',
            value: '',
            activeNames: ['0'],
            hospitalValue: {},
            hospitalDict: {},
            tabList: [{
                title: '近一周'
            }, {
                title: '下一周'
            }],
            thisWeek:[{
                title: '8月21日  星期三 下午',
                num: 0
            }, {
                title: '8月22日  星期四 下午',
                num: 2
            }],
            nextWeek: [{
                title: '8月25日  星期三 下午',
                num: 0
            }, {
                title: '8月26日  星期四 下午',
                num: 2
            }],
            timeList: [{
                timeSlot: '8:00-9:00',
                num: 1
            }, {
                timeSlot: '9:00-10:00',
                num: 0
            }, {
                timeSlot: '10:00-11:00',
                num: 13
            }, {
                timeSlot: '11:00-12:00',
                num: 3
            }]
        }
    },
    async created() {
        let value = new Date()
        this.currentTime = '今天是' + `${value.getFullYear() + '年' + (value.getMonth() + 1) + '月' + value.getDate() + '日'}` + ' 星期'+'日一二三四五六'.charAt(new Date().getDay())
        console.log(this.currentTime)

        const id = this.$route.query.inspResourceId
        await this.getHospitalDetail(id)
        await this.getHospitalData()
        await this.getHospitalDictData()
    },
    methods: {
        async getHospitalDetail(value) {
            let res = await hospitalDetail(value)
            this.formData = res.data.data
        },
        async getHospitalData() {
            const result = this.formData.hospitalId
            let res = await hospitalData(result)
            this.hospitalValue = res.data.data
        },
        async getHospitalDictData() {
            let res = await getHospitalDict()
            this.hospitalDict = res.data.data
            console.log(this.hospitalDict)
        },
        onClick(name, title) {
            console.log(name)
            console.log(title)
            // 更改条件，显示不同的列表
        },
        order() {
            console.log('预约')
            this.$router.push({ name: '预约申请', params: { formData: this.formData, inspResourceId: this.$route.query.inspResourceId } })
            // this.$router.push({ path: '/main/orderApplyFor', query: { formData: this.formData } })
        }
    }
}
</script>

<style lang="scss" scoped>
#hospitalDetails {
    background: #F3F3F3;
    height: 100%;
    .TopTitle {
        position: absolute;
        top: 20px;
        z-index: 3;
        left: 50%;
        transform: translateX(-50%);
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #072E48;
        letter-spacing: 0.83px;
        text-align: center;
    }
    .banner {
        width: 100%;
        height: 38.67vw;
        .bitmap {
            width: 100%;
            height: 100%;
        }
    }
    .message {
        padding: 11px 18px;
        border-bottom: 1px solid #f7f7f7;
        background: #FFF;
        &:last-child {
            border-bottom: 0px;
        }
        .left {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 8px;
        }
        .right {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #4A4A4A;
            letter-spacing: 0.72px;
        }
    }
    .project {
        background: #FFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 18px;
        margin-top: 10px;
        .left {
            .title {
                .flag {
                    width: 8px;
                    height: 8px;
                    background: #245EE5;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 6px;
                }
                .title-t {
                    font-family: PingFangSC-Medium;
                    font-size: 13px;
                    color: #4A4A4A;
                    letter-spacing: 0.67px;
                }
            }
            .p-name {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #072E48;
                letter-spacing: 0.78px;
                margin-top: 6px;
                padding-left: 15px;
            }
        }
        .right {
            .r-text {
                font-family: PingFangSC-Medium;
                font-size: 11px;
                color: #9B9B9B;
                letter-spacing: 0.72px;
            }
            .r-price {
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #ca1249;
                letter-spacing: 0.72px;
                line-height: 16px;
                padding: 4px;
            }
            .r-arrow {
                width: 15px;
                height: 15px;
                vertical-align: middle;
            }
        }
    }
    .orderTime {
        .list {
            margin-top: 8px;
            .v-title {
                display: flex;
                justify-content: space-between;
                .left {
                    font-family: PingFangSC-Medium;
                    font-size: 13px;
                    color: #4A4A4A;
                    letter-spacing: 0.72px;
                }
                .right {
                    font-family: PingFangSC-Regular;
                    font-size: 13px;
                    color: #9B9B9B;
                    letter-spacing: 0.72px;
                }
                .exist {
                    color: #245EE5;
                }
            }
        }
        .content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .tList {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 38.6vw;
                height: 6.4vw;
                line-height: 6.4vw;
                margin-top: 8px;
                .timeSlot {
                    flex: 1; 
                    font-family: PingFangSC-Regular;
                    font-size: 13px;
                    color: #3259CE;
                    letter-spacing: 0.72px;
                    text-align: center;
                    background: rgba(74,144,226,0.16);
                }
                .seatNum {
                    flex: 0 0 36.3%;
                    font-family: PingFangSC-Regular;
                    font-size: 13px;
                    color: #FFFFFF;
                    letter-spacing: 0.72px;
                    background: #245EE5;
                    text-align: center;
                }
                .noNum {
                    flex: 0 0 36.3%;
                    font-family: PingFangSC-Regular;
                    font-size: 13px;
                    color: #FFFFFF;
                    letter-spacing: 0.72px;
                    text-align: center;
                    background: #D8D8D8;
                }
            }
        }
    }
}
</style>

