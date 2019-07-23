<template>
  <div id="signing-detail">

    <OdpCard :field="fieldData" :data="signingInfo" :dictMap="dictMap"></OdpCard>

    <OdpCard v-for="(item, index) in signingInfo.dspList" :key="index" :field="item" :data="item.data" :dictMap="dictMap"></OdpCard>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toChinesNum, transfDict } from '@/utils/'
import { ordinaryInfo, selfHelpInfo, dictMap, doctorServicepackageList } from './const'
import { getDoctorAgreementById } from '@/api/doctoragreement/'
import { getHospitalDict } from '@/api/doctorhospital/'
import { getDeviceapplication } from '@/api/deviceapplication'
import { getTeamListAll } from '@/api/doctorserviceteam'
import { getDoctorListAll } from '@/api/doctordoctorinfo'
import OdpCard from '@/components/OdpCard/'

export default {
  name: 'archives',
  computed: {
    ...mapGetters(['user_info'])
  },
  components: { OdpCard },
  data () {
    return {
      fieldData: {},
      requsetFn: () => {},
      dictMap,
      toChinesNum,
      doctorServicepackageList,
      signingInfo: {
        doctorServicepackageList: []
      },
      params: this.$route.params
    }
  },
  methods: {
    loadData () {
      this.requsetFn(this.params.id).then(({ data }) => {
        let row = data.data
        row.dspList = []
        for (let item of row.doctorServicepackageList) {
          row.dspList.push({
            name: item.packageLabel,
            list: doctorServicepackageList,
            data: item
          })
        }
        this.signingInfo = row
        console.log('signingInfo: ', this.signingInfo)
      })
    },
    loadDict () {
      // 获取医院字典
      getHospitalDict().then(({ data }) => {
        this.dictMap.hospital = transfDict(data.data, 'name', 'id')
      })
    },
    transformatDict (value, type) {
      for (let item of this.dictMap[type]) {
        if (value === item.id) {
          return item.name
        }
      }
    },
    loadHospital () {
      // 获取团队字典
      getTeamListAll().then(({ data }) => {
        this.dictMap.teamList = transfDict(data.data, 'name', 'id')
      })
      // 获取医生字典
      getDoctorListAll().then(({ data }) => {
        this.dictMap.doctorList = transfDict(data.data, 'name', 'id')
      })
    },
    created () {
      // 首先根据路由判断当前的签约属性
      let route = this.$route
      this.params = this.$route.params
      if (route.path.split('/')[2] === 'ordinarySigning') {
        this.fieldData = {
          name: '基本信息',
          list: ordinaryInfo
        }
        this.requsetFn = getDoctorAgreementById
      } else {
        this.fieldData = {
          name: '基本信息',
          list: selfHelpInfo
        }
        this.requsetFn = getDeviceapplication
        this.loadHospital()
      }
      this.loadDict()
      this.loadData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(
      (vm) => {
        vm.created()
      }
    )
  },
  beforeRouteLeave (to, from, next) {
    this.signingInfo = {}
    next()
  }
}
</script>

<style lang="scss" scoped>
#signing-detail {
  padding: 10px 0 0;
  background-color: #F8F9FA;
  .servicepackage {
    margin-top: 10px;
    .title {
      background-color: #fff;
      padding: 8px 15px;
      font-size: 12px;
      color: #999;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
