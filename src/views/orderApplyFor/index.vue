/* eslint-disable */
<template>
<div id="orderApplyFor">
    <div>
        <div class="card-list">
            <van-list class="list">
                <van-cell title="预约机构" title-class="leftTitle">
                    <span class="value">{{hospitalName}}</span>
                </van-cell>
                <van-cell title="机构电话" title-class="leftTitle">
                    <span class="value">{{hospitalPhone}}</span>
                </van-cell>
                <van-cell title="机构地址" title-class="leftTitle">
                    <span class="value">{{addressStreet}}</span>
                </van-cell>
                <van-cell title="检查项目" title-class="leftTitle">
                    <span class="value">{{inspItemName}}</span>
                </van-cell>
                <van-cell title="检查费用" title-class="leftTitle">
                    <span class="value">{{unitPrice}}</span>
                </van-cell>
            </van-list>
            <div class="careful">
                <div class="label">注意禁忌症</div>
                <div class="text" :class="{choosed: open === true}" ref='care'>{{inspItemTaboo}}</div>
                <div class="openBtn" @click="open = false" v-if="open">展开</div>
            </div>

            <div class="login-input">
                <div class="label">就诊人</div>
                <div class="l-right">
                    <div class="text">
                        <van-field
                            readonly
                            clickable
                            :value="applyerinfo.applyerName"
                            placeholder="请选择"
                            @click="showPatientPicker = true"
                            class="sexField"
                        />
                        <van-popup v-model="showPatientPicker" position="bottom" class="cityPicker">
                            <van-picker
                            show-toolbar
                            :columns="patientColumns"
                            @cancel="showPatientPicker = false"
                            @confirm="onPatientConfirm"
                            />
                        </van-popup>
                    </div>
                    <van-icon name="arrow" class="r-arrow" />
                </div>
            </div>
            <van-list>
                <!-- <van-cell title="就诊人" title-class="leftTitle">
                    <span class="value">{{user_info.username}}</span>
                </van-cell> -->
                <van-cell title="手机号" title-class="leftTitle">
                    <span class="value">{{applyerinfo.phone}}</span>
                </van-cell>
                <van-cell title="身份证号" title-class="leftTitle">
                    <span class="value">{{applyerinfo.idCard}}</span>
                </van-cell>
                <van-cell title="预约时间" title-class="leftTitle">
                    <span class="value">{{apply_time}}</span>
                </van-cell>
            </van-list>
            <!-- <div class="login-input">
                <div class="label">详细时间</div>
                <div class="l-right">
                    <div class="span span-sex">
                        <van-field
                            readonly
                            clickable
                            :value="detailTime"
                            placeholder="       请选择预约详细时间"
                            @click="showPicker = true"
                            class="sexField"
                        />
                        <van-popup v-model="showPicker" position="bottom" class="cityPicker">
                            <van-picker
                            show-toolbar
                            :columns="timeColumns"
                            @cancel="showPicker = false"
                            @confirm="onConfirm"
                            />
                        </van-popup>
                    </div>
                    <van-icon name="arrow" class="r-arrow" />
                </div>
            </div> -->
            <div @click="timeControl" class="btn">提交申请</div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
