<template>
  <div id="followUp">
    <div class="followUpNavBar">
      <div
        class="navItem"
        :class="active === item.name ? 'active': ''"
        v-for="item in navList"
        @click="handleChangeNavActive(item)"
        :key="item.name"
      >
        {{ item.label }}
      </div>
      <div class="line" :class="lineTransForm"></div>
    </div>
    <div class="content">
      <hypertension v-if="active === 'hypertension' && show === true" />
      <diabetes v-if="active === 'diabetes' && show === true" />
      <commonForm v-if="active === 'common' && show === true" />
      <div v-if="!show" class="noData">您还未建档，请先建档</div>
    </div>
  </div>
</template>

<script>
import hypertension from './hypertension'
import diabetes from './diabetes'
import commonForm from './common'

import {
  updateDictInfo
} from '@/const/dynamicDict'

export default {
  name: 'followUp', // 随访
  components: {
    hypertension,
    diabetes,
    commonForm
  },
  data () {
    return {
      show: false,
      navList: [
        {
          label: '高血压随访',
          name: 'hypertension'
        }, {
          label: '糖尿病随访',
          name: 'diabetes'
        }, {
          label: '健康服务',
          name: 'common'
        }
      ],
      active: 'hypertension',
      peopleId: ''
    }
  },
  created () {
    updateDictInfo()
    this.$store.dispatch('getArchivesInfo').then((result) => {
      if (!result) {
        this.show = false
      } else {
        this.show = true
      }
    })
  },
  computed: {
    lineTransForm () {
      if (this.active === 'hypertension') {
        return 'lineT1'
      } else if (this.active === 'diabetes') {
        return 'lineT2'
      } else {
        return 'lineT3'
      }
    }
  },
  methods: {
    getList () {

    },
    handleChangeNavActive (navData) {
      this.active = navData.name
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
