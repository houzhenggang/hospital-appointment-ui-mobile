/* eslint-disable vue/no-parsing-error */
<template>
  <div id="personsigning">
    <van-cell-group class="content">
      <van-field v-model="formData.name" label="姓名" placeholder="请输入姓名" />
      <van-field v-model="formData.phone" label="电话" placeholder="请输入电话" />
      <van-field v-model="formData.idCard" clearable label="身份证" placeholder="请输入居民身份证" />

      <van-field v-model="formData.sexName" label="性别" placeholder="点击选择性别" readonly @click="()=>{this.showList.gendershow = true}" @click-right-icon="()=>{this.showList.gendershow = true}" />

      <van-field v-model="formData.birthDate" label="生日" placeholder="点击选择出生日期" readonly @click="opendatepicker" @click-right-icon="opendatepicker" />

      <van-field v-model="formData.national" label="民族" placeholder="点击选择民族" readonly @click="()=>{this.showList.nationshow = true}" @click-right-icon="()=>{this.showList.nationshow = true}" />

      <van-field v-model="formData.hospitalName" label="责任医院" placeholder="点击选择责任医院" readonly @click="()=>{this.showList.hospitalShow = true}" @click-right-icon="()=>{this.showList.hospitalShow = true}" />

      <van-field v-model="formData.teamName" label="责任团队" placeholder="点击选择责任团队" readonly @click="()=>{this.showList.teamShow = true}" @click-right-icon="()=>{this.showList.teamShow = true}" />

      <van-field v-model="formData.doctorName" label="责任医生" placeholder="点击选择责任医生" readonly @click="()=>{this.showList.doctorShow = true}" @click-right-icon="()=>{this.showList.doctorShow = true}" />

      <!-- <van-field v-model="formData.statusName" label="处理状态" placeholder="点击选择协议状态" readonly @click="()=>{this.showList.handleStateShow = true}" @click-right-icon="()=>{this.showList.handleStateShow = true}" /> -->

      <van-field v-model="formData.serviceTypeName" label="协议类型" placeholder="点击选择协议类型" readonly @click="()=>{this.showList.serviceShow = true}" @click-right-icon="()=>{this.showList.serviceShow = true}" />

      <!-- <van-field v-model="formData.userId" label="签约服务ID" placeholder="用户ID" /> -->

      <!-- <van-field v-model="formData.doctorName" label="套餐名称" placeholder="请输入套餐名称" readonly @click="selectServicepackage" @click-right-icon="selectServicepackage" /> -->
      <div class="servicepackageInput" @click="selectServicepackage">
        <div class="servicepackageInput__label"><span>套餐名称</span></div>
      </div>
      <div class="servicepackageList">
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item v-for="(item, index) in formData.doctorServicepackageList" :key="index" :title="item.packageLabel" :name="index">
            <servicepackageTpl :dictMap="dictMap" :formList="ServicepackageFormList" :data="item"></servicepackageTpl>
          </van-collapse-item>
        </van-collapse>
      </div>

    </van-cell-group>
    <div class="footer-botton" @click="submitForm">签约</div>

    <van-actionsheet v-model="showList.gendershow" :actions="sexOptionArray" cancel-text="取消" @select="ongenderSelect" @cancel="showList.gendershow = false" />
    <van-actionsheet v-model="showList.handleStateShow" :actions="handleStateList" cancel-text="取消" @select="handleStateSelect" @cancel="showList.handleStateShow = false" />
    <van-actionsheet v-model="showList.serviceShow" :actions="serviceTypeList" cancel-text="取消" @select="serviceTypeSelect" @cancel="showList.serviceShow = false" />
    <van-popup v-model="showList.brithdayshow" position="bottom">
      <van-datetime-picker type="date" :min-date="minDate" v-model="brithday" @confirm="brithdayconfirm" @cancel="() => {this.showList.brithdayshow = false}" />
    </van-popup>
    <van-popup v-model="showList.nationshow" position="bottom">
      <van-picker show-toolbar :columns="nationOptionArray" @confirm="nationConfirm" @cancel="() => {this.showList.nationshow = false}" />
    </van-popup>
    <van-popup v-model="showList.hospitalShow" position="bottom">
      <van-picker show-toolbar :columns="hospitalList" @confirm="hospitalConfirm" @cancel="() => {this.showList.hospitalShow = false}" />
    </van-popup>
    <van-popup v-model="showList.teamShow" position="bottom">
      <van-picker show-toolbar :columns="teamList" @confirm="teamConfirm" @cancel="() => {this.showList.teamShow = false}" />
    </van-popup>
    <van-popup v-model="showList.doctorShow" position="bottom">
      <van-picker show-toolbar :columns="doctorList" @confirm="doctorConfirm" @cancel="() => {this.showList.doctorShow = false}" />
    </van-popup>
    <!-- 选择套餐 -->
    <van-popup v-model="showList.doctorServicepackageShow" class="person-signing-service-package" position="right">
      <servicepackageSelect v-model="formData.doctorServicepackageList" ref="servicepackageSelect" :hospitalId="formData.hospitalId" @close="servicepackageClose"></servicepackageSelect>
    </van-popup>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import './person.scss'
