/* eslint-disable */
<template>
    <div id="orderSearch">
        <section class="search">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @search="onSearch"
            />
            <div @click="showPopup" class="filter">筛选</div>
        </section>
        <section class="box">
            <div class="list" v-for="(item,index) in list" :key="index">
                <div class="aaa" @click="toDetail(item.inspResourceId, item.maxUnitPrice)">
                    <div class="left">
                        <img v-if="item.hospitalImage" :src="`/api/${item.hospitalImage}?access_token=${token}`" id="headImg">
                        <img v-else src="./../../../public/image/order/hospitalBanner.png" alt="">
                    </div>
                    <div class="middle">
                        <span class="hospital">{{item.hospitalName}}</span>
                        <span class="hospitalPhone">电话：{{item.hospitalPhone}}</span>
                        <span class="project">{{item.inspItemName}}</span>
                    </div>
                    <div class="right">
                        <div class="r-top">
                            <span class="num" :class="{gray: item.quantity === 0}">{{item.quantity}}</span>
                            <span class="suffix">可预约</span>
                            <van-icon name="arrow"  class="r-arrow"/>
                        </div>
                        <div class="r-bottom">
                            <!--span class="p-text">项目费用</span-->
                            <span class="unitPrice" v-if="item.maxUnitPrice > item.unitPrice">¥{{item.unitPrice}}-{{item.maxUnitPrice}}</span>
                            <span class="unitPrice" v-else>¥{{item.unitPrice}}</span>
                        </div>
                    </div>
                </div>
                <div class="bbb">
                    <div class="text" :class="{choosed: item.open === true}" ref='care'>{{item.inspItemExp}}</div>
                    <div class="openBtn" @click="openText(item, index)" v-if="item.open">展开</div>
                </div>
            </div>
        </section>
        <section class="tips" v-if="type === 'inspItemType' && list.length === 0">
            即将上线
        </section>

        <van-popup
            v-model="show"
            position="top"
            :overlay='false'
            :style="{ height: '100%' }"
            >
            <div class="timeBox">
                <span class="timeText">开始时间</span>
                <van-field
                    readonly
                    clickable
                    :value="startTime.toString()"
                    placeholder="请选择开始时间"
                    @click="showStartPicker = true"
                    class="timeContent"
                />

                <span class="timeText">截止时间</span>
                <van-field
                    readonly
                    clickable
                    :value="endTime.toString()"
                    placeholder="请选择截止时间"
                    @click="showEndPicker = true"
                    class="timeContent"
                />

                <div class="btnGroup">
                    <div class="btn cancelBtn" @click="show = false">取消</div>
                    <div class="btn okBtn" @click="toFilter">确定</div>
                </div>

            </div>

            <van-popup v-model="showStartPicker" position="bottom">
                <van-datetime-picker
                    v-model="startTimeValue"
                    :min-date="minDate"
                    type="date"
                    @cancel="showStartPicker = false"
                    @confirm="onStartConfirm"
                />
            </van-popup>
            <van-popup v-model="showEndPicker" position="bottom">
                <van-datetime-picker
                    v-model="endTimeValue"
                    type="date"
                    :min-date="minDate"
                    @cancel="showEndPicker = false"
                    @confirm="onEndConfirm"
                />
            </van-popup>
        </van-popup>

        <van-pagination
        v-model="currentPage"
        :total-items="total"
        :items-per-page="10"
        :show-page-size="3"
        force-ellipses
        @change="change1"
        class="page"
        />
    </div>
</template>

