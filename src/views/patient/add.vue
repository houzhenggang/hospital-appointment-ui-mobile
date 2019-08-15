/* eslint-disable */
<template>
  <div id="addPatient">
    <div @click="deletePatient" class="deleteBtn" v-if="$route.query.applyerId && !flag">删除</div>
    <div class="userMessage-form">
      <div class="login-input">
        <div class="label">姓名</div>
        <div class="span">
          <input
            ref="name"
            class="input username"
            type="text"
            v-model="formData.applyerName"
            autocomplete="off"
            placeholder="请填写您的真实姓名" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">性别</div>
        <div class="span span-sex">
          <van-field
            readonly
            clickable
            :value="Number(formData.sex) === 1 ? '男' : '女'"
            placeholder="请选择您的性别"
            @click="showPicker = true"
            class="sexField"
          />
          <van-popup v-model="showPicker" position="bottom" class="cityPicker">
            <van-picker
              show-toolbar
              :columns="sexColumns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>
      </div>

      <div class="login-input">
        <div class="label">手机号</div>
        <div class="span">
          <input
            class="input phone"
            type="text"
            v-model="formData.phone"
            autocomplete="off"
            placeholder="请填写您的手机号" />
        </div>
      </div>

       <div class="login-input">
        <div class="label">出生日期</div>
        <div class="span span-city">
          <van-field
            ref="city"
            readonly
            clickable
            :value="formData.birthDate"
            placeholder="   请选择"
            @click="showDatePicker = true"
            class="borthField"
          />
          <van-popup v-model="showDatePicker" position="bottom" class="cityPicker">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="showDatePicker = false"
                @confirm="onDateConfirm"
            />
          </van-popup>
        </div>
      </div>

      <div class="login-input">
        <div class="label">身份证号</div>
        <div class="span">
          <input
            ref="linkName"
            class="input username"
            type="text"
            v-model="formData.idCard"
            autocomplete="off"
            placeholder="请填写身份证号" />
        </div>
      </div>
    </div>
    <div class="saveBtn" @click="update" v-if="$route.query.applyerId">保存</div>
    <div class="saveBtn" @click="submit" v-else>保存</div>
  </div>
</template>

<script>
/* eslint-disable */
import mixin from '@/mixin/image'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import {
  addPatientInfo, getPatientInfo, updatePatientInfo, deletePatientInfo
} from '@/api/applyerinfo/index'
import { mapGetters } from 'vuex'