// import {
//   cardList
// } from './const'
import {
  addOrder
} from '@/api/doctorapplyorder/index'
import {
  hospitalDetail
//   , getDetailTime
} from '@/api/doctorinspectresource/index'
import {
  inspitemTips
} from '@/api/doctorinspectionitem/index'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import {
  getPatientInfoList
} from '@/api/applyerinfo/index'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
    //   cardList: cardList,
        hospitalName: '南京第一人民医院',
        hospitalPhone: '13000001111',
        addressStreet: '',
        inspItemName: '血常规',
        unitPrice: '0',
        name: '张三',
        iphone: '13000001111',
        idCard: '',
        apply_time: '2019年8月21日 8:00-9:00',
        userValue: {},
        hospitalValue: {},
        // detailTime: '',
        // showPicker: false,
        // timeColumns: [],
        // detailTimeList: {},
        startTime: '',
        endTime: '',
        inspResourceId: '',
        lastTime: new Date().getTime(),
        nowTime: '',
        flag: false,
        open: false,
        inspItemTaboo: '',
        showPatientPicker: false,
        patientColumns: [],
        applyerinfoList: [],
        applyerinfo: []
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  async created() {
    this.addressStreet = this.$route.query.address

    this.hospitalName =  this.$route.query.hospitalName
    this.hospitalPhone =  this.$route.query.hospitalPhone
    this.inspItemName =  this.$route.query.inspItemName
    this.unitPrice =  this.$route.query.unitPrice

    const id = this.$route.query.inspResourceId
    await this.getInfo()
    await this.getHospitalDetail(id)
    await this.getInspitemTips()

    let str = this.$route.query.inspItemDate
    let result = str.replace(/-/,'年').replace(/-/,'月').concat('日')
    this.apply_time = result + ' ' + this.$route.query.period

    this.inspResourceId = this.$route.query.inspResourceId
    this.getDetailTimeList()
    await this.getPatientList()
    if (this.$refs.care.offsetHeight > 50) {
        this.open = true
    }
  },
  methods: {
        async getInspitemTips() {
            let id = this.hospitalValue.inspItemId
            let res = await inspitemTips(id)
            this.inspItemTaboo = res.data.data.inspItemTaboo
            console.log(res.data)
        },
        async getPatientList() {
            let res = await getPatientInfoList(this.user_info.userId)
            this.applyerinfoList = res.data.data.records

            this.patientColumns = this.applyerinfoList.map((item,index) => {
                return item.applyerName
            })
        },
        getDetailTimeList() {
            this.startTime = this.$route.query.inspItemDate + ' ' + this.$route.query.period.split('-')[0] + ':00'
            this.endTime = this.$route.query.inspItemDate + ' ' + this.$route.query.period.split('-')[1] +  ':00'

            this.startTime = this.timeFilter(this.startTime)
            this.endTime = this.timeFilter(this.endTime)
            // let res = await getDetailTime(startTime, endTime, this.hospitalValue.hospitalId, this.hospitalValue.inspItemName)
            // console.log(res.data.data)
            // this.detailTimeList = res.data.data

            // this.timeColumns = res.data.data.map((item,index) => {
            //     let str = item.inspItemDate
            //     let result = str.replace(/-/,'年').replace(/-/,'月').concat('日')
            //     let res1 = item.startTime.split(' ')[1].slice(0, 5)
            //     let res2 = item.endTime.split(' ')[1].slice(0, 5)
            //     let list = `${result} ${res1}-${res2}`
            //     console.log(list)
            //     return list
            // })
        },
        timeFilter(time) {
            let value = time.split(" ")
            let res = value[1]

            let result = res.split(":")
            if (result[0].length === 1) {
                result[0] = '0'.concat(res.split(":")[0])
            }
            if (result[1].length === 1) {
                result[1] = '0'.concat(res.split(":")[1])
            }
            if (result[2].length === 1) {
                result[2] = '0'.concat(res.split(":")[2])
            }
            time = `${value[0]} ${result[0]}:${result[1]}:${result[2]}`
            return time
        },
        async getInfo() {
                let value = await getUserInfo(this.user_info.userId)
                if (!value.data.data.peopleId) {
                    this.$notify({
                        message: '用户信息不完整',
                        background: '#FF4444'
                    })
                }
                this.userValue = value.data.data
            },
        async getHospitalDetail(value) {
            let res = await hospitalDetail(value)
            this.hospitalValue = res.data.data
        },
        timeControl () {
            if (!this.flag) {
                this.sumbit()
            } else {
                this.nowTime = new Date().getTime()
                if (this.nowTime - this.lastTime > 3000) {
                    this.lastTime = new Date().getTime()
                    this.sumbit()
                } else {
                    this.lastTime = new Date().getTime()
                    console.log('不可频繁提交预约申请')
                }
            }
        },
        sumbit () {
            this.flag = true
            if (!this.applyerinfo.applyerName) {
                this.$notify({
                    message: '请选择就诊人',
                    background: '#FF4444'
                })
                return
            }
            const data = {
                hospitalId: this.hospitalValue.hospitalId,
                hospitalName: this.hospitalValue.hospitalName,
                hospitalPhone: this.hospitalValue.hospitalPhone,
                hospitalAddr: this.addressStreet,

                peopleId: this.userValue.peopleId,
                peopleName: this.applyerinfo.applyerName,
                peopleIdcard: this.applyerinfo.idCard,
                peoplePhone: this.applyerinfo.phone,

                inspItemId: this.hospitalValue.inspItemId,
                inspItemName: this.hospitalValue.inspItemName,
                insptResourceId: this.hospitalValue.insptResourceId,

                feeTotal: this.hospitalValue.unitPrice,
                quantity: this.hospitalValue.quantity,
                // detailTime: this.detailTime,
                applyTime: this.apply_time,
                userName: this.user_info.username,
                orderState: 10,
                startTime: this.startTime,
                endTime: this.endTime,
                inspResourceId: this.inspResourceId,
                period: this.$route.query.periodNum,
                inspItemTaboo: this.inspItemTaboo
            }
            addOrder(data).then((res) => {
                if (res.data.code === 0) {
                    if (!res.data.data) {
                        this.$notify({
                        message: '未知异常，提交申请失败',
                        background: '#FF4444'
                        })
                    } else {
                        this.$toast.loading({
                            mask: true,
                            message: '提交申请成功',
                            duration: 2000
                        })
                        setTimeout(() => {
                            this.$router.push({ path: '/main/orderApplyForWait' })
                        })

                        }
                    } else {
                    this.$notify({
                        message: '未知异常，提交申请失败',
                        background: '#FF4444'
                    })
                }
            })
        },
        // onConfirm (value, index) {
        //     console.log(value)
        //     this.detailTime = value

        //     this.startTime = this.detailTimeList[index].startTime
        //     this.endTime = this.detailTimeList[index].endTime
        //     this.inspResourceId = this.detailTimeList[index].inspResourceId

        //     this.showPicker = false
        // }
        onPatientConfirm (value, index) {
            this.applyerinfo = this.applyerinfoList[index]
            this.showPatientPicker = false
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
        .login-input {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid #eaeaea;
            background: #FFF;
            .label {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0.78px;
                padding-top: 16px;
            }
            .l-right {
                display: flex;
                justify-content: flex-end;
            }
            .sexField {
                margin-left: 15px;
                margin-top: -10px;
                margin-bottom: -10px;
            }
            .span {
                margin-top: 14px;
                font-size: 14px;
                color: #666;
                width: 220px;
            }
            .text {
                margin-top: 14px;
                font-size: 14px;
                color: #666;
                width: 85px;
            }
            .r-arrow {
                padding-top: 18px;
                color: #999;
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
