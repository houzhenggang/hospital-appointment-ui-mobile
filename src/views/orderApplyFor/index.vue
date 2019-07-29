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
  hospitalDetail
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
        hospitalValue: {}
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  created() {
    const formData = this.$route.params.formData

    this.hospitalName =  formData.hospitalName
    this.hospitalPhone =  formData.hospitalPhone
    // this.addressStreet =  formData.addressStreet
    this.inspItemName =  formData.inspItemName
    this.unitPrice =  formData.unitPrice

    const id = this.$route.params.inspResourceId
    this.getInfo()
    this.getHospitalDetail(id)
  },
  methods: {
      async getInfo() {
            let value = await getUserInfo(this.user_info.userId)
            this.userValue = value.data.data
            console.log(this.userValue)
            // .then(res => {
            //     this.formData = res.data.data
            // })
        },
      getHospitalDetail(value) {
            hospitalDetail(value).then((res) => {
                // console.log(res.data)
                this.hospitalValue = res.data.data
                console.log(this.hospitalValue)
            })
        },
    //   hospitalId，hospitalName，hospitalPhone，hospitalAddr，
    //   peopleId，peopleName，peopleIdcard，peoplePhone，
    //   insptItemId，inspItemName，insptResourceId，feeTotal，quantity，applyTime，detailTime

    sumbit () {
        const data = {
            hospitalId: '',
            hospitalName: this.hospitalValue.hospitalName,
            hospitalPhone: this.hospitalValue.hospitalPhone,
            hospitalAddr: '',

            peopleId: this.userValue.peopleId,
            peopleName: this.userValue.name,
            peopleIdcard: '',
            peoplePhone: this.userValue.phone,

            insptItemId: this.hospitalValue.insptItemId,
            inspItemName: this.hospitalValue.inspItemName,
            insptResourceId: this.hospitalValue.insptResourceId,

            feeTotal: this.hospitalValue.unitPrice,
            quantity: this.hospitalValue.quantity,
            detailTime: '',
            // unitPrice: this.unitPrice,
            applyTime: this.apply_time,
            userName: this.user_info.username,
            orderState: 10
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
    }
}
</style>
