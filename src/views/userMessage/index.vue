/* eslint-disable */
<template>
  <div id="userMessage">
    <div @click="sumbit" class="saveBtn">保存</div>
    <div class="uploader">
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
        <img src="" alt="" id="headImg" v-if="dataImage && flag" class="img-2">
        <img src="./../../../public/image/me/defaultAvatar@2x.png" v-if="!dataImage && !formData.headImg" class="defaultImg">
        <img class="img-2" v-if="!flag && formData.headImg" :src="`/api/admin/sys-file/register-${formData.headImg}?access_token=${token}`" ref='bbb'>
      </van-uploader>
      <div class="defaultText">点击修改头像</div>
    </div>
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

       <!-- <div class="login-input">
        <div class="label">所在地</div>
        <div class="span span-city">
          <van-field
            ref="city"
            readonly
            clickable
            :value="formData.cityValue"
            placeholder="   请选择"
            @click="showCityPicker = true"
            class="sexField"
          />
          <van-popup v-model="showCityPicker" position="bottom" class="cityPicker">
            <van-picker
              show-toolbar
              :columns="cityColumns"
              @cancel="showCityPicker = false"
              @confirm="onCityConfirm"
            />
          </van-popup>
        </div>
      </div> -->

      <!-- <div class="login-input">
        <div class="label">详细地址</div>
        <div class="span">
          <input
            ref="name"
            class="input username"
            type="text"
            v-model="formData.area"
            autocomplete="off"
            placeholder="请填写您的详细地址" />
        </div>
      </div> -->

      <div class="login-input">
        <div class="label">紧急联系人</div>
        <div class="span">
          <input
            ref="linkName"
            class="input username"
            type="text"
            v-model="formData.linkName"
            autocomplete="off"
            placeholder="请填写紧急联系人" />
        </div>
      </div>

      <div class="login-input">
        <div class="label">紧急联系电话</div>
        <div class="span">
          <input
            class="input phone"
            type="text"
            v-model="formData.linkPhone"
            autocomplete="off"
            placeholder="请填写紧急联系电话" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mixin from '@/mixin/image'
import {
  getUserInfo, userMessageUpdate
} from '@/api/doctorpeopleinfo/index'
import { mapGetters } from 'vuex'
import store from '@/store'

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
        headImg: '',
        name: '',
        phone: '',
        sex: 1,
        // cityValue: '',
        // area: '',
        linkName: '',
        linkPhone: ''
      },
      showPicker: false,
      sexColumns: ['男', '女'],
      showCityPicker: false,
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
      ],
      token: '',
      dataImage: '',
      flag: true
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  watch: {
    '$route': 'getInfo'
  },
  async created() {
    this.dataImage = localStorage.getItem('imgData')
    console.log(this.user_info)
    await this.getInfo()
    this.token = store.getters.access_token

    this.$nextTick(() => {
      if (this.dataImage) {
        this.flag = true
        let headImg = document.getElementById('headImg')
        headImg.src = this.dataImage
      }
    })
  },
  methods: {
    async getInfo() {
      let res = await getUserInfo(this.user_info.userId)
      this.formData = res.data.data
      this.formData.headImg = res.data.data.headImg
    },
    sumbit () {
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

            let oldPhone = JSON.parse(sessionStorage.getItem('user_info')).content.phone
            let newUserInfo = sessionStorage.getItem('user_info').replace(oldPhone, this.formData.phone)
            sessionStorage.setItem('user_info', newUserInfo)

            if (!this.flag) {
              let canvas = document.createElement('canvas')
              canvas.width = 100
              canvas.height = 100
  
              var ctx = canvas.getContext('2d')
              ctx.drawImage(this.$refs.bbb, 0, 0, 100, 100)
              let dataURL = canvas.toDataURL('image/png')
              localStorage.setItem('imgData', dataURL)
            }
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
      this.axios.post('/api/admin/sys-file/upload', file, config).then(({ data }) => {
        this.$set(this.formData, 'headImg', `${data.data.fileName}`)
        this.$toast.clear()
        this.flag = false
        this.$nextTick(() => {
          this.$refs.bbb.src = `/api/admin/sys-file/register-${data.data.fileName}?access_token=${this.token}`
        })
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
      this.showCityPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
#userMessage {
  margin-bottom: 30px;
  .uploader {
    text-align: center;
    margin-top: 80px;
    .defaultImg {
      width: 80px;
      height: 80px;
    }
    .img-2 {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    .defaultText {
      font-family: PingFangSC-Medium;
      font-size: 10px;
      color: #9B9B9B;
      letter-spacing: 0.94px;
      text-align: center;
      margin-top: 11px;
    }
  }
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
      position: fixed;
      top: 20px;
      z-index: 2;
      right: 24px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.94px;
      text-align: center;
  }
}
</style>
