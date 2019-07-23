/* eslint-disable vue/no-parsing-error */
<template>
  <div id="personsigning">
    <!-- <van-uploader :after-read="afterRead" class="uploader" :disabled="isUserInfoReady"> -->
      <!-- <input type="file" id="upload" accept="image" @change="upload"> -->
    <van-uploader :after-read="afterRead" class="uploader" v-if="!isUserInfoReady">
      <div class="tips">请拍身份证正面！</div>
      <div class="img">
        <img :src="'../img/IdCrad-min.png'" alt v-if="formData.idCardFront == ''">
        <img :src="`/api${formData.idCardFront}`" alt v-else>
      </div>
    </van-uploader>
    <van-cell-group class="content">
      <van-field v-model="formData.name" label="姓名" placeholder="请输入您的姓名" readonly/>
      <van-field v-model="formData.idCard" clearable label="身份证" placeholder="请输入您的居民身份证" readonly/>

      <van-field v-model="formData.sexName" label="性别" placeholder="请选择您的性别" readonly/>

      <van-field v-model="formData.birthDate" label="生日" placeholder="请选择您的出生日期" readonly/>

      <van-field v-model="formData.nationalName" label="民族" placeholder="请选择您的民族" readonly/>

      <van-field v-model="formData.phone" label="电话" placeholder="请输入您的电话"/>

      <van-field
        v-model="formData.hospitalName"
        label="责任医院"
        placeholder="点击选择责任医院"
        readonly
        @click="()=>{this.showList.hospitalShow = true}"
        @click-right-icon="()=>{this.showList.hospitalShow = true}"
      />

      <van-field
        v-model="formData.teamName"
        label="责任团队"
        placeholder="点击选择责任团队"
        readonly
        @click="()=>{this.showList.teamShow = true}"
        @click-right-icon="()=>{this.showList.teamShow = true}"
      />

      <van-field
        v-model="formData.doctorName"
        label="责任医生"
        placeholder="点击选择责任医生"
        readonly
        @click="()=>{this.showList.doctorShow = true}"
        @click-right-icon="()=>{this.showList.doctorShow = true}"
      />

      <van-field
        v-model="formData.serviceTypeName"
        label="协议类型"
        placeholder="点击选择协议类型"
        readonly
        @click="()=>{this.showList.serviceShow = true}"
        @click-right-icon="()=>{this.showList.serviceShow = true}"
      />

      <div class="servicepackageInput" @click="selectServicepackage">
        <div class="servicepackageInput__label">
          <span>套餐名称</span>
        </div>
      </div>
    </van-cell-group>

    <div class="servicepackageList">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item
          v-for="(item, index) in formData.doctorServicepackageList"
          :key="index"
          :title="item.packageLabel"
          :name="index"
        >
          <servicepackageTpl :dictMap="dictMap" :formList="ServicepackageFormList" :data="item"></servicepackageTpl>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="odp-button" @click="submitForm">确认</div>

    <van-popup v-model="showList.hospitalShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="hospitalList"
        @confirm="hospitalConfirm"
        @cancel="() => {this.showList.hospitalShow = false}"
      />
    </van-popup>

    <van-popup v-model="showList.teamShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="teamList"
        @confirm="teamConfirm"
        @cancel="() => {this.showList.teamShow = false}"
      />
    </van-popup>

    <van-popup v-model="showList.doctorShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="doctorList"
        @confirm="doctorConfirm"
        @cancel="() => {this.showList.doctorShow = false}"
      />
    </van-popup>

    <van-actionsheet
      v-model="showList.serviceShow"
      :actions="serviceTypeList"
      cancel-text="取消"
      @select="serviceTypeSelect"
      @cancel="showList.serviceShow = false"
    />

    <!-- 选择套餐 -->
    <van-popup
      v-model="showList.doctorServicepackageShow"
      class="person-signing-service-package"
      position="right"
    >
      <servicepackageSelect
        v-model="formData.doctorServicepackageList"
        ref="servicepackageSelect"
        :hospitalId="formData.hospitalId"
        :serviceType="formData.serviceType"
        @close="servicepackageClose"
      ></servicepackageSelect>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import './person.scss'
import { initFormData, dictMap, fileForm, showList } from './const'
import { uploadIdCard } from '@/api/upms/file'
import { getHospitalDict } from '@/api/doctorhospital/'
import { getTeamListByhospitalId } from '@/api/doctorserviceteam'
import { getDoctorListBydictTeam } from '@/api/doctordoctorinfo'
import { deviceapplication } from '@/api/deviceapplication'
import servicepackageSelect from './servicepackage'
import { doctorServicepackageList } from '../detail/const'
import servicepackageTpl from '@/components/signing/servicepackage'
import { getUserInfo } from '@/api/archives/'
import { dateFormat } from '@/utils/'
import mixin from '@/mixin/image'

