/* eslint-disable */
<template>
  <div id="addPatient">
    <div class="userMessage-form">
      <div class="login-input">
        <div class="label">姓名</div>
        <div class="span">
          <input
            ref="name"
            class="input username"
            type="text"
            v-model="formData.name"
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
            :value="formData.cityValue"
            placeholder="   请选择"
            @click="showDatePicker = true"
            class="sexField"
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
            v-model="formData.linkName"
            autocomplete="off"
            placeholder="请填写身份证号" />
        </div>
      </div>
    </div>
    <div class="saveBtn" @click="submit">保存</div>
  </div>
</template>

<script>
/* eslint-disable */
import mixin from '@/mixin/image'
import {
  getUserInfo, userMessageUpdate
} from '@/api/doctorpeopleinfo/index'
import { mapGetters } from 'vuex'

import { setTimeout } from 'timers'
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
  name: 'register',
  mixins: [ mixin ],
  data () {
    return {
      formData: {
        avatar: '',
        name: '',
        phone: '',
        sex: 1,
        // cityValue: '',
        // area: '',
        linkName: '',
        linkPhone: ''
      },
      currentDate: new Date(),
      showPicker: false,
      sexColumns: ['男', '女'],
      showDatePicker: false,
      cityColumns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  watch: {
    '$route': 'getInfo'
  },
  created() {
    console.log(this.user_info)
    this.getInfo()
  },
  methods: {
    getInfo() {
      getUserInfo(this.user_info.userId).then(res => {
        this.formData = res.data.data
        console.log(this.formData)
      })
    },
    onDateConfirm(value) {
        this.currentDate = value
        this.showDatePicker = false;
    },
    submit () {
      userMessageUpdate(this.formData).then(({ data }) => {
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
            message: '未知异常，注册失败',
            background: '#FF4444'
          })
        }
      })
    },
    onRead (file) {
      // let formData = new FormData()
      // formData.append('file', file.file, file.file.name)
      // 在上传前需要将图片进行压缩处理
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: '上传中...'
      })
      this.imgPreview(file.file)
    },
    imageUpload (file) {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      this.axios.post('/api/admin/file/upload', file, config).then(({ data }) => {
        this.$set(this.formData, 'avatar', `${data.data.bucketName}-${data.data.fileName}`)
        this.$toast.clear()
      })
    },
    onConfirm (value) {
      if (value === '男'){
        this.formData.sex = 1;
      } else if (value === '女') {
        this.formData.sex = 2;
      }
      this.showPicker = false
    },
    onCityConfirm (picker, values) {
      this.formData.cityValue = picker.toString()
      this.showDatePicker = false
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
          margin-bottom: -5px;
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
        width: 90px;
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
}
</style>
