/* eslint-disable */
<template>
    <div class="patient-list">
        <div @click="toAddPatient" class="filter">新增</div>
        <div class="list">
            <div class="title">当前用户</div>
            <div class="user-list" v-for="(item, index) in list" :key="index">
                <div>{{item.applyerName}}</div>
                <div>{{item.sex === "1" ? '男' : '女'}}</div>
                <div>{{item.idCard}}</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import {
  getUserInfo
} from '@/api/doctorpeopleinfo/index'
import {
  getPatientInfo
} from '@/api/applyerinfo/index'

export default {
  computed: {
    ...mapGetters(['user_info'])
  },
  data () {
    return {
      list: []
    }
  },
  created() {
    getPatientInfo(this.user_info.userId).then(res => {
      this.list = res.data.data.records
    })
  },
  methods: {
    toAddPatient () {
      this.$router.push({ name: '新增就诊人' })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-list {
    width: 100%;
    height: 100%;
    background: #F4F4F4;
    margin-top: 60px;
    position: relative;
    .filter {
        position: fixed;
        top: 5px;
        z-index: 2;
        right: 20px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.94px;
        padding-top: 20px;
    }
    .title {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #4A4A4A;
        letter-spacing: 0.88px;
        padding: 12px 10px 10px 15px;
    }
    .user-list {
        background: #FFFFFF;
        display: flex;

        height: 60px;
        margin-bottom: 14px;
        justify-content: space-between;
        padding: 0 15px;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.94px;
        text-align: center;
    }
}
</style>

