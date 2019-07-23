<template>
  <div class="agreement-item" @click="handleClick">
    <div class="agreement-info">
      <div class="info-head">
        <div class="img">
          <div class="img-con"><img :src="img.hospital" alt=""></div>
          <div class="title">签约医院</div>
          <div class="text">{{ getHospital(formData.hospitalId) }}</div>
        </div>
        <div class="img">
          <div class="img-con"><img :src="img.team" alt=""></div>
          <div class="title">签约团队</div>
          <div class="text">{{ getTeam(formData.teamId) }}</div>
        </div>
      </div>
      <div class="info-content">
        <div class="info-item">
          <div class="title">协议类型</div>
          <div class="label">{{formData.serviceType === '1' ? '基础' : '个性化'}}</div>
        </div>
        <div class="info-item">
          <div class="title">处理状态</div>
          <div class="label">{{getDictValue('ProtocolUseStatus')[formData.status]}}</div>
        </div>
        <div class="info-item">
          <div class="title">签约时间</div>
          <div class="label">{{formData.createTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDictValue } from '@/utils/'

export default {
  name: 'signingCard',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    hospitalDict: {
      type: Array,
      default: () => []
    },
    teamDict: {
      type: Array,
      default: () => []
    },
    statusDict: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      img: {
        hospital: '../img/hospital.png',
        team: '../img/team.png'
      },
      getDictValue
    }
  },
  methods: {
    getHospital (hospitalId) {
      for (let i in this.hospitalDict) {
        if (this.hospitalDict[i].id === hospitalId) {
          return this.hospitalDict[i].name
        }
      }
    },
    getTeam (teamId) {
      for (let i in this.teamDict) {
        if (this.teamDict[i].id === teamId) {
          return this.teamDict[i].name
        }
      }
    },
    handleClick () {
      this.$emit('click', this.formData)
    },
    getStatus (status) {
      for (let i in this.statusDict) {
        if (this.statusDict[i].id === status) {
          return this.statusDict[i].name
        }
      }
    }
  },
  created () {
    // console.log(this.formData)
  }
}
</script>

<style lang="scss" scoped>
.agreement-item {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.agreement-item {
  min-width: calc(100vw - 40px);
  height: auto;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  background: #ffffff;
  .agreement-info {
    padding: 16px;
    padding-bottom: 0;
    .info-head {
      display: flex;
      margin-bottom: 10px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
      .img {
        width: 50%;
        div {
          text-align: center;
        }
        .img-con {
          margin-bottom: 3px;
          height: 30px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          margin-bottom: 7px;
        }
        .text {
          font-size: 12px;
          height: 12px;
          line-height: 12px;
          color: #989898;
        }
      }
    }
    .info-content {
      .info-item {
        display: flex;
        padding: 6px 0;
        .title {
          width: 70px;
          color: #989898;
        }
        .label {
          flex: 1;
          text-align: right;
        }
        .no {
          color: #FD3D53;
        }
      }
    }
  }
}
</style>
