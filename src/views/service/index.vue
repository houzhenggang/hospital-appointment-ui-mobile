<template>
  <div id="followUp">
    <div class="content">
      <van-list v-model="loading" :finished="finished"  @load="onLoad" >
        <ServiceCardItem
          v-for="item in mainListData"
          :key="item.id"
          :data="item"
        />
      </van-list>
    </div>

  </div>
</template>

<script>
import ServiceCardItem from '@/components/ServiceCardItem'
import {
  dateFormat } from '@/utils/'
import {
  getTeamListByhospitalId
} from '@/api/doctorserviceteam'
import {
  getDoctorListByhospitalId
} from '@/api/doctordoctorinfo'
import {
  getHospitalDict
} from '@/api/doctorhospital/'

export default {
  name: 'sevice', // 服务计划
  components: {
    ServiceCardItem
  },
  data () {
    return {
      show: false,
      mainListData: [],
      params: { 'current': 1, size: 10 },
      loading: false,
      finished: false,
      hospitalList: []
    }
  },
  created () {
    this.loadDict()
    this.$store.dispatch('getArchivesInfo').then((result) => {
      let serviceInfo = { time: dateFormat(result.nextServiceTime), doctor: 'doctor', team: 'team2', hospital: 'hospital' }

      // 获取医生字典
      getDoctorListByhospitalId(result.hospitalId).then(({ data }) => {
        data.data.forEach(item => {
          if (item.id === result.doctorId) {
            serviceInfo.doctor = item.name
          }
        })
      })

      // 获取团队字典
      getTeamListByhospitalId(result.hospitalId).then(({ data }) => {
        data.data.forEach(item => {
          if (item.id === result.teamId) {
            serviceInfo.team = item.name
          }
        })
      })

      this.hospitalList.forEach(item => {
        if (item.id === result.hospitalId) {
          serviceInfo.hospital = item.text
        }
      })

      this.mainListData = [serviceInfo]
      if (!result) {
        this.show = false
      } else {
        this.show = true
      }
    })
  },
  computed: {
  },

  methods: {
    onLoad () {
      this.loading = false
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
    }
  }
}
</script>

<style lang="scss">
#followUp {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 96px);
  .followUpNavBar {
    position: relative;
    width: 100vw;
    height: 35px;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    .navItem {
      width: 50vw;
      height: 30px;
      line-height: 35px;
      text-align: center;
      font-size: 15px;
      color: #989898;
      transition: 0.5s;
      &.active {
        color: #18c444;
      }
    }
    .line {
      position: absolute;
      height: 3px;
      width: 24px;
      bottom: 0;
      background: #18c444;
      transition: 0.5s;
      border-radius: 1.5px;
      &.lineT1 {
        transform: translateX(calc(33vw - 60px - 12px));
      }
      &.lineT2 {
        transform: translateX(calc(66vw - 60px - 12px));
      }
      &.lineT3 {
        transform: translateX(calc(99vw - 60px - 12px));
      }
    }
  }
  .content {
    height: calc(100vh - 46px - 35px - 50px);
    overflow: scroll;
  }
}
.van-field--disabled .van-field__control,
.van-field__right-icon {
  color: #000000;
}
.van-cell__value {
  color: #000000;
}
.van-field__body {
  input,
  textarea {
    text-align: right;
  }
}
.noData {
  text-align: center;
  color: #989898;
  margin-top: 35px;
}
</style>
