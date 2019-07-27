/* eslint-disable */
<template>
  <div id="userMessage">
    <div @click="sumbit" class="saveBtn">保存</div>
    <div class="uploader">
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
        <img :src="'../img/register-photo-min.png'" alt="" v-if="!formData.avatar">
        <img class="img-2" v-else :src="`/api/admin/file/${formData.avatar}`">
      </van-uploader>
    </div>
    <div class="login-form">
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
            :value="formData.sexValue"
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
      </div>

      <div class="login-input">
        <div class="label">详细地址</div>
        <div class="span">
          <input
            ref="name"
            class="input username"
            type="text"
            v-model="formData.name"
            autocomplete="off"
            placeholder="请填写您的详细地址" />
        </div>
      </div>

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
        name: '张芳芳',
        phone: '15812344321',
        sexValue: '女',
        cityValue: '',
        linkName: '张小林',
        linkPhone: '13843215678'
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
      ]
    }
  },
  methods: {
    sumbit () {
        console.log('保存')
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
      this.formData.sexValue = value
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
  .title {
    margin: 60px 30px 0;
    font-size: 26px;
  }
  .uploader {
    text-align: center;
    margin-top: 80px;
    .img-2 {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .login-form {
    margin-top: 30px;
  }
}
.login-form {
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
    position: absolute;
    top: 20px;
    z-index: 2;
    right: 24px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.94px;
    text-align: center;
}
</style>