<script>
/* eslint-disable */
import {
  getHospitalDict
} from '@/api/doctorhospital/index'
import {
  getInspectionitemDict
} from '@/api/doctorinspectionitem/index'
import {
  getHospitalList, getHospitalListWithTime, getHospitalListByType, getHospitalListWithTimeByType
} from '@/api/doctorinspectresource/index'
import store from '@/store'
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            value: '',
            type: '',
            nameId: '',
            show: false,
            showStartPicker: false,
            showEndPicker: false,
            list: [],
            minDate: new Date(),
            currentTime: new Date(),
            startTimeValue: new Date(),
            endTimeValue: new Date(),
            startTime: '',
            endTime: '',
            currentPage: 1,
            total: 0,
            hospitalDict: {},
            inspectionitemDict: {},

            copy: [],
            token: ''
        }
    },
    async created() {
        let value = new Date()
        this.minDate = new Date(value.getTime() + (1000*60*60*24 - 1000))

        this.token = store.getters.access_token
        this.value = this.$route.query.data
        this.type = this.$route.query.type
        this.nameId = this.$route.query.nameId
        await this.getHospitalDictValue()
        await this.getInspectionitemDictValue()
        await this.getHospitalLists()
    },
    watch: {
        '$route' (to, from) {
            if (from.path === '/home/orderInspect' && to.path === '/main/orderSearch') {
                this.fetch()
            }
        }
    },
    methods: {
        async fetch() {
            this.type = this.$route.query.type
            this.nameId = this.$route.query.nameId
            await this.getHospitalLists(this.$route.query.data)
        },
        async getHospitalDictValue() {
            let res = await getHospitalDict()
            this.hospitalDict = res.data.data
            // hospitalDict
        },
        async getInspectionitemDictValue() {
            let res = await getInspectionitemDict()
            this.inspectionitemDict = res.data.data
            // inspectionitemDict
        },
        openText(item, index) {
            this.list[index].open = false
            document.getElementsByClassName('text')[index].setAttribute('class', 'text')
            document.getElementsByClassName('text')[index].nextSibling.style.display = 'none'
        },
        async getHospitalLists(result) {
            const current = this.currentPage
            if (result !== undefined) {
                this.value = result
            }
            let valueCopy = this.value.replace(/%/g, '-')
            let res
            if (this.type === 'inspItemType') {
                res = await getHospitalListByType(this.nameId, current)
            } else {
                res = await getHospitalList(valueCopy, current)
            }
            this.list = res.data.data.records.map(item => {
                this.hospitalDict.forEach(element => {
                    if (item.hospitalId === element.hospitalId) {
                        item.hospitalName = element.name
                    }
                })
                this.inspectionitemDict.forEach(element => {
                    if (item.inspItemId === element.inspItemId) {
                        item.inspItemName = element.inspItemName
                        item.inspItemExp = element.inspItemExp
                    }
                })
                if (item.hospitalImage) {
                    item.hospitalImage = item.hospitalImage.replace('sys-file/', 'sys-file/scale/')
                }
                return item
            })
            this.$nextTick(() => {
                this.copy = this.list.map((ele, index) => {
                    if (this.$refs.care[index].offsetHeight > 34) {
                        ele.open = true
                    } else {
                        ele.open = false
                    }
                    return ele
                })
            })
            setTimeout(() => {
                this.list = this.copy
            }, 1000 / 60)
            this.currentPage = res.data.data.current
            this.total = res.data.data.total
        },
        onSearch() {
            this.currentPage = 1
            this.getHospitalLists()
            console.log('搜索')
        },
        onCancel() {
            console.log('取消')
        },
        toDetail(inspResourceId, maxUnitPrice) {
            console.log('去医院详情页')
            this.$router.push({ path: '/main/hospitalDetails', query: { inspResourceId: inspResourceId, maxUnitPrice: maxUnitPrice } })
        },
        showPopup() {
            this.show = true;
        },
        onStartConfirm(value) {
            this.startTimeValue = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()}`
            this.startTime = this.startTimeValue.toString()
            this.showStartPicker = false;
        },
        onEndConfirm(value) {
            this.endTimeValue = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()}`
            this.endTime = this.endTimeValue.toString()
            this.showEndPicker = false;
        },
        async toFilter() {
            this.show = false
            const current = 1

            if (!this.startTime || !this.endTime) {
                this.$notify({
                    message: '请选择开始时间和结束时间',
                    background: '#FF4444'
                })
                return
            }
            let valueCopy = this.value.replace(/%/g, '-')
            let res
            if (this.type === 'inspItemType') {
                res = await getHospitalListWithTimeByType(this.nameId, current, this.startTime, this.endTime)
            } else {
                res = await getHospitalListWithTime(valueCopy, current, this.startTime, this.endTime)
            }

                this.list = res.data.data.records.map(item => {
                    this.inspectionitemDict.forEach(element => {
                        if (item.inspItemId === element.inspItemId) {
                            item.inspItemName = element.inspItemName
                            item.inspItemExp = element.inspItemExp
                        }
                    })
                    if (item.hospitalImage) {
                        item.hospitalImage = item.hospitalImage.replace('sys-file/', 'sys-file/scale/')
                    }
                    return item
                })

                this.$nextTick(() => {
                    this.copy = this.list.map((ele, index) => {
                            if (this.$refs.care[index].offsetHeight > 34) {
                                ele.open = true
                            } else {
                                ele.open = false
                            }
                            return ele
                        })
                    })
                    setTimeout(() => {
                        this.list = this.copy
                    }, 1000 / 60)

                this.currentPage = res.data.data.current
                this.total = res.data.data.total
        },
        async change1(value) {
            this.currentPage = value
            if (this.startTime && this.endTime) {
                let valueCopy = this.value.replace(/%/g, '-')

            let res
            if (this.type === 'inspItemType') {
                res = await getHospitalListWithTimeByType(this.nameId, value, this.startTime, this.endTime)
            } else {
                res = await getHospitalListWithTime(valueCopy, value, this.startTime, this.endTime)
            }
                this.list = res.data.data.records.map(item => {
                    this.inspectionitemDict.forEach(element => {
                        if (item.inspItemId === element.inspItemId) {
                            item.inspItemName = element.inspItemName
                            item.inspItemExp = element.inspItemExp
                        }
                    })
                    if (item.hospitalImage) {
                        item.hospitalImage = item.hospitalImage.replace('sys-file/', 'sys-file/scale/')
                    }
                    return item
                })

                this.$nextTick(() => {
                    this.copy = this.list.map((ele, index) => {
                            if (this.$refs.care[index].offsetHeight > 34) {
                                ele.open = true
                            } else {
                                ele.open = false
                            }
                            return ele
                        })
                    })
                    setTimeout(() => {
                        this.list = this.copy
                    }, 1000 / 60)

                this.currentPage = res.data.data.current
                this.total = res.data.data.total
            } else {
                this.getHospitalLists()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#orderSearch {
    position: relative;
    width: 100%;
    height: 100%;
    .search {
        position: fixed;
        top: 5px;
        z-index: 2;
        right: 0;
        width: calc(100% - 30px);
        display: flex;
        .van-search {
            flex: 1;
        }
        .filter {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.94px;
            flex: 0 0 50px;
            padding-top: 20px;
        }
    }
    .box {
        padding-top: 20px;
        margin-bottom: 100px;
        .list {
            border-bottom: 1px solid rgba(151,151,151,0.11);
            padding: 15px 18px;
            position: relative;
            .aaa {
                display: flex;
                align-items: center;
                .left {
                    flex: 0 0 24%;
                    width: 24%;
                    height: 18.7vw;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 6px;
                    }
                }
                .middle {
                    flex: 1;
                    span {
                        display: block;
                        margin-left: 10px;
                    }
                    .hospital {
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0.78px;
                    }
                    .hospitalPhone {
                        font-family: PingFangSC-Regular;
                        font-size: 11px;
                        color: #4A4A4A;
                        letter-spacing: 0.71px;
                        margin-top: 4px;
                    }
                    .project {
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0.78px;
                        margin-top: 12px;
                    }
                }
                .right {
                    flex: 0 0 100px;
                    text-align: right;
                    //position: absolute;
                    //right: 10px;
                    //margin-top: 10px;
                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 11px;
                        letter-spacing: 0.71px;
                        text-align: center;
                        line-height: 16px;
                    }
                    .r-top {
                        margin-top: -12px;
                        .num {
                            color: #245EE5;
                            font-size: 13px;
                        }
                        .gray {
                            color: #9B9B9B;
                        }
                        .suffix {
                            color: #000000;
                        }
                        .r-arrow {
                            vertical-align: middle;
                        }
                    }
                    .r-bottom {
                        position: absolute;
                        margin-top: 8px;
                        right: 21px;
                        .p-text {
                            color: #9B9B9B;
                            margin-right: 6px;
                        }
                        .unitPrice {
                            font-size: 15px;
                            color: #ca1249;
                        }
                    }
                }
            }
            .bbb {
                margin-bottom: 5px;
                .open {
                    position: relative;
                    height: 200px;
                }
                .close {
                    position: relative;
                    height: 100px;
                }
                .text {
                    margin-top: 10px;
                    text-align: justify;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #4A4A4A;
                    letter-spacing: 0.78px;
                }
                .choosed {
                    height: 34px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                }
                .openBtn {
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    color: #235FE3;
                    letter-spacing: 0.66px;
                    position: absolute;
                    right: 18px;
                }
            }
        }
    }
    .tips {
        text-align: center;
        margin-top: 30vh;
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #9B9B9B;
        letter-spacing: 0.72px;
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