import { setTimeout } from 'timers'
export default {
  name: 'register',
  mixins: [ mixin ],
  data () {
    return {
      formData: {
        applyerName: '',
        phone: '',
        sex: 1,
        birthDate: '',
        idCard: '',
        userId: undefined
      },
      currentDate: new Date(),
      showPicker: false,
      sexColumns: ['男', '女'],
      showDatePicker: false,
      flag: false
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  watch: {
    '$route': 'getInfo'
  },
  async created() {
    console.log(this.user_info)
    console.log(this.$route.query.applyerId)
    if (this.$route.query.applyerId) {
      await this.getPatientInfoBox(this.$route.query.applyerId)
    }
    await this.getUserInfoValue()
    this.formData.userId = this.user_info.userId
  },
  methods: {
    async getUserInfoValue() {
      let res = await getUserInfo(this.user_info.userId)
      console.log(res.data)

      if (res.data.data.idCard === this.formData.idCard) {
        this.flag = true
      }
    },
    async getPatientInfoBox(id) {
      let res = await getPatientInfo(id)
      this.formData = res.data.data
    },
    onDateConfirm(value) {
      this.currentDate = `${value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()}`
      this.formData.birthDate = this.timeFilter(this.currentDate.toString())
      this.showDatePicker = false;
    },
    timeFilter(time) {
      let result = time.split("-")
      if (result[1].length === 1) {
        result[1] = '0'.concat(time.split("-")[1])
      }
      if (result[2].length === 1) {
        result[2] = '0'.concat(time.split("-")[2])
      }
      time = `${result[0]}-${result[1]}-${result[2]}`
      return time
    },
    validate (cb) {
      let formData = this.formData
      if (!formData.applyerName) {
        cb(false, '用户名不能为空')
      } else if (!formData.phone) {
        cb(false, '请输入您的联系电话')
      } else if (!formData.birthDate) {
        cb(false, '请选择出生日期')
      } else if (!formData.idCard) {
        cb(false, '身份证号不能为空')
      } else if (formData.idCard.length !== 15 && formData.idCard.length !== 18) {
        cb(false, '身份证位数不正确')
      } else if (!(/^[0-9]+$/.exec(formData.idCard))) {
        cb(false, '身份证号不符合规范，仅支持数字')
      } else {
        cb(true)
      }
    },
    submit () {
      this.validate((valid, msg) => {
        if (valid) {
          // "320456199310021234"
          addPatientInfo(this.formData).then(({ data }) => {
            if (data.code === 0) {
              if (!data.data) {
                this.$notify({
                  message: '未知异常，修改失败',
                  background: '#FF4444'
                })
              } else {
                this.$toast.loading({
                  mask: true,
                  message: '保存成功',
                  duration: 2000
                })
                this.formData = {
                  applyerName: '',
                  phone: '',
                  sex: 1,
                  birthDate: '',
                  idCard: ''
                }
                this.$router.go(-1)
              }
            } else {
              this.$notify({
                message: '未知异常，修改失败',
                background: '#FF4444'
              })
            }
          })
        } else {
          this.$notify({
            message: msg || '请规范填写表单后提交',
            background: '#FF4444'
          })
        }
      })
    },
    update() {
      this.validate((valid, msg) => {
        if (valid) {
          updatePatientInfo(this.formData).then(({ data }) => {
            if (data.code === 0) {
              if (!data.data) {
                this.$notify({
                  message: '未知异常，修改失败',
                  background: '#FF4444'
                })
              } else {
                this.$toast.loading({
                  mask: true,
                  message: '修改成功',
                  duration: 2000
                })
              }
            } else {
              this.$notify({
                message: '未知异常，修改失败',
                background: '#FF4444'
              })
            }
          })
        } else {
          this.$notify({
            message: msg || '请规范填写表单后提交',
            background: '#FF4444'
          })
        }
      })
    },
    deletePatient() {
      deletePatientInfo(this.formData.applyerId).then(({ data }) => {
        if (data.code === 0) {
          if (!data.data) {
            this.$notify({
              message: '未知异常，删除失败',
              background: '#FF4444'
            })
          } else {
            this.$toast.loading({
              mask: true,
              message: '删除成功',
              duration: 2000
            })
            this.$router.go(-1)
          }
        } else {
          this.$notify({
            message: '未知异常，删除失败',
            background: '#FF4444'
          })
        }
      })
    },
    onConfirm (value) {
      if (value === '男'){
        this.formData.sex = 1;
      } else if (value === '女') {
        this.formData.sex = 2;
      }
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
#addPatient {
  margin-top: 80px;
  margin-bottom: 30px;
  .userMessage-form {
    margin-top: 60px;
    .login-input {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      margin-bottom: 20px;
      padding-left: 30px;
      padding-right: 30px;
      border-bottom: 1px solid #eaeaea;
      .label {
        font-size: 15px;
        padding-top: 14px;
        color: #333;
        .tag {
          font-size: 9px;
          color: #9B9B9B;
          margin-left: 8px;
        }
      }
      .sexField {
          margin-left: 15px;
          margin-top: -10px;
          margin-bottom: -10px;
      }
      .borthField {
        margin-left: 34px;
        margin-top: -10px;
        margin-bottom: -10px;
      }
      .input {
        text-align: right;
      }
      .span {
        margin-top: 14px;
        font-size: 14px;
        color: #666;
        input {
          border: 0;
          background: none;
          width: 100%;
          font-size: 14px;
        }
        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color: #989898
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #989898
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #989898
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #989898
        }
      }
      .span-sex {
        width: 44px;
      }
      .span-city {
        width: 110px;
      }
    }
  }

  .saveBtn {
    background-color: #2458FF;
    border: 0;
    margin: 40px 70px 0;
    border-radius: 8px;
    font-size: 18px;
    padding: 8px 0;
    text-align: center;
    color: #fff;
  }
  .deleteBtn {
    // position: fixed;
    // top: 20px;
    // z-index: 2;
    // right: 24px;
    // font-family: PingFangSC-Medium;
    // font-size: 14px;
    // color: #4A4A4A;
    // letter-spacing: 0.94px;
    // text-align: center;

    position: fixed;
    top: 5px;
    z-index: 2;
    right: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.94px;
    padding-top: 20px
  }
}
</style>
