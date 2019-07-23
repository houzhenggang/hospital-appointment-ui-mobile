<template>
  <div id="archives">
    <!-- <van-row class="head">
      <van-col span="6" v-for="(item, index) in colList" :key="index" class="item" :class="activeIndex==index?'selected':''" @click.native="getInfo(item, index)">{{item.name}}</van-col>
    </van-row> -->
    <van-list>
      <van-cell v-for="(item, index) in list" :key="index" :title="item.name">
        {{archives[item.value] === null ? 'null' : archives[item.value]}}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArchivesById, getOldPeople, getDiabetes, getHypertension } from '@/api/archives/'
import { mapGetters } from 'vuex'
import { list } from './const'

export default {
  name: 'archives',
  computed: {
    ...mapGetters(['user_info'])
  },
  data () {
    return {
      colList: [
        {
          name: '基本信息',
          request: getArchivesById
        }, {
          name: '糖尿病',
          request: getDiabetes
        }, {
          name: '高血压',
          request: getHypertension
        }, {
          name: '老年人专案',
          request: getOldPeople
        }
      ],
      activeIndex: 0,
      oldPeopleData: {},
      list,
      archives: {}
    }
  },
  methods: {
    getInfo (row, index) {
      row.request(this.user_info.userId).then(({ data }) => {
        this.archives = data.data
      })
      this.activeIndex = index
    }
  },
  created () {
    this.getInfo(this.colList[this.activeIndex], this.activeIndex)
  }
}
</script>

<style lang="scss" scoped>
#archives {
  .head {
    padding: 20px 10px;
    background-color: #edf1f4;
    .item {
      background-color: #fff;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #6ca6de;
      border-right: 1px solid #ddd;
      font-size: 12px;
      &:first-of-type {
        border-radius: 20px 0 0 20px;
      }
      &:last-of-type {
        border-radius: 0 20px 20px 0;
        border: 0;
      }
    }
    .selected {
      color: #1c57ab;
      background-color: #ddd;
    }
  }
}
</style>
