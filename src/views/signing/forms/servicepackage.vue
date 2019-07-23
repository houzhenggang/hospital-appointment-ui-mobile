<template>
  <div class="servicepackage-list">
    <div class="button-list">
      <van-icon name="arrow-left" class="back" @click="handleColse" />
      <div class="title"></div>
      <div class="confirm" @click="handleColse">确认</div>
    </div>
    <div class="content">
      <van-pull-refresh v-model="loading" @refresh="getList({type: 1})">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList({type: 2})">
          <div class="servicepackage-item" v-for="(item, index) in servicepackageList" :key="index" @click="selecItem(item)">
            <div class="head">
              <div class="title">
                <div>套餐名：{{item.packageLabel}}</div>
                <div>套餐费用(元)：{{item.charges}}</div>
              </div>
              <div class="success" :class="showItem(item)?'show':''"><van-icon name="success" /></div>
            </div>
            <div class="attention">{{item.attention}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getdoctorservicepackageList } from '@/api/doctorservicepackage/'

export default {
  props: {
    hospitalId: {
      default: ''
    },
    serviceType: {
      default: ''
    },
    value: {
      type: Array
    }
  },
  data () {
    return {
      loading: true,
      finished: false,
      servicepackageList: [],
      params: {
        current: 1,
        siez: 10
      },
      list: []
    }
  },
  methods: {
    getList (option) {
      // type = 1：下拉刷新，2：上啦加载
      if (this.hospitalId === '' || this.serviceType === '') {
        return
      }
      if (!option) {
        option = { type: 1 }
      }
      if (option.type === 2) {
        ++this.params.current
      } else {
        this.params.current = 1
      }
      // 获取套餐列表
      getdoctorservicepackageList({
        current: this.params.current,
        size: this.params.size,
        hospitalId: this.hospitalId,
        serviceType: this.serviceType,
        hasChildren: 0
      }).then(({ data }) => {
        this.loading = false
        if (option.type === 2) {
          this.servicepackageList = this.servicepackageList.concat(data.data.records)
        } else {
          this.servicepackageList = data.data.records
        }
        if (data.data.records.length === 0) {
          this.finished = true
        }
      })
    },
    selecItem (row) {
      for (let index in this.list) {
        if (this.list[index].id === row.id) {
          this.list.splice(index, 1)
          return
        }
      }
      this.list.push(row)
      this.$emit('input', this.list)
    },
    showItem (row) {
      for (let item of this.list) {
        if (item.id === row.id) {
          return true
        }
      }
      return false
    },
    handleColse () {
      this.$emit('close', true)
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.list = newVal
      },
      deep: true
    }
  }
}
</script>
