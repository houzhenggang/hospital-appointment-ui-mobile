/* eslint-disable */
<template>
    <div id="hospitalDetails">
        <van-loading size="60px" color="#1989fa" type="spinner" v-if="isLoad" class="load">加载中...</van-loading>
        <div v-else>
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
            <span class="right">{{hospitalValue.phone}}</span>
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
                    <van-collapse v-model="activeNames" accordion v-if="thisWeek.length > 0">
                        <van-collapse-item :name="lIndex" v-for="(lItem, lIndex) in thisWeek" :key="lIndex" class="list">
                            <div slot="title" class="v-title" @click="toGetGroupDetail(lItem,lIndex)">
                                <div class="left">{{lItem.inspItemDate + ' ' + lItem.inspItemWeek + ' ' + lItem.inspItemAp}}</div>
                                <div class="right" v-if="lItem.quantity === 0">已满</div>
                                <div class="right exist" v-if="lItem.quantity > 0">有空缺</div>
                            </div>
                            <div class="content">
                                <div v-for="(tItem, tIndex) in timeList" :key="tIndex" class="tList">
                                    <div class="timeSlot">{{tItem.period}}</div>
                                    <div class="noNum" v-if="tItem.quantity === 0">已满</div>
                                    <div class="seatNum" v-if="tItem.quantity > 0" @click="order(tItem)">预约</div>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                    <div v-else class="tips">暂无数据</div>
                </van-tab>
            </van-tabs> 
        </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  hospitalDetail, timeGroupDetail, groupDetail
} from '@/api/doctorinspectresource/index'
import {
  hospitalData, getHospitalDict
} from '@/api/doctorhospital/index'
import {
  getInspectionitemDict
} from '@/api/doctorinspectionitem/index'
export default {
    data() {
        return {
            formData: {},
            currentTime: '',
            value: '',
            activeNames: ['0'],
            hospitalValue: {},
            hospitalDict: {},
            timeGroup: {},
            tabList: [{
                title: '近7天'
            }, {
                title: '未来7-14天'
            }],
            thisWeek:[{
                title: '8月21日  星期三 下午',
                num: 0
            }, {
                title: '8月22日  星期四 下午',
                num: 2
            }],
            timeList: {},
            hospitalDict: {},
            inspectionitemDict: {},
            isLoad: true
        }
    },
    async created() {
        let value = new Date()
        this.currentTime = '今天是' + `${value.getFullYear() + '年' + (value.getMonth() + 1) + '月' + value.getDate() + '日'}` + ' 星期'+'日一二三四五六'.charAt(new Date().getDay())
        console.log(this.currentTime)

        const id = this.$route.query.inspResourceId
        await this.getHospitalDictData()
        await this.getInspectionitemDictValue()
        await this.getHospitalDetail(id)
        await this.getHospitalData()
        await this.getTimeGroup()
    },
    methods: {
        async getInspectionitemDictValue() {
            let res = await getInspectionitemDict()
            this.inspectionitemDict = res.data.data
            // inspectionitemDict
        },
        async getHospitalDetail(value) {
            let res = await hospitalDetail(value)
            this.formData = res.data.data

            this.hospitalDict.forEach(element => {
                if (this.formData.hospitalName === element.hospitalId) {
                    this.formData.hospitalId = element.hospitalId
                    this.formData.hospitalName = element.name
                }
            })


            this.inspectionitemDict.forEach(element => {
                if (this.formData.inspItemName === element.inspItemId) {
                    this.formData.inspItemName = element.inspItemName
                }
            })
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
        async getTimeGroup(name) {
            let value = new Date()
            let startValue, startDate, endValue, endDate
            if (!name || name === 0) {
                // 近一周
                startDate = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()}`
                endValue = new Date(value.getTime() + 1000*60*60*24*7)
                endDate = `${endValue.getFullYear() + '-' + (endValue.getMonth() + 1) + '-' + endValue.getDate()}`
            } else {
                // 下一周
                startValue = new Date(value.getTime() + 1000*60*60*24*8)
                startDate = `${startValue.getFullYear() + '-' + (startValue.getMonth() + 1) + '-' + startValue.getDate()}`
    
                endValue = new Date(value.getTime() + 1000*60*60*24*15)
                endDate = `${endValue.getFullYear() + '-' + (endValue.getMonth() + 1) + '-' + endValue.getDate()}`
            }
            let hospitalId = this.formData.hospitalId
            let inspItemId = this.formData.inspItemId
            let res = await timeGroupDetail(startDate, endDate, hospitalId, inspItemId)
            this.thisWeek = res.data.data
            this.isLoad = false
            console.log(res)
        },
        async toGetGroupDetail(value, index) {
            await this.getGroupDetail(value, index)
        },
        getGroupDetail(value, index) {
            groupDetail(value.inspItemDate, value.inspItemAp, this.formData.hospitalId, this.formData.inspItemId).then(res => {
                console.log(res)
            this.timeList = res.data.data.map(item => {
                switch(item.period) {
                    case '1': 
                        item.period = '8:00-9:00'
                        break
                    case '2': 
                        item.period = '9:00-10:00'
                        break
                    case '3': 
                        item.period = '10:00-11:00'
                        break
                    case '4': 
                        item.period = '11:00-12:00'
                        break
                    case '5': 
                        item.period = '13:00-14:00'
                        break
                    case '6': 
                        item.period = '14:00-15:00'
                        break
                    case '7': 
                        item.period = '15:00-16:00'
                        break
                    case '8': 
                        item.period = '16:00-17:00'
                        break
                }
                return item
            })
            this.thisWeek[index].timeList = this.timeList
            console.log(this.thisWeek)
            })
        },
        aaa(value) {
            console.log(value)
        },
        onClick(name, title) {
            console.log(name)
            console.log(title)
            // 更改条件，显示不同的列表
            this.getTimeGroup(name)
        },
        order(value) {
            console.log(value)
            console.log('预约')
            this.$router.push({ name: '预约申请', params: { formData: this.formData, inspResourceId: this.$route.query.inspResourceId, timeDetail: value, address: this.hospitalValue.address } })
            // this.$router.push({ path: '/main/orderApplyFor', query: { formData: this.formData } })
        }
    } 
}
</script>

<style lang="scss" scoped>
#hospitalDetails {
    background: #F3F3F3;
    height: 100%;
    .load {
        top: 40%;
        left: calc(50% - 30px);
    }
    .TopTitle {
        position: fixed;
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
        .tips {
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #9B9B9B;
            letter-spacing: 0.72px;
            text-align: center;
            margin-top: 84px;
        }
    }
}
</style>

