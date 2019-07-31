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
                <van-cell title="预约人" title-class="leftTitle">
                    <span class="value">{{user_info.username}}</span>
                </van-cell>
                <van-cell title="手机号" title-class="leftTitle">
                    <span class="value">{{user_info.phone}}</span>
                </van-cell>
                <van-cell title="身份证号" title-class="leftTitle">
                    <span class="value">{{user_info.peopleId}}</span>
                </van-cell>
                <van-cell title="预约时间" title-class="leftTitle">
                    <span class="value">{{apply_time}}</span>
                </van-cell>
            </van-list>
            <div class="login-input">
                <div class="label">详细时间</div>
                <div class="l-right">
                    <div class="span span-sex">
                        <van-field
                            readonly
                            clickable
                            :value="detailTime"
                            placeholder="       请选择预约检查详细时间"
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
            </div>
            <div @click="sumbit" class="btn">提交申请</div>
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
  hospitalDetail, getDetailTime
} from '@/api/doctorinspectresource/index'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
    //   cardList: cardList,
        hospitalName: '南京第一人民医院',
        hospitalPhone: '13000001111',
        addressStreet: 'addressStreet',
        inspItemName: '血常规',
        unitPrice: '0',
        name: '张三',
        iphone: '13000001111',
        idCard: '',
        apply_time: '2019年8月21日 8:00-9:00',
        userValue: {},
        hospitalValue: {},
        detailTime: '',
        showPicker: false,
        timeColumns: [],
        detailTimeList: {},
        startTime: '',
        endTime: ''
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  async created() {
    const formData = this.$route.params.formData
    if (!formData) {
        this.$notify({
            message: '请返回上层重新选择预约时间',
            background: '#FF4444'
        })
        return
    }

    this.hospitalName =  formData.hospitalName
    this.hospitalPhone =  formData.hospitalPhone
    // this.addressStreet =  formData.addressStreet
    this.inspItemName =  formData.inspItemName
    this.unitPrice =  formData.unitPrice

    const id = this.$route.params.inspResourceId
    await this.getInfo()
    await this.getHospitalDetail(id)
    
    const timeDetail = this.$route.params.timeDetail
    
    let str = timeDetail.inspItemDate
    let result = str.replace(/-/,'年').replace(/-/,'月').concat('日')
    this.apply_time = result + ' ' + timeDetail.period
    await this.getDetailTimeList()
  },
  methods: {
        async getDetailTimeList() {
            const timeDetail = this.$route.params.timeDetail
            let startTime = timeDetail.inspItemDate + ' ' + timeDetail.period.split('-')[0] + ':00'
            let endTime = timeDetail.inspItemDate + ' ' + timeDetail.period.split('-')[1] +  ':00'

            let res = await getDetailTime(startTime, endTime, this.hospitalValue.hospitalId, this.hospitalValue.inspItemName)
            console.log(res.data.data)
            this.detailTimeList = res.data.data

            this.timeColumns = res.data.data.map((item,index) => {
                let str = item.inspItemDate
                let result = str.replace(/-/,'年').replace(/-/,'月').concat('日')
                let res1 = item.startTime.split(' ')[1].slice(0, 5)
                let res2 = item.endTime.split(' ')[1].slice(0, 5)
                let list = `${result} ${res1}-${res2}`
                console.log(list)
                return list
            })
        },
        async getInfo() {
                let value = await getUserInfo(this.user_info.userId)
                this.userValue = value.data.data
            },
        async getHospitalDetail(value) {
                let res = await hospitalDetail(value)
                this.hospitalValue = res.data.data
            },
    //   hospitalId，hospitalName，hospitalPhone，hospitalAddr，
    //   peopleId，peopleName，peopleIdcard，peoplePhone，
    //   inspItemId，inspItemName，insptResourceId，feeTotal，quantity，applyTime，detailTime

    sumbit () {
        if (!this.detailTime) {
            this.$notify({
                message: '请选择详细时间',
                background: '#FF4444'
            })
            return
        }
        const data = {
            hospitalId: this.hospitalValue.hospitalId,
            hospitalName: this.hospitalValue.hospitalName,
            hospitalPhone: this.hospitalValue.hospitalPhone,
            hospitalAddr: '',

            peopleId: this.userValue.peopleId,
            peopleName: this.userValue.name,
            peopleIdcard: '',
            peoplePhone: this.userValue.phone,

            inspItemId: this.hospitalValue.inspItemId,
            inspItemName: this.hospitalValue.inspItemName,
            insptResourceId: this.hospitalValue.insptResourceId,

            feeTotal: this.hospitalValue.unitPrice,
            quantity: this.hospitalValue.quantity,
            detailTime: this.detailTime,
            // unitPrice: this.unitPrice,
            applyTime: this.apply_time,
            userName: this.user_info.username,
            orderState: 10,
            startTime: this.startTime,
            endTime: this.endTime
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
    //   this.$router.push({ path: '/main/orderApplyForWait' })
    },
    onConfirm (value, index) {
        console.log(value)
        this.detailTime = value
        
        this.startTime = this.detailTimeList[index].startTime
        this.endTime = this.detailTimeList[index].endTime
        
        this.showPicker = false
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
            margin-bottom: 20px;
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
            .r-arrow {
                padding-top: 18px;
                color: #999;
            }
        }
    }
}
</style>
