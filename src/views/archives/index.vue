/* eslint-disable no-unused-vars */
<template>
<div id="archives">
    <van-loading size="40px" color="#1989fa" type="spinner" v-if="isLoad">加载中...</van-loading>
    <div v-else>
        <div v-if="!isShow" class="none-archives">
            <span>您还未建档</span>
        </div>
        <div class="card-list" v-else>
          <div class="card-item" v-for="(item, index) in cardList" :key="index">
            <div class="card-head"><p class="card-icon"></p><p class="card-title">{{item.name}}</p></div>
            <van-list>
              <van-cell v-for="(cItem, cIndex) in item.list" :key="cIndex" :title="cItem.name">
                <span v-if="archives[cItem.value] === undefined">无</span>
                <span v-else-if="cItem.type=='date'">{{dateFormat(archives[cItem.value])}}</span>
                <span v-else-if="cItem.dict">{{getDictValue([cItem.dict], archives[cItem.value])}}</span>
                <span v-else>{{archives[cItem.value]}}</span>
              </van-cell>
            </van-list>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import {
  getUserInfo
} from '@/api/archives/'
import {
  mapGetters
} from 'vuex'
import {
  dateFormat, getDictValue } from '@/utils/'
import {
  cardList,
  baseArray,
  yesorno
} from './const'
import {
  getHospitalDict
} from '@/api/doctorhospital/'
import {
  getDictionariesutils
} from '@/api/dictionariesutils'
import {
  getTeamListByhospitalId
} from '@/api/doctorserviceteam'
import {
  getDoctorListByhospitalId
} from '@/api/doctordoctorinfo'
import './style.scss'

export default {
  name: 'archives',
  computed: {
    ...mapGetters(['user_info'])
  },
  data () {
    return {
      cardList,
      archives: {},
      isShow: true,
      isLoad: true,
      dateFormat,
      getDictValue,
      peopleStateOptionArray: [],
      hospitalList: [],
      teamList: [],
      doctorList: [],
      baseArray,
      yesorno
    }
  },
  methods: {
    getUserInfo () {
      getUserInfo(this.user_info.userId).then(({
        data
      }) => {
        this.isLoad = false
        if (!data.data) {
          this.isShow = false
          return
        }
        this.archives = data.data
        this.peopleStateOptionArray.forEach(item => {
          if (item.value === this.archives.peopleState) {
            this.archives.peopleState = item.name
          }
        })
        // 获取团队字典
        getTeamListByhospitalId(this.archives.hospitalId).then(({
          data
        }) => {
          data.data.forEach(item => {
            if (item.id === this.archives.teamId) {
              this.archives.teamId = item.name
            }
          })
          // this.teamList = data.data.map(m => { return { text: m.name, id: m.id } })
        })
        // 获取医生字典
        getDoctorListByhospitalId(this.archives.hospitalId).then(({
          data
        }) => {
          data.data.forEach(item => {
            if (item.id === this.archives.doctorId) {
              this.archives.doctorId = item.name
            }
            if (item.id === this.archives.createArchivePeople) {
              this.archives.createArchivePeople = item.name
            }
          })
          // this.doctorList = data.data.map(m => { return { text: m.name, id: m.id } })
        })
        this.hospitalList.forEach(item => {
          if (item.id === this.archives.createArchiveUnits) {
            this.archives.createArchiveUnits = item.text
          }
          if (item.id === this.archives.hospitalId) {
            this.archives.hospitalId = item.text
          }
        })
        this.yesorno.forEach(item => {
          if (item.value === this.archives.surgery) {
            this.archives.surgery = item.label
          }
          if (item.value === this.archives.trauma) {
            this.archives.trauma = item.label
          }
          if (item.value === this.archives.blood) {
            this.archives.blood = item.label
          }
          if (item.value === this.archives.genetic) {
            this.archives.genetic = item.label
          }
        })
        this.archives.weight = (this.archives.weight || '') + 'kg'
        this.archives.height = (this.archives.height || '') + 'cm'
        var fatherDisease = ''
        var fatherDiseaseDateArray = this.archives.fatherDiseaseArray
        var motherDisease = ''
        var motherDiseaseDateArray = this.archives.motherDiseaseArray
        var basDisease = ''
        var basDiseaseDateArray = this.archives.basDiseaseArray
        var childrenDisease = ''
        var childrenDiseaseDateArray = this.archives.childrenDiseaseArray
        this.baseArray.forEach(item => {
          if (fatherDiseaseDateArray.length > 0) {
            fatherDiseaseDateArray.forEach(param => {
              if (parseInt(param) === item.value && parseInt(param) !== 0) {
                fatherDisease = fatherDisease + ',' + item.label
              }
            })
          }
          this.archives.fatherDiseaseArray = fatherDisease.replace(',', '')
          if (motherDiseaseDateArray.length > 0) {
            motherDiseaseDateArray.forEach(param => {
              if (parseInt(param) === item.value && parseInt(param) !== 0) {
                motherDisease = motherDisease + ',' + item.label
              }
            })
          }
          this.archives.motherDiseaseArray = motherDisease.replace(',', '')
          if (basDiseaseDateArray.length > 0) {
            basDiseaseDateArray.forEach(param => {
              if (parseInt(param) === item.value && parseInt(param) !== 0) {
                basDisease = basDisease + ',' + item.label
              }
            })
          }
          this.archives.basDiseaseArray = basDisease.replace(',', '')
          if (childrenDiseaseDateArray.length > 0) {
            childrenDiseaseDateArray.forEach(param => {
              if (parseInt(param) === item.value && parseInt(param) !== 0) {
                childrenDisease = childrenDisease + ',' + item.label
              }
            })
          }
          this.archives.childrenDiseaseArray = childrenDisease.replace(',', '')

          this.archives.createArchiveTime = dateFormat(this.archives.createArchiveTime)
          this.archives.nextServiceTime = dateFormat(this.archives.nextServiceTime)
        })
      })
    },
    loadDict () {
      // 获取医院字典
      getHospitalDict().then(({
        data
      }) => {
        this.hospitalList = data.data.map(m => {
          return {
            text: m.name,
            id: m.id
          }
        })
      })
      // 获取人员类型
      getDictionariesutils('PeopleState').then(({
        data
      }) => {
        this.peopleStateOptionArray = data.data.map(m => {
          return {
            name: m.label,
            value: m.value
          }
        })
      })
    }
  },
  created () {
    this.loadDict()
    this.getUserInfo()
  }
}
</script>