import { initFormData, showList, dictMap } from './const'
import { dateFormat } from '@/utils/'
import { getHospitalDict } from '@/api/doctorhospital/'
import { getTeamListByhospitalId } from '@/api/doctorserviceteam'
import { getDoctorListBydictTeam } from '@/api/doctordoctorinfo'
import { getDictionariesutils } from '@/api/dictionariesutils'
import { getDictByType } from '@/api/admin/dict'
import { deviceapplication } from '@/api/deviceapplication'
import servicepackageSelect from './servicepackage'
import servicepackageTpl from '@/components/signing/servicepackage'
import { doctorServicepackageList } from '../detail/const'

export default {
  name: 'personsigning',
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
      formData: initFormData(),
      sexOptionArray: [],
      nationOptionArray: [],
      hospitalList: [],
      teamList: [],
      doctorList: [],
      handleStateList: [],
      serviceTypeList: [
        {
          name: '基础',
          value: '1'
        }, {
          name: '个性化',
          value: '2'
        }
      ],
      servicepackageObj: {
        province_list: {},
        city_list: {}
      },
      servicepackageList: [],
      showList,
      brithday: new Date(),
      minDate: new Date('1900-01-01'),
      activeNames: []
    }
  },
  watch: {
    active (newVal) {
      console.log(newVal)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 性别
    ongenderSelect (item) {
      this.showList.gendershow = false
      this.formData.sex = item.value
      this.formData.sexName = item.name
    },
    // 选择生日
    opendatepicker () {
      this.showList.brithdayshow = true
      this.brithday = new Date(this.formData.birthDate)
    },
    brithdayconfirm (value) {
      this.formData.birthDate = dateFormat(value)
      this.showList.brithdayshow = false
    },
    // 选择民族
    nationConfirm (row) {
      this.formData.national = row.text
      this.showList.nationshow = false
    },
    // 选择医院
    hospitalConfirm (row) {
      // this.formData.hospitalId = row.id
      this.$set(this.formData, 'hospitalId', row.id)
      this.formData.hospitalName = row.text
      this.showList.hospitalShow = false
      // 获取团队字典
      getTeamListByhospitalId(row.id).then(({ data }) => {
        this.teamList = data.data.map(m => { return { text: m.name, id: m.id } })
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
        this.doctorList = data.data.map(m => { return { text: m.name, id: m.id } })
      })
    },
    // 选择医生
    doctorConfirm (row) {
      this.formData.doctorId = row.id
      this.formData.doctorName = row.text
      this.showList.doctorShow = false
    },
    // 处理状态
    handleStateSelect (item) {
      this.showList.handleStateShow = false
      this.formData.status = item.value
      this.formData.statusName = item.name
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
        this.hospitalList = data.data.map(m => { return { text: m.name, id: m.id } })
      })
      // 获取性别
      getDictionariesutils('SexType').then(({ data }) => {
        this.sexOptionArray = data.data.map(m => { return { name: m.label, value: m.value } })
      })
      // 民族
      getDictByType('NATIONAL').then(({ data }) => {
        this.nationOptionArray = data.data.map(m => { return { text: m.label, value: m.id } })
      })
      // 处理状态
      getDictionariesutils('HandleState').then(({ data }) => {
        this.handleStateList = data.data.map(m => { return { name: m.label, value: m.value } })
      })
      // userInfo
      this.formData.userId = this.user_info.userId
    }
  },
  created () {
    this.loadDict()
  }
}
</script>

<style>
.person-signing-service-package {
  height: 100%;
}
</style>
