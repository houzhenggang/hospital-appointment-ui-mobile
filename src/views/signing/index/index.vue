<template>
  <div id="signing">
    <van-tabs v-model="active" class="tabs">
      <van-tab :title="`医师签约（${count.ordinary}）`">
        <van-pull-refresh v-model="isLoading" @refresh="getSingingTableData({type: 1})">
          <van-list
            v-model="isLoading"
            :finished="finished"
            :finished-text="finishedText"
            @load="getSingingTableData({type: 2, list: 1})"
          >
            <signingCard
              v-for="item in mainTableData"
              :formData="item"
              :hospitalDict="hospitalDict"
              :teamDict="teamDict"
              :statusDict="statusDict"
              @click.native="handleDetail(item, 1)"
              :key="item.id" />
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab :title="`自助签约（${count.selfHelp}）`">
        <van-pull-refresh v-model="isLoading" @refresh="getSingingTableData({type: 1})">
          <van-list
            v-model="isLoading"
            :finished="finished2"
            finished-text="没有更多了"
            @load="getSingingTableData({type: 2, list: 2})"
          >
            <signingCard2
              v-for="item in mainTableData2"
              :formData="item"
              :hospitalDict="hospitalDict"
              :teamDict="teamDict"
              :statusDict="statusDict"
              :isDelete="item.status === '0'"
              @click="handleDetail(item, 2)"
              @delete="handleDelete(item)"
              :key="item.id" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserDoctorAgreementPage } from '@/api/doctoragreement/index'
import { getDeviceApplicationPage, deleteDoctorById } from '@/api/deviceapplication/index'
import { getHospitalDict } from '@/api/doctorhospital/index'
import { getTeamListAll } from '@/api/doctorserviceteam/index'
import signingCard from '@/components/signing/card'
import signingCard2 from '@/components/signing/card2'
import { dictMap } from './const'
import './style.scss'

export default {
  name: 'signing',
  components: {
    signingCard,
    signingCard2
  },
  data () {
    return {
      page: {
        current: 1,
        size: 10
      },
      page2: {
        current: 1,
        size: 10
      },
      active: '1',
      finished: false,
      finished2: false,
      isLoading: true,
      mainTableData: [], // 医师签约
      mainTableData2: [], // 自助签约
      count: {
        ordinary: 0,
        selfHelp: 0
      },
      hospitalDict: [],
      teamDict: [],
      statusDict: dictMap.selfStatus,
      finishedText: '没有更多了',
      created: true
    }
  },
  watch: {
    active (newVal) {
      console.log(newVal)
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  methods: {
    getSingingTableData (option) {
      // type = 1：下拉刷新，2：上啦加载
      this.isLoading = true
      if (option.type === 1) {
        this.$set(this.page, 'current', 1)
        this.$set(this.page2, 'current', 1)
      } else if (option.type === 2) {
        this.$set(this.page, 'current', ++this.page.current)
        this.$set(this.page2, 'current', ++this.page2.current)
      }
      getUserDoctorAgreementPage(this.user_info.userId, this.page).then(({ data }) => {
        this.isLoading = false
        if (option.type === 1) {
          this.mainTableData = data.data ? data.data.records : []
        } else {
          this.mainTableData = this.mainTableData.concat(data.data ? data.data.records : [])
        }
        this.count.ordinary = data.data ? data.data.total : 0
        // this.$set(this.page, 'current', this.page.current + 1)
        if (data.data == null) {
          this.finishedText = '您还未签约，您可以自助申请签约'
          this.finished = true
        }
        if (!data.data.records || data.data.records.length === 0) {
          this.finished = true
        }
      })
      getDeviceApplicationPage(this.page2).then(({ data }) => {
        this.isLoading = false
        if (option.type === 1) {
          this.mainTableData2 = data.data.records || []
        } else {
          this.mainTableData2 = this.mainTableData2.concat(data.data.records || [])
        }
        this.count.selfHelp = data.data.total
        // this.$set(this.page2, 'current', this.page2.current + 1)
        if (!data.data.records || data.data.records.length === 0 || data.data.total <= data.data.records.length) {
          this.finished2 = true
        }
      })
    },
    getHospitalDict () {
      getHospitalDict().then(({ data }) => {
        this.hospitalDict = data.data
      })
    },
    getTeamListAll () {
      getTeamListAll().then(({ data }) => {
        this.teamDict = data.data
      })
    },
    handleDetail (row, type) {
      this.$router.push(`/main/${type === 1 ? 'ordinarySigning' : 'selfHelpSigning'}/${row.id}`)
    },
    handleDelete (row) {
      deleteDoctorById(row.id).then(() => {
        this.getSingingTableData({ type: 1 })
      })
    }
  },
  created () {
    this.page2.userId = this.user_info.userId
    this.getSingingTableData({ type: 1 })
    this.getHospitalDict()
    this.getTeamListAll()
    this.created = false
  },
  activated () {
    if (this.created === false) {
      this.page2.userId = this.user_info.userId
      this.getSingingTableData({ type: 1 })
      this.getHospitalDict()
      this.getTeamListAll()
    }
  }
}
</script>
