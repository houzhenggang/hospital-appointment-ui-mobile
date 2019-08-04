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
            <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item.inspResourceId)">
                <div class="left">
                    <!-- <img :src="item.image" alt="" v-if="item.image"> -->
                    <img src="./../../../public/image/order/hospitalBanner.png" alt="">
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
                        <span class="p-text">项目费用</span>
                        <span class="unitPrice">¥{{item.unitPrice}}</span>
                    </div>
                </div>
            </div>
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
                    @cancel="showStartPicker = false"
                    @confirm="onStartConfirm"
                />
            </van-popup>
            <van-popup v-model="showEndPicker" position="bottom">
                <van-datetime-picker
                    v-model="endTimeValue"
                    type="datetime"
                    :min-date="minDate"
                    @cancel="showEndPicker = false"
                    @confirm="onEndConfirm"
                />
            </van-popup>
        </van-popup>
    </div>
</template>


<script>
/* eslint-disable */
import {
  getHospitalList, getHospitalListWithTime
} from '@/api/doctorinspectresource/index'
import {
  getHospitalDict
} from '@/api/doctorhospital/index'
import {
  getInspectionitemDict
} from '@/api/doctorinspectionitem/index'

export default {
    data() {
        return {
            value: '',
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
            hospitalDict: {},
            inspectionitemDict: {}
        }
    },
    async created() {
        this.value = this.$route.query.data
        await this.getHospitalDictValue()
        await this.getInspectionitemDictValue()
        await this.getHospitalLists()
    },
    watch: {
        '$route': 'fetch'
    },
    methods: {
        async fetch() {
            await this.getHospitalLists(this.$route.query.data)
        },
        async getHospitalLists(result) {
            const current = 1
            if (result) {
                this.value = result
            }
            let res = await getHospitalList(this.value, current)
            this.list = res.data.data.records.map(item => {
                this.hospitalDict.forEach(element => {
                    if (item.hospitalId === element.hospitalId) {
                        item.hospitalName = element.name
                    }
                })
                this.inspectionitemDict.forEach(element => {
                    if (item.inspItemId === element.inspItemId) {
                        item.inspItemName = element.inspItemName
                    }
                })
                return item
            })
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
        onSearch() {
            this.getHospitalLists()
            console.log('搜索')
        },
        onCancel() {
            console.log('取消')
        },
        toDetail(inspResourceId) {
            console.log('去医院详情页')
            this.$router.push({ path: '/main/hospitalDetails', query: { inspResourceId: inspResourceId } })
        },
        showPopup() {
            this.show = true;
        },
        onStartConfirm(value) {
            this.startTimeValue = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds()}`
            this.startTime = this.startTimeValue.toString()
            this.showStartPicker = false;
        },
        onEndConfirm(value) {
            this.endTimeValue = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds()}`
            this.endTime = this.endTimeValue.toString()
            this.showEndPicker = false;
        },
        toFilter() {
            this.show = false
            const current = 1

            if (!this.startTime || !this.endTime) {
                this.$notify({
                    message: '请选择开始时间和结束时间',
                    background: '#FF4444'
                })
                return
            }
            // getHospitalListWithTime(this.value, current, this.startTime, '2019-08-03 16:59:58').then((res) => {
            getHospitalListWithTime(this.value, current, this.startTime, this.endTime).then((res) => {
                this.list = res.data.data.records
                console.log(this.list)
            })
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
        .list {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(151,151,151,0.11);
            padding: 15px 18px;
            position: relative;
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
                    margin-right: 21px;
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
}
</style>