export default {
  name: 'personsigning',
  mixins: [ mixin ],
  computed: {
    ...mapGetters(['user_info'])
  },
  components: {
    servicepackageSelect,
    servicepackageTpl
  },
  data () {
    return {
      dictMap,
      ServicepackageFormList: doctorServicepackageList,
      showList,
      hospitalList: [],
      teamList: [],
      doctorList: [],
      formData: initFormData(),
      serviceTypeList: [
        {
          name: '基础',
          value: '1'
        },
        {
          name: '个性化',
          value: '2'
        }
      ],
      activeNames: [],
      isUserInfoReady: false // 判断是否已经建档完成
    }
  },
  methods: {
    // 上传身份证
    afterRead (file) {
      // 在上传前需要将图片进行压缩处理
      this.imgPreview(file.file)
      // this.imageUpload(file.file)
    },
    imageUpload (file) {
      console.log('file: ', file)
      // 此时可以自行将文件上传至服务器
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // let fd = new FormData()
      // fd.append('file', file)
      uploadIdCard(file, config).then(({ data }) => {
        let obj = {}
        for (let item of fileForm) {
          if (data[item.fileName] === '') {
            this.$notify({
              message: '照片信息不清晰，请重新拍摄！',
              background: '#f44'
            })
            return
          }
          if (item.formName === 'national') {
            // 民族较为特殊
            let dict = dictMap[item.dict]
            for (let key in dict) {
              if (dict[key] === `${data[item.fileName]}族`) {
                obj[item.formName] = key
                obj[item.formAlias] = data[item.fileName]
              }
            }
          } else if (item.dict) {
            obj[item.formName] = data[item.fileName]
            obj[item.formAlias] = dictMap[item.dict][data[item.formName]]
          } else {
            obj[item.formName] = data[item.fileName]
          }
        }
        this.formData = Object.assign({}, this.formData, obj)
        this.formData.idCardFront = data.path
      })
    },
    // 选择医院
    hospitalConfirm (row) {
      this.$set(this.formData, 'hospitalId', row.id)
      this.formData.hospitalName = row.text
      this.showList.hospitalShow = false
      // 获取团队字典
      getTeamListByhospitalId(row.id).then(({ data }) => {
        this.teamList = data.data.map(m => {
          return { text: m.name, id: m.id }
        })
      })
      // 所有关联项做一个清空操作
      this.formData.doctorId = ''
      this.formData.doctorName = ''
      this.formData.teamId = ''
      this.formData.teamName = ''
      this.formData.doctorServicepackageList = []
    },
    // 选择团队
    teamConfirm (row) {
      this.formData.teamId = row.id
      this.formData.teamName = row.text
      this.showList.teamShow = false
      // 获取医生字典
      getDoctorListBydictTeam(row.id).then(({ data }) => {
        this.doctorList = data.data.map(m => {
          return { text: m.name, id: m.id }
        })
      })
    },
    // 选择医生
    doctorConfirm (row) {
      this.formData.doctorId = row.id
      this.formData.doctorName = row.text
      this.showList.doctorShow = false
    },
    // 协议状态
    serviceTypeSelect (item) {
      this.showList.serviceShow = false
      this.formData.serviceType = item.value
      this.formData.serviceTypeName = item.name
    },
    // 选择套餐
    selectServicepackage (row) {
      if (this.formData.hospitalId === '') {
        this.$notify({
          message: '请先选择医院',
          background: '#f44'
        })
        return
      }
      if (this.formData.serviceType === '') {
        this.$notify({
          message: '请先选择协议类型',
          background: '#f44'
        })
        return
      }
      this.showList.doctorServicepackageShow = true
      this.$nextTick(() => {
        this.$refs['servicepackageSelect'].getList()
      })
    },
    servicepackageClose () {
      this.showList.doctorServicepackageShow = false
    },
    submitForm () {
      for (let index in this.formData) {
        if (this.formData[index] === '') {
          this.$notify({
            message: '请完整填写信息',
            background: '#f44'
          })
          return
        }
      }
      let rez = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!rez.test(this.formData.idCard)) {
        this.$notify({
          message: '身份证格式有误！',
          background: '#f44'
        })
        return
      }
      deviceapplication(this.formData).then(() => {
        this.$notify({
          message: '提交成功',
          background: '#00cc33'
        })
        this.$router.push('/home/signing')
      })
    },
    loadDict () {
      // 获取医院字典
      getHospitalDict().then(({ data }) => {
        this.hospitalList = data.data.map(m => {
          return { text: m.name, id: m.id }
        })
      })
      // userInfo
      this.formData.userId = this.user_info.userId
    },
    /**
     * 判断是否建档
     * 若建档完成，则自动读取基本信息
     */
    getUserInfo () {
      getUserInfo(this.user_info.userId).then(({ data }) => {
        let row = data.data
        if (row) {
          let obj = {}
          for (let item of fileForm) {
            if (item.transfDict) {
              obj[item.formName] = row[item.formName]
              obj[item.formAlias] =
                dictMap[item.transfDict][row[item.formName]]
            } else if (item.date) {
              obj[item.formName] = dateFormat(row[item.formName])
            } else {
              obj[item.formName] = row[item.fileName]
            }
          }
          this.isUserInfoReady = true
          this.formData = Object.assign({}, this.formData, obj)
        } else {
          this.isUserInfoReady = false
        }
      })
    }
  },
  activated () {
    this.formData = initFormData()
    this.loadDict()
    this.getUserInfo()
  },
  created () {
    // this.loadDict()
    // this.getUserInfo()
  }
}
</script>

<style>
.person-signing-service-package {
  height: 100%;
}
</style>
